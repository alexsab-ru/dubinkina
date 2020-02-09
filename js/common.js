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

	$(".first-word").each(function(){
		var me = $(this);
		me.html(me.html().replace(/^\s*([^\s]+)(\s|$)/, '<span>$1</span> '));
	});

	//Услуги слайдер
	$('.services__slider').slick({
		autoplay: true,
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: false,
		dots: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});
	//

	if ($(window).width() > 768) {
		$('.services__slide-wrap').each(function(){
			$(this).css('height', $(this).width());
		});
	}

}, jQuery);
