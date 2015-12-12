var endpointUrl = "http://secondhandboards.com/sdw/sentmail/sendmail.php";
(function($) {
  $(document).ready(function(){
    var $window = $(window);
    var $body = $('body');
    var $navbar = $("#mainNav");

    // Navigation
    $("#mainNav .nav").superfish({
      pathClass : 'current'
    });

    $('.fancybox').fancybox();

    $('.selectpicker').selectpicker();
  });

  $.fn.inlineStyle = function (prop) {
    return this.prop("style")[$.camelCase(prop)];
  };
})(jQuery);
