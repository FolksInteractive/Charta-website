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


    $(".remove_file").click(function(event){
      $("#csv_file").val("");
      $("#vitea").val("");
      $(".remove_file").hide();
      event.stopPropagation();
      event.preventDefault();
    })

    $("#vitea").click(function(){
      $("#csv_file").trigger("click");
    })
    $("#csv_file").change(function(){
      var fileInput = $(this).val();
      var fileName = fileInput.split(/(\\|\/)/g).pop();
      if(fileName){
        $("#vitea").val(fileName);
        $(".remove_file").show();
      }
    })

    $("#sent").bind("click", function(e){
      var formValid = true;
      var j = 0;
      $("form.carrieres-form")
        .find("input,select,button,textarea")
        .removeClass("invalid")
        .removeClass("badInput")
        .removeClass("valueMissing")
        .removeClass("typeMismatch");

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
          url: $("form.carrieres-form").attr('action'),
          type: 'POST',
          data: formData,
          async: false,
          success: function (result) {
            $("form.carrieres-form .alert-success").show();
            $("#sent").removeClass("loading").removeClass("disabled").removeAttr("disabled");
            $("form.carrieres-form")[0].reset();
          },
          error: function (response) {

            $("form.carrieres-form .alert-danger").show()

            $("#sent")
              .removeClass("loading")
              .removeClass("disabled")
              .removeAttr("disabled");
          },
          cache: false,
          contentType: false,
          processData: false
        });

      }
    })
  });
})(jQuery)
