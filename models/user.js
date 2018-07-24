var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	}
});


/*UserSchema.method.checkPassword() = function(password) {
	if (password == this.password) {
		return true;
	} else {
		return false;
	}
}

UserSchema.method.authenticate() function(email, password) {

}*/


var User = mongoose.model('User', UserSchema);


module.exports = User;