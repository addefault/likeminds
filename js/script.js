$(document).ready(function() {
	$('input[type=submit]').click(function(e) {
		e.preventDefault();
		let form = $(this).closest('form');
		let fields = form.find('input[type="text"], input[type="password"], textarea');
		fields.each(function() {
			if($(this).attr('required'))
				alert('required');
		});
		form.submit();
	});
});