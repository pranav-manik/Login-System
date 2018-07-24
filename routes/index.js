var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*router.post('/', function(req,res,next) {
	if (req.body.SignUpBtn=="SignUp") {
		res.redirect('/register');
	}
});*/

router.post('/register', function(req,res,next) {
	//Check for errors
	var UserData = {
		email: req.body.email,
		password: req.body.password
	}
	console.log(UserData);
	req.check('email', 'Email not valid').isEmail();
	req.check('password', 'Password to short or not provided').isLength( {min: 7} );
	var errors = req.validationErrors();
	//If errors send them
	if (errors) {
		res.send(errors);
//Otherwise Continue to Login
	} else {
		console.log("Success login");
		//res.send("Success login");
		res.render('profile.hbs', {email: UserData.email});
		//res.send("<body>Success login</body>");
	}

});


module.exports = router;
