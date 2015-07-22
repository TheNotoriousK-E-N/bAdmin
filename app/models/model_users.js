// /app/models/model_users.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true,
		unique: true	
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	isAdmin: {
		type: Boolean,
		required: true
	}
});

// Hash the password before saving.
UserSchema.pre('save', function(next){
	var user = this;
	// hash only if user is new or updated
	if(!user.isModified('password')) {
		return next();
	}

	// Generate hash
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err){
			return next(err);
		}
		else {
			user.password = hash;
			next();
		}
	});
});

// compare password against database's hashed version
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);