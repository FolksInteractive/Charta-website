var endpointUrl = "http://localhost/sentmail/sendmail.php"

$(document).ready(function(){
  var $window = $(window);
  var $body = $('body');
  var $navbar = $("#mainNav");

  // Navigation
  $("#mainNav .nav").superfish({
    pathClass : 'current'
  });

  $('.selectpicker').selectpicker();
});

$.fn.inlineStyle = function (prop) {
  return this.prop("style")[$.camelCase(prop)];
};
