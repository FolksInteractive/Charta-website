$(document).ready(function () {
  var $window = $(window);
  var $body = $('body');

  var $container = $('#historiquebody');

  $container.isotope({
    itemSelector: '.entry',
    masonry: {
      columnWidth: '.entry'
    }
  });


  function timelineEntries(){
    $('#historiquebody').find('.entry').each( function(){
      var position = $(this).inlineStyle('left');
      if( position == '0px' ) {
        $(this).removeClass('alt');
      } else {
        $(this).addClass('alt');
      }
      $(this).find('.entry-timeline').fadeIn();
    });
  }

  setTimeout( function(){
    timelineEntries();
  }, 1500 );

  $(window).resize(function() {
    $container.isotope('layout');
    var t = setTimeout( function(){
      timelineEntries();
    }, 1500 );
  });

});
