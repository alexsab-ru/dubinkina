$(function() {

	//Меню при скролле
	if ($(window).width() > 768) {

		var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				document.getElementById("header").setAttribute(
					"style", "top: 0; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);");
			} else {
				document.getElementById("header").setAttribute(
					"style", "top: -100px; box-shadow: none;");
			}
			prevScrollpos = currentScrollPos;
		}
		$(window).scroll(function() {
			if ($(this).scrollTop() > 50) {
				$('.header').attr('style')
			} else {
				$('.header').removeAttr('style');
			}
		});
	}
	//

	//Мобильное меню
	$('.mobile-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.header__menu').toggleClass('open');
	});

}, jQuery);
