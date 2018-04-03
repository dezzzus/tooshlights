
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	email:  {
		type: String,
		//required: [true, 'Email field is required']
	},
	email_verified: Boolean,
	resettoken: String,
	role: String,
	permission: String,
	apiaccess: String,
	created: {
		type: Date,
		required: [true, 'Created field is required']
	}
});

Account.statics.authenticate = function(username, password, callback) {
	this.findOne({ username: username }, function(error, user) {
		console.log (user);
		if (user && password == user.password) {
			callback(null, user);
		} else if (user || !error) {
			// Email or password was invalid (no MongoDB error)
			error = new Error("Your email address or password is invalid. Please try again.");
			callback(error, null);
		} else {
			// Something bad happened with MongoDB. You shouldn't run into this often.
			callback(error, null);
		}
	});
};

//Account.plugin(passportLocalMongoose);
//Account.plugin(passportLocalMongooseEmail, {	usernameField: 'email'});

module.exports = mongoose.model('users', Account);
