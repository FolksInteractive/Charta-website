(function($) {
  $(document).ready(function(){
    var $window = $(window);
    var $body = $('body');
    var $navbar = $("#mainNav");

    jRes = jRespond([
        {
          label: 'phone',
          enter: 0,
          exit: 767
        },{
          label: 'tablet',
          enter: 768,
          exit: 991
        },{
          label: 'laptop',
          enter: 992,
          exit: 1199
        },{
          label: 'desktop',
          enter: 1200,
          exit: 10000
        }
    ]);

    // Navigation
    $("#mainNav .nav").superfish({
      pathClass : 'current'
    });
    // Prevent the click on parent item in mobile mode
    $("#mainNav .nav a.sf-with-ul").click(function(e){
      var breakpoint = jRes.getBreakpoint();

      if(breakpoint == "phone" || breakpoint == "tablet")
        e.preventDefault();
    })

    $('.fancybox').fancybox();

    $('.selectpicker').selectpicker();
  });

  $.fn.inlineStyle = function (prop) {
    return this.prop("style")[$.camelCase(prop)];
  };
})(jQuery);
