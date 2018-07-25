var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/validate', function(req,res,next) {
	req.check('email', 'Email not valid').isEmail();
	req.check('password', 'Password must be at least 7 characters').isLength( {min: 7} );
	var errors = req.validationErrors();
	//var errors = req.getValidationResult(req);
	//If errors send them
	if (errors) {
		res.send(errors);
//Otherwise Continue to Login
	} else {
		console.log("jumped to /register");
		res.send({});
	}
});

router.post('/register', function(req,res,next) {
	//Check for errors
	var UserData = {
		email: req.body.email,
		password: req.body.password
	}
	console.log(UserData);
	User.create( UserData, function(err, user) {
		if (err) {
			console.log("error in mongo");
			//next(err);
			res.send("dupAccount");
		}
		else {
			console.log("success in mongo");
			res.render('profile', {email: UserData.email});
		}
	});
	res.render('profile', {email: UserData.email});

});


router.get('/profile', function(req,res,next) {
	//res.send('<p> Success </p>');
	console.log("profile called");
	//res.render('profile');
});

module.exports = router;
