$(document).ready(function(){
  // Navigation
  $("#mainNav .nav").superfish({
    pathClass : 'current'
  });

  // Hero
  var swiperSlider = new Swiper('#hero',{
    paginationClickable: false,
    slidesPerView: 1,
    grabCursor: true,
  });

  $('#hero .swiper-button-prev').on('click', function(e){
    e.preventDefault();
    swiperSlider.swipePrev();
  });

  $('#hero .swiper-button-prev').on('click', function(e){
    e.preventDefault();
    swiperSlider.swipeNext();
  });

});