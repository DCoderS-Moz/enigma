(function($) {
  "use strict"; // Start of use strict

	$.post('/api/verify', function(result){
		if(!result.success)
			window.location = "/";
	});

	$.post('/api/question', function(result){
		if(!result.success){
			if(result.error.indexOf('complete') != -1){
				$("#main-area").html('<center><h1>Challenge completed</h1><p class="lead">Results will be declared soon.</p><center>');
			}else{
				window.location = "/";
			}
		}
		else{
			$("#question-number").html('Question ' + result.question_no + ' of 100' );
			$("#question-description").html(result.question);
			for(var i=1;i<=4;i++){
				$("#option" + i).html(result['option' + i]);	
			}
		}
	});

})(jQuery); // End of use strict
