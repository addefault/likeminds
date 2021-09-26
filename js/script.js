$(document).ready(function() {
	$('input[type=submit]').click(function(e) {
		e.preventDefault();
		console.log($(this).closest('form').find('input[type="text"], input[type="password"], textarea'));
	});
});