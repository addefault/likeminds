$(document).ready(function() {
	$('.date').datepicker({
		dateFormat: "dd/mm/yy",
		changeMonth: true,
		changeYear: true,
		maxDate: -1
	});
	$('.date-trigger').click(function() {
		$(this).siblings('.date').datepicker('show');
	});
	
	function formatOption(option) {
		if (!option.id) {
			return option.text;
		}
		var $option;
		if(option.element.hasAttribute('data-image')) {
			$option = $('<span>'+option.text+'</span><img src="images/'+option.element.getAttribute('data-image')+'.png" alt="Option Value">');
		} else if(option.element.hasAttribute('data-limage')) {
			$option = $('<img src="images/'+option.element.getAttribute('data-limage')+'.png" alt="Option Value"><span>'+option.text+'</span>');
		} else {
			$option = option.text;
		}
		
		return $option;
	};
	$('select:not(.type)').select2({
		width: '100%',
		minimumResultsForSearch: -1,
		templateResult: formatOption,
		templateSelection: formatOption
	}).on("select2:open", function () {
		$('.select2-results__options').niceScroll({
			cursorwidth:15,
			cursorcolor:'#A72421',
			background:"#C7C7C7",
			cursorborder:'none',
			cursorborderradius:0,
			autohidemode:false
		});
	});
	$('select.type').select2({
		width: '475px',
		minimumResultsForSearch: -1,
		templateResult: formatOption,
		templateSelection: formatOption,
		dropdownCssClass: "type-select",
		containerCssClass: "type-container"
	}).on("select2:open", function () {
		$('.select2-results__options').niceScroll({
			cursorwidth:13,
			cursorcolor:'rgba(255, 255, 255, 0.37)',
			background:"#DB1F24",
			cursorborder:'none',
			cursorborderradius:0,
			autohidemode:false
		});
	});
	$('.contacts').niceScroll({
		cursorwidth:15,
		cursorcolor:'#A72421',
		background:"#C7C7C7",
		cursorborder:'none',
		cursorborderradius:0,
		autohidemode:false
	});
	
	$('.additem').click(function() {
		let option = '<div class="social-item"><img src="'+$(this).prev('.select2').find('.select2-selection__rendered').find('img').attr('src')+'"><input type="text" placeholder="Введите ссылку на социальную сеть"><span aria-hidden="true">×</span></div>';
		$(option).insertAfter($(this));
		$('.social-item span').click(function() {
			$(this).closest('.social-item').remove();
		});
	});
	$('input, select').focus(function() {
		if($(this).closest('label').find('.error-message').length > 0)
			$(this).closest('label').find('.error-message').fadeOut().remove();
	});
	$('input[type=checkbox]').change(function() {
		if($(this).closest('label').find('.error-message').length > 0)
			$(this).closest('label').find('.error-message').fadeOut().remove();
	});
	$('input[type=submit]').click(function(e) {
		e.preventDefault();
		let submit = $(this);
		let form = submit.closest('form');
		let fields = form.find('input[type="text"], input[type="password"], textarea, select, input[type="checkbox"]');
		fields.each(function() {
			let errorText;
			if($(this).attr('required') && $(this).val().length === 0) {
				errorText = 'Поле обязательно для заполнения!';
			} else if($(this).attr('required') && $(this).attr('type') === 'checkbox' && !$(this).is(':checked')) {
				errorText = 'Ознакомьтесь с правилами';
			} else if($(this).hasClass('flde') && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($(this).val().toLowerCase()))) {
				errorText = 'Введён неверный Email';
			} else if($(this).hasClass('fldn') && !(/^\d+$/).test($(this).val())) {
				errorText = 'Введён неверный код';
			} else if($(this).hasClass('fldd')) {
				if($(this).val().length < 6) {
					errorText = 'Минимальная длина 6 символов';
				} else if($(this).val().length > 24) {
					errorText = 'Максимальная длина 24 символов';
				} else if($(this).attr('type') === 'password' && $(this).val() !== form.find('input[type=password]').val()) {
					errorText = 'Пароли не совпадают';
				}
			} else if($(this).hasClass('date') && !(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/).test($(this).val())) {
				errorText = 'Введена неверная дата';
			}
			if(errorText && !$(this).closest('label').find('.error-message').length > 0) {
				$(this).closest('label').append('<span class="error-message">'+errorText+'</span>');
				$(this).closest('label').find('.error-message').fadeIn();
			}
			if(!errorText && form.hasClass('email-confirm')) {
				$('form.code-confirm').fadeIn();
				submit.prop('disabled', true);
				submit.siblings('.timer').html('Повторно код можно получить через <span id="timer" data-timer="3"></span>');
				let counter = $('#timer');
				let counterValue = counter.data('timer')*60;
				let counterInit = 0;
				let counterCompleted = 0;
				for(let i = counterValue; i > 0; i--) {
					(function(ind) {
						setTimeout(function(){
							let minutes = (i - i % 60) / 60;
							let seconds = i % 60;
							if(seconds < 10)
								seconds = '0'+seconds;
							counter.html(minutes+':'+seconds);
							if(i === 1) {
								submit.siblings('.timer').html('');
								submit.removeAttr('disabled');
							}
						}, 1000 * counterInit++);
					})(i);
				}
			} else if(!errorText && form.hasClass('code-confirm')) {
				$('.email-confirm, .code-confirm').fadeOut();
				$('.data-confirm').fadeIn();
			}
		});
		//form.submit();
	});
	$('.filter-link').click(function(e) {
		e.preventDefault();
		$(this).closest('.filter-trigger').toggleClass('opened');
	});
});