(function($) {
  $(document).ready(function(){

    var $container = $('#portfolio');
    $container.isotope({ transitionDuration: '0.65s' });

    $('#portfolio-filter button').click(function(){

      $('#portfolio-filter button').removeClass('active');

      $(this).addClass('active');

      var filter = $(this).data('filter');
      var selector = (filter) ? ".portfolio-item[data-tags~="+filter+"]" : null;

      $container.isotope({ filter: selector });

      return false;
    });

    $(window).resize(function() {
      $container.isotope('layout');
    });

    function imageLoaded() {
      // function to invoke for loaded image
      // decrement the counter
      counter--;
      if (counter === 0) {
        $container.isotope('layout');
      }
    }

    var images = $('img');
    var counter = images.length;  // initialize the counter

    images.each(function () {
      if (this.complete) {
        imageLoaded.call(this);
      } else {
        $(this).one('load', imageLoaded);
      }
    });

  });
})(jQuery);
