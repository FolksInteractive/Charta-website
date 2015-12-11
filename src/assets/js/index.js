(function($) {

  $(document).ready(function () {
    var $window = $(window);
    var $body = $('body');
    var $navbar = $("#mainNav");
    var $hero = $('#hero.full-screen');


    // Hero Parallax    
    if($hero.length > 0){

      var heroParallaxOffset = function () {
        var sliderParallaxOffsetTop = 0;
        var headerHeight = $navbar.outerHeight();
        sliderParallaxOffsetTop = headerHeight;

        // if( $hero.next('#header').length > 0 ) { sliderParallaxOffsetTop = 0; }

        return sliderParallaxOffsetTop;
      }

      var heroSliderParallax = function () {
        // if( ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) && !SEMICOLON.isMobile.any() ) {
        var parallaxOffsetTop = heroParallaxOffset();
        var parallaxElHeight = $hero.outerHeight();

        if (( parallaxElHeight + parallaxOffsetTop + 50 ) > $window.scrollTop()) {
          if ($window.scrollTop() > parallaxOffsetTop) {
            var tranformAmount = (($window.scrollTop() - parallaxOffsetTop) / 1.5 ).toFixed(2);
            var tranformAmount2 = (($window.scrollTop() - parallaxOffsetTop) / 7 ).toFixed(2);
            $hero.stop(true, true).transition({y: tranformAmount}, 0);
          }
        }
        // if (requesting) {
        //   requestAnimationFrame(function(){
        //     heroSliderParallax();
        //     // SEMICOLON.slider.sliderElementsFade();
        //   });
        // }
        // } else {
        //   $('.slider-parallax,.slider-parallax .slider-caption,.ei-title').transition({ y: 0 },0);
        // }
      }

      // heroSliderParallax();


      // Hero vertical align middle
      var heroVerticalAlign = function () {
        var $heroOver = $hero.find('.slider-over');
        $heroOver.css({
          position: 'absolute',
          top: '42%',
          marginTop: -($heroOver.outerHeight() / 2) + 'px'
        });
      }

      heroVerticalAlign();
      $window.on('resize', heroVerticalAlign);


      // Hero Fullscreen
      var heroFullscreen = function () {
        var scrHeight = $window.height();
        var sliderHeightOff = $hero.offset().top;
        scrHeight = scrHeight - sliderHeightOff;
        if ($hero.hasClass('parallax')) {
          var transformVal = $hero.css('transform');
          var transformX = transformVal.match(/-?[\d\.]+/g);
          var transformXvalue = (transformX) ? transformX[5] : 0;

          scrHeight = ( $window.height() + Number(transformXvalue) ) - sliderHeightOff;
        }
        $hero.css('height', scrHeight);
      }

      heroFullscreen();
      $window.on('resize', heroFullscreen);


      // Hero Swiper
      var swiperSlider = new Swiper('#hero .swiper-container', {
        paginationClickable: false,
        slidesPerView: 1,
        grabCursor: true,
        autoplay: 4000
      });

      $('#hero .swiper-button-prev').on('click', function (e) {
        e.preventDefault();
        swiperSlider.slidePrev();
      });

      $('#hero .swiper-button-next').on('click', function (e) {
        e.preventDefault();
        swiperSlider.slideNext();
      });
    }


    // Instagram Carousel  
    if($("#instagramHomeFeed").length > 0){
      var feed = new Instafeed({
        // accessToken: '1706625845.7c96a79.5cded748c4cd4f72a7d9b5deb3a74e55',
        // userId: '1706625845',
        accessToken: '2215496639.d52792e.1c38bdfc523e45668120e6a444c7664e',
        userId: '2215496639',
        target: 'instagramHomeFeed',
        get: 'user',
        resolution: 'standard_resolution',
        limit : 15,
        template: '<div><a href="{{image}}"><img src="{{image}}" /></a></div>',
        after : function(){
          // Initialize Carousel
          $('#homeInstagram .owl-carousel').owlCarousel({
            items : 5,
            itemsCustom : false,
            itemsDesktop : [1199,5],
            itemsDesktopSmall : [980,4],
            itemsTablet: [768,3],
            itemsTabletSmall: false,
            itemsMobile : [479, 3],
            singleItem : false,
            itemsScaleUp : false,
            margin: 20,
          });

          // Initialize Fancybox
          $('#homeInstagram .owl-item a').fancybox({
            padding: 0
          })
        }
      });
      feed.run();
    }


    // LOGO CAROUSEL 

    function initlalizlogoCarousel(){
      var width = $(window).width();
      var cols = 12;
      if(width>=1200){
        cols = 12;
      }else if(width>992){
        cols = 10;
      }else if(width>767){
        cols = 6;
      }else{
        cols = 4;
      }

      // Use default configuration
      $('#logo_carousel').logoCarousel({
        cols: cols,
        alignment: 'vertical',
        verticalDir: 'up',
        speed: 800,
        height: 480,
        tbPadding: 30,
        lrPadding: 10,
        hoverStop: true,
        forceFullwidth: true,
        bgColor: '#d29389',
        logoOpacity: 0.6,
        hoverOpacity: 1
      });
    }

    $('body').waitForImages(function () {
      initlalizlogoCarousel();
    });

    $(window).on("debouncedresize", function(e) {
      //initlalizlogoCarousel()
    });

  });
})(jQuery);
