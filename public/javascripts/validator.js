function SignUp() {
	var form = $('#LoginForm').serialize();

	//for validating and if errors come
	$.post('/validate', form , function SignUpHandler(errors) {
		console.log(JSON.stringify(errors));
		console.log(errors.length);
		//if there are errors
		if (errors.length <= 2) {
			sgnPop(errors[0].msg);
		}
		//continues registering process if no errors
		else {
			var html = errors
			$.post('/register', form , function(html) {
				console.log("register called client side");
				document.write(html);
			});
		}
	});	
}


function sgnPop(msg) {
      //var popup = $('#SignUpBtn');
      //var printError = document.getElementById("possibleErrors").innerHTML = msg;
      var popup = document.getElementById("sgnPopup");
      popup.data-content=msg;
      //popup.innerHTML = msg;
      console.log(popup);
      //popup.classList.toggle("show");
}

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({ trigger: 'focus'});
});