function SignUp() {
	var form = $('#LoginForm').serialize();
	$.post('/register', $('#LoginForm').serialize() , function SignUpHandler(errors) {
		console.log(JSON.stringify(errors));
		//gets total number of errors
		var errorNum = 0
		var noError = 13;
		for (key in errors) {
			if( errors.hasOwnProperty(key) ) {
				errorNum++;
        	}
		}
		console.log(errorNum);
		if (errorNum != noError) {
			sgnPop(errors[0].msg);
		}
	});
}


function sgnPop(msg) {
      //var popup = $('#SignUpBtn');
      var popup = document.getElementById("possibleErrors").innerHTML = msg;
      //popup.classList.toggle("show");
}