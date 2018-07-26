var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("mainpage session: " + JSON.stringify(req.session));
	if (!req.session.user) {
  		res.render('index');
  	}
  	else {
  		res.render('profile', {email: req.session.user.email});
  	}
});



//Validator Route
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


//Register Route
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
			res.send("dupAccount");
		}
		else {
			console.log("success in mongo");
			console.log("user id " + user._id);
			req.session.user = user;
			console.log("req session: " + JSON.stringify(req.session));
			//res.redirect('/profile');
			res.render('profile', {email: req.session.user.email});
		}
	});
});

//Profile route
router.get('/profile', function(req,res,next) {
	//res.send('<p> Success </p>');
	console.log("profile called");
	res.render('profile', {email: req.session.user.email});
});

//Logout Route
router.get('/logout', function(req,res,next) {
	req.session.destroy();
	console.log("session destroyed");
	console.log("req session: " + req.session);
	console.log("profile called");
	res.redirect('/');
});

module.exports = router;
