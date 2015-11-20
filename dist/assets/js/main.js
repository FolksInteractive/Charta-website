$(document).ready(function(){
  var $window = $(window);
  var $body = $('body');
  var $navbar = $("#mainNav");

  // Navigation
  $("#mainNav .nav").superfish({
    pathClass : 'current'
  });
});

$.fn.inlineStyle = function (prop) {
  return this.prop("style")[$.camelCase(prop)];
};
