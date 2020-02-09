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

	//слайдер партнеры
	$('.partners-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M508.875,248.458l-160-160c-3.063-3.042-7.615-3.969-11.625-2.313c-3.99,1.646-6.583,5.542-6.583,9.854v21.333	c0,2.833,1.125,5.542,3.125,7.542l109.792,109.792H10.667C4.771,234.667,0,239.437,0,245.333v21.333c0,5.896,4.771,10.667,10.667,10.667h432.917L333.792,387.125c-2,2-3.125,4.708-3.125,7.542V416c0,4.313,2.594,8.208,6.583,9.854c1.323,0.552,2.708,0.813,4.083,0.813c2.771,0,5.5-1.083,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z"/></svg></button>',
		nextArrow: '<button class="slick-next"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M508.875,248.458l-160-160c-3.063-3.042-7.615-3.969-11.625-2.313c-3.99,1.646-6.583,5.542-6.583,9.854v21.333	c0,2.833,1.125,5.542,3.125,7.542l109.792,109.792H10.667C4.771,234.667,0,239.437,0,245.333v21.333c0,5.896,4.771,10.667,10.667,10.667h432.917L333.792,387.125c-2,2-3.125,4.708-3.125,7.542V416c0,4.313,2.594,8.208,6.583,9.854c1.323,0.552,2.708,0.813,4.083,0.813c2.771,0,5.5-1.083,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z"/></svg></button>',
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 586,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}
		]
	});
	//

}, jQuery);
