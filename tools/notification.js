//var nodemailer = require('nodemailer');

module.exports = {
  sendemail: function (from, to , subject, msg) {
    // whatever

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //Please uncomment when using in your system.
        /*        
        var transporter = nodemailer.createTransport({
          service: 'yandex',
          auth: {
            user: 'andrew.li1987@yandex.com',
            pass: 'youremailpassword'
          }
        });

        var mailOptions = {
          from: 'andrew.li1987@yandex.com',
          to: to,
          subject: subject,
          text: msg
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        */      
  },
  sendnotification: function (title, object, socketio) {
    // whatever
    socketio.emit(title, object);
  }
};
