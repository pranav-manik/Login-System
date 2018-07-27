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
			res.send("dupAccount");
		}
		else {
			console.log("user id " + user._id);
			req.session.user = user;
			console.log("req session: " + JSON.stringify(req.session));
			res.redirect('/profile');
			//res.render('profile', {email: req.session.user.email});
		}
	});
});

router.post('/login' , function(req, res, next) {
	var UserData = {
		loginEmail: req.body.email,
		loginPassword: req.body.password
	}
	User.authenticate(UserData.loginEmail, UserData.loginPassword, function(error, user) {
		console.log("LoginError");
		//if email or password wrong
		if (error) {
			res.send("LoginError");
		}
		else if (!user) {
			res.send("LoginError");
		}
		//Continues login process
		else {
			req.session.user = user;
			res.redirect('/profile');
		}

	});
});

//Profile route
router.get('/profile', function(req,res,next) {
	//res.send('<p> Success </p>');
	console.log("user session: " + JSON.stringify(req.session.user));
	if (req.session.user) {
		res.render('profile', {email: req.session.user.email});
	}
	else {
		res.redirect('/error');
	}
	
});

//Logout Route
router.get('/logout', function(req,res,next) {
	req.session.destroy();
	console.log("req session: " + req.session);
	res.redirect('/');
});

router.get('/error', function(req,res,next) {
	//err.status = 401;
	res.render('unauthorized');
});

module.exports = router;
