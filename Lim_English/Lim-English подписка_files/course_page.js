$(document).ready(function() {
	$('.course__accardion').on('click', '.JS_accardion', function(event) {
		event.preventDefault();
		var prnt = $(this).parents('.course__step');
		console.log(prnt)
		if(prnt.hasClass('course__step-open')){
			prnt.removeClass('course__step-open');
		}else{
			$('.course__step-open').removeClass('course__step-open');
			prnt.addClass('course__step-open');
		}
	});
	$('.item__focused').closest('.body__item > *').hover(function () {
		$(this).removeClass('item__focused');
	});
	$('.user-nav-dropdown').hover(function() {
		$(this).addClass('open');
	}, function() {
		$(this).removeClass('open');
	});
});