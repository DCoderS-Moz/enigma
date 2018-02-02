(function($) {
  "use strict"; // Start of use strict

	$("#login-form-button").click(function(){
		var email = $("#email-id").val();
		var password = $("#password").val();
		$.post('/user/login', {
			'email': email,
			'password': password
		}, function(data, status){
			if(data.success == true){
				$("#login-form").hide();
				$("#error-msg-box").hide();
				$("#success-msg").html('Login successful. Your are being redirected.');
				$("#success-msg-box").show();
				document.cookie = "token=" + data.token; 
			}else{
				if(data.error.indexOf('wrong password') != -1){
					data.error = 'Incorrect password'
				}else if(data.error.indexOf('incomplete') != -1){
					data.error = 'Please fill the form properly'
				}
				$("#success-msg-box").hide();
				$("#error-msg").html(data.error);
				$("#error-msg-box").show();
			}
		});
	});

})(jQuery); // End of use strict
