var express = require('express');
var router = express.Router();

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
	console.log(req.body);
	req.check('email', 'Email not provided').isEmpty();
	req.check('email', 'Email not valid').isEmail();
	req.check('password', 'Password to short or not provided').isLength( {min: 7} );

	var errors = req.validationErrors();
	//If errors send them
	if (errors) {
		res.send(errors);
	}
	else {
		console.log("Success login");
		res.send("Success login");
	}

});


module.exports = router;
