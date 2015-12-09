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

  });
})(jQuery);