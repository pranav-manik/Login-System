function SignUp() {
	var email = $('#email').val();
	var password = $('#password').val();
	console.log(email);
	console.log(password);
	$.post('/register', {email: email, password: password} , function SignUpHandler(errors) {
		if (errors) {
			console.log(errors[0].msg);
		}
	});
}