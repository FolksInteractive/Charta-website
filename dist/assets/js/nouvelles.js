(function($) {

  
  $(document).ready(function(){
    if($("#instagramNewsFeed").length > 0){
      // Instagram Feed  
      var feed = new Instafeed({
        // accessToken: '1706625845.7c96a79.5cded748c4cd4f72a7d9b5deb3a74e55',
        // userId: '1706625845',
        accessToken: '2215496639.d52792e.1c38bdfc523e45668120e6a444c7664e',
        userId: '2215496639',
        target: 'instagramNewsFeed',
        get: 'user',
        resolution: 'low_resolution',
        limit : 15,
        filter: function(image) {
          var imageDate = new Date(parseInt(image.created_time)*1000);
          var timeAgo = moment(imageDate).locale('fr').fromNow();
          console.log(timeAgo);
          image.created_time_ago = timeAgo;

          return true;
        },
        template: '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">\
                    <div class="news-item thumbnail">\
                      <a href="{{link}}" class="news-object"><img src="{{image}}" /></a>\
                      <div class="news-body">\
                        <a href="{{link}}">@chartaconstruction</a> <span class="news-time"> - {{model.created_time_ago}}</span>\
                        <p>{{caption}}</p>\
                      </div>\
                    </div>\
                  </div>',      
      });
      feed.run();
    }
  })
  

})(jQuery)