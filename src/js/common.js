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
		rows: 0,
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

		$('.services__slide-wrap').each(function(){
			$(this).css('height', $(this).width());
		});
		$(window).on('resize', function(){
			$('.services__slide-wrap').each(function(){
			$(this).css('height', $(this).width());
		});
		});
		

	//слайдер партнеры
	$('.partners-slider').slick({
		rows: 0,
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

	//Переменная для включения/отключения индикатора загрузки
var spinner = jQuery('.footer-location__map').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init () {
	var myMapTemp = new ymaps.Map("map-yandex", {
    center: [53.1811,50.2137], // координаты центра на карте
    zoom: 16, // коэффициент приближения карты
});
	myMapTemp.behaviors.disable('scrollZoom');

	var myPlacemarkTemp = new ymaps.Placemark(
		[53.1811,50.2137], { 
			balloonContentHeader: 'Дубинкина Е.Ю.',
			//balloonContentBody: '123112, г. Москва, Пресненская наб., 8, стр. 1, Бизнес центр "Капитал Сити"',
			balloonContentFooter: '<a href="tel:+79608210205">+7 960 821 02 05</a>',
			hintContent: 'Дубинкина Е.Ю.'
		}, { 
			preset: 'islands#blueHomeIcon',
			iconColor: '#fde156'
		});
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определния полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    jQuery('.footer-location__map').children('.loader').removeClass('is-active');
});
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");

  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
var ymap = function() {
  jQuery('.footer-location__map').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
    
      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
    
    // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        jQuery('.footer-location__map').children('.loader').addClass('is-active');

    // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
           ymaps.load(init);
        });                
      }
    }
  );  
}

  //Запускаем основную функцию
  ymap();

  $('.btn-callback').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		var btnSubmit = th.find('button[type="submit"]');
		btnSubmit.attr("disabled", true);
		var url = window.location.href;
		var replUrl = url.replace('?', '&');
		$.ajax({
			type: "POST",
			url: "//alexsab.ru/lead/dubinkina/",
			data: th.serialize() +'&referer=' + replUrl
		}).done(function( data ) {
			var res = JSON.parse(data);
			// console.log( ["success data:", data, res, res.error] );
			if(res.error) 
				$('.error-message').html(res.error);
			else
				$('.error-message').html("");
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: (res.answer == 'OK') ? '.thanks' : '.error',
						type: 'inline'
					}
				});
				if(res.answer == 'OK') {
					th.trigger("reset");
				}
				btnSubmit.removeAttr("disabled");
			}, 100);
		}).fail(function( jqXHR, textStatus ) {
			$('.error-message').html("Request failed: " + textStatus);
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '.error',
						type: 'inline'
					}
				});
				btnSubmit.removeAttr("disabled");
			}, 100);
		});
		return false;
	});


}, jQuery);
