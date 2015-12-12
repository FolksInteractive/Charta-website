(function($){
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


    $("#sent").bind("click", function(e){
      var formValid = true;
      var j = 0;
      $("form.carrieres-form").find("input,select,button,textarea").removeClass("invalid").removeClass("badInput").removeClass("valueMissing").removeClass("typeMismatch");

      $("form.carrieres-form").find("input,select,textarea").each(function(){
        var ele = $(this).get(0);
        if(ele.checkValidity() == false){
          formValid = false;
          $(ele).addClass("invalid");
          if(ele.tagName.toLocaleLowerCase() == "select"){
            $("select").next().children("button").addClass("invalid");
          }
          for(var attr in ele.validity){
            if(ele.validity[attr] == true){
              $(ele).addClass(attr);
            }
          }
        }
      })

      if(formValid == true) {
        var data = $("form.carrieres-form").serializeArray();
        $("#sent").addClass("loading").addClass("disabled").attr("disabled", "disabled")

        var formData = new FormData($("form.carrieres-form")[0]);

        $.ajax({
          url: endpointUrl,
          type: 'POST',
          data: formData,
          async: false,
          success: function (result) {
            $("form.carrieres-form .alert").removeClass("alert-danger").addClass("alert-success").html(result);
            $("#sent").removeClass("loading").removeClass("disabled").removeAttr("disabled");
            $("form.carrieres-form .messagebox").show(200);
          },
          error: function (response) {
            $("form.carrieres-form .alert").removeClass("alert-success").addClass("alert-danger").html(response.responseText);
            $("form.carrieres-form .messagebox").show(200);
            $("#sent").removeClass("loading").removeClass("disabled").removeAttr("disabled");
          },
          cache: false,
          contentType: false,
          processData: false
        });

      }
    })
  });
})(jQuery)
