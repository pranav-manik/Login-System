function SignUp() {
	var form = $('#LoginForm').serialize();

	//for validating and if errors come
	$.post('/validate', form , function SignUpHandler(errors) {
		console.log(JSON.stringify(errors));
		//if there are errors
		var maxErrors = 2;
		if (errors.length <= maxErrors) {
			sgnPop(errors[0].msg);
		}
		//continues registering process if no errors
		else {
			var html = errors
			$.post('/register', form , function(errors) {
				console.log("register called client side");
				//checks for duplicate Account
				if (errors=="dupAccount") {
					sgnPop("you already have an acount with this email");
				}
				//else continue to the login process
				else {
					document.write(errors);
				}
			});
		}
	});	
}


function Login() {
	var form = $('#LoginForm').serialize();
	$.post('/login', form , function SignUpHandler(errors) {
		//for error
		if (errors=="LoginError") {
			lgnPop("Email not found or incorrect Password");
		}
		//otherwise continue login
		else {
			document.write(errors);
		}
	});
}



//for Sign Up errors
function sgnPop(msg) {
	//Initializes Sign Up popup with error message
    // console.log("msg: " + msg);
	$(document).ready(function(){
	$('[data-toggle="popover"]').popover(); 
	$('.popover-dismiss').popover({ trigger: 'focus'});
	$('#SignUpBtn').popover('hide');
	$('#SignUpBtn').attr('data-content',msg);
	$('#SignUpBtn').popover('show');
	});
}

//For Login errors
function lgnPop(msg) {
	//Initializes Login popup with error message
    // console.log("msg: " + msg);
	$(document).ready(function(){
	$('[data-toggle="popover"]').popover(); 
	$('.popover-dismiss').popover({ trigger: 'focus'});
	$('#LoginBtn').popover('hide');
	$('#LoginBtn').attr('data-content',msg);
	$('#LoginBtn').popover('show');
	});
}
