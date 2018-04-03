'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const moment = require('moment');

var Event = new Schema({
  sensor_id: {
    type: String,
    required: [true, 'sensor id field is required']
  },
  sensor_prefix: String,
  timestamp: {
    type: Date,
    required: [true, 'timestamp field is required']
  },
  event: Number,
  battery: Number
});

Event.statics = {
  async getStallsData (sensorIds = []) {
    // Filter needed sensors and limit information to one month from now.
    const matchExp = { sensor_id: { $in: sensorIds }, timestamp: { $gt: new Date(moment.utc().subtract(1, 'month').format()) } };
    // const projectExp = { doc: '$$ROOT' }; // Cache original document.
    // Group each sensor by day and count activity (events count)
    const groupExp = {
      _id: {
        sensor: '$sensor_id',
        year: { $year: '$timestamp' },
        month: { $month: '$timestamp' },
        day: { $dayOfMonth: '$timestamp' } ,

      },
      count: { $sum: 1 },
      sensor: { $first: '$sensor_id' },
      timestamp: { $first: '$timestamp' },
    };
    const sortExp = {
      '_id.sensor': 1,
      '_id.year': -1,
      '_id.month': -1,
      '_id.day': -1,

    };
    const aggregationExp = [
      { $match: matchExp },
      { $group: groupExp },
      { $sort: sortExp },
    ];
    console.log('Aggregating with following expression: ');
    console.dir(aggregationExp, { depth: null });
    const stallsData = await this.aggregate(aggregationExp);

    const aggregationParams = [
      {
        $match: {
          sensor_id: { $in: sensorIds },
          timestamp: { $gte: new Date(moment.utc().startOf('day').format()), $lt: new Date(moment.utc().startOf('day').add(1, 'day').format()) }
        }
      },
      {
        $group: {
          _id: '$sensor_id',
          time: {
            $push: { status: '$event', timestamp: '$timestamp' }
          }
        }
      }
    ];

    console.log('Search average time with following params:');
    console.dir(aggregationParams, { depth: null });
    const avgTimeUsage = await this.aggregate(aggregationParams);

    const dayStart = moment.utc().startOf('day').unix();
    const avgValues = {};
    avgTimeUsage.forEach(stallObj => {
      let averageAvailable = 0,
          averageOccupied = 0;

      const timeObjects = stallObj.time;
      for (let i = 0, _count = timeObjects.length; i < _count; i++) {
        if (i === 0) {
          if (timeObjects[i].status === 1) { // If changed to closed (so it was open since the beginning of the day)
            averageAvailable += moment.utc(timeObjects[i].timestamp).unix() - dayStart;
          } else {
            averageOccupied += moment.utc(timeObjects[i].timestamp).unix() - dayStart;
          }
        } else {
          if (timeObjects[i].status === 1) { // If changed to closed (so it was open since the beginning of the day)
            averageAvailable += moment.utc(timeObjects[i].timestamp).unix() - moment.utc(timeObjects[i - 1].timestamp).unix();
          } else {
            averageOccupied += moment.utc(timeObjects[i].timestamp).unix() - moment.utc(timeObjects[i - 1].timestamp).unix();
          }
        }
      }
      avgValues[stallObj._id] = {};
      avgValues[stallObj._id].avgAvailable = Math.abs(averageAvailable / 3600); // 60 * 60
      avgValues[stallObj._id].avgOccupied = Math.abs(averageOccupied / 3600); // 60 * 60
    });

    console.log(avgValues);

    const result = {};
    const todayDay = moment.utc().date();
    const todayMonth = moment.utc().month();
    const week = moment.utc().startOf('week');
    const month = moment.utc().startOf('month');

    stallsData.forEach(stallInfo => {
      const sensor = stallInfo['sensor'];
      // Each sensor is represented by separate row.
      if (!result[sensor]) {
        result[sensor] = [];
      }

      result[sensor].push({ date: moment(stallInfo.timestamp), count: parseInt(stallInfo.count )});
    });

    const stalls = {};
    for (let i  in result) {
      if (!result.hasOwnProperty(i)) {
        continue;
      }

      stalls[i] = {
        today: 0,
        week: 0,
        month: 0,
        avgAvailable: avgValues[i] ? avgValues[i].avgAvailable.toFixed(2) : 0,
        avgOccupied: avgValues[i] ? avgValues[i].avgOccupied.toFixed(2) : 0
      };
      for (let j = 0; j < result[i].length; j++) {
        const currentValue = result[i][j];
        const date = currentValue.date;
        if (date.date() === todayDay && date.month() === todayMonth) {
          stalls[i].today = currentValue.count;
        }

        if (date.unix() >= week.unix()) {
          stalls[i].week += currentValue.count;
        }

        if (date.unix() >= month.unix()) {
          stalls[i].month += currentValue.count;
        }
      }
    }

    return stalls;
  },

  async getLastDayStallsActivity(sensorIds = []) {
    //mongoose.set('debug', true);
    const matchExpr = {
      sensor_id: { $in: sensorIds },
      timestamp: { $gt: new Date(moment.utc().subtract(1, 'day').format()) },
      // event: 0
    };

    const groupExp = {
      _id: {
        year: { $year: '$timestamp' },
        month: { $month: '$timestamp' },
        day: { $dayOfMonth: '$timestamp' },
        hour: { $hour: '$timestamp' },
      },
      count: { $sum: 1 },
      timestamp: { $first: '$timestamp' },
    };

    const sortExp = {
      '_id.day': 1,
      '_id.hour': 1
    };

    const aggregationExp = [
      { $match: matchExpr },
      { $group: groupExp },
      { $sort: sortExp },
    ];

    const activityData = await this.aggregate(aggregationExp);

    let result = [];
    const nowMoment = moment.utc();
    let caretMoment = nowMoment.clone().subtract(1, 'day');
    let index = 0;
    const resLeng = activityData.length;

    while (moment(nowMoment).isAfter(caretMoment)) {

      if ( index < resLeng
            && activityData[index]._id.day === caretMoment.date()
            && activityData[index]._id.hour === caretMoment.hour()) {

        result.push({
          x: new Date(caretMoment.format()).getTime(),
          y: activityData[index].count,
        });
        index++;

      } else {
        result.push({
          x: new Date(caretMoment.format()).getTime(),
          y: 0,
        });
      }

      caretMoment.add(1, 'hour');
    }

    // mongoose.set('debug', false);

    return result;

  },
};

module.exports = mongoose.model('events', Event);