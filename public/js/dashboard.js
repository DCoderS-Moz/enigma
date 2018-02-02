(function($) {
  "use strict"; // Start of use strict

  	function getCookieValue(a) {
	    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
	    return b ? b.pop() : '';
	}

	$.post('/api/', {token: getCookieValue('token')}, function(result){
		if(!result.success)
			window.location = "/";
	});

})(jQuery); // End of use strict
