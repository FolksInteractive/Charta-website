$(document).ready(function(){
  $('#google-map').gMap({
    maptype: google.maps.MapTypeId.ROADMAP,
    zoom: 14,
    markers: [
      {
        latitude:45.4385955,
        longitude:-73.6811796,
        icon: {
          image: "assets/images/map-icon-blue.png",
          iconsize: [32, 39],
          iconanchor: [13,39]
        }
      }
    ],
    doubleclickzoom: false,
    scrollwheel:false,
    scaleControl: false,
    overviewMapControl: false
  });

});
