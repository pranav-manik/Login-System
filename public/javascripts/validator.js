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
		if (errorNum != noError) {
			sgnPop(errors[0].msg);
		}
		else {
			document.getElementById("SignUpBtn").type = "submit";
		}
	});
}


function sgnPop(msg) {
      //var popup = $('#SignUpBtn');
      //var printError = document.getElementById("possibleErrors").innerHTML = msg;
      var popup = document.getElementById("sgnPopup");
      popup.innerHTML = msg;
      console.log(popup);
      popup.classList.toggle("show");
}