function SignUp() {
	var form = $('#LoginForm').serialize();

	//for validating and if errors come
	$.post('/validate', form , function SignUpHandler(errors) {
		console.log(JSON.stringify(errors));
		console.log(errors.length);
		//if there are errors
		if (errors.length <= 2) {
			console.log(errors);
			sgnPop(errors[0].msg);
		}
		//continues registering process if no errors
		else {
			var html = errors
			$.post('/register', form , function(html) {
				console.log("register called client side");
				//If duplicate Account
				if (html=="dupAccount") {
					sgnPop("you already have an acount with this email");
				}
				//else continue to the registration process
				else {
					document.write(html);
				}
			});
		}
	});	
}


function sgnPop(msg) {
	//Initializes popup with error message
    // console.log("msg: " + msg);
	$(document).ready(function(){
	$('[data-toggle="popover"]').popover(); 
	$('.popover-dismiss').popover({ trigger: 'focus'});
	$('#SignUpBtn').attr('data-content',msg);
	$('#SignUpBtn').popover('show');
	// console.log("msg: " + msg);
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