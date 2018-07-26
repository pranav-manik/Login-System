function SignUp() {
	var form = $('#LoginForm').serialize();

	//for validating and if errors come
	$.post('/validate', form , function SignUpHandler(errors) {
		console.log(JSON.stringify(errors));
		console.log(errors.length);
		//if there are errors
		var maxErrors = 2;
		if (errors.length <= maxErrors) {
			console.log(errors);
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




//for error popups
function sgnPop(msg) {
	//Initializes popup with error message
    // console.log("msg: " + msg);
	$(document).ready(function(){
	$('[data-toggle="popover"]').popover(); 
	$('.popover-dismiss').popover({ trigger: 'focus'});
	$('#SignUpBtn').attr('data-content',msg);
	$('#SignUpBtn').popover('show');
		$('#SignUpBtn').on('mouseout', function(){
			$(this).popover('hide');
			$(this).attr('data-content',msg);
			$(this).popover('show');
		});
	});
}

/*$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({ trigger: 'focus'});
});*/