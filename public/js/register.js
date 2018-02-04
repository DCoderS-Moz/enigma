(function($) {
  "use strict"; // Start of use strict

	$("#registeration-form-button").click(function(){
		var name = $("#full-name").val();
		var email = $("#email-id").val();
		var password = $("#password").val();
		var reg_no = $("#reg-no").val();
		$.post('/user/register', {
			'name': name,
			'email': email,
			'password': password,
			'reg_no': reg_no
		}, function(data, status){
			console.log(status);
			if(data.success == true){
				$("#registration-form").hide();
				$("#error-msg-box").hide();
				$("#success-msg").html('Registration successful. Proceed to login.');
				$("#success-msg-box").show();
			}else{
				if(data.error.indexOf('Duplicate') != -1){
					data.error = 'You are already registered'
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
