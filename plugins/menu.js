module.exports = function (params, callback) {
  var grunt = params.grunt;
  var _ = grunt.util._;

  var context = params.context;
  var current = context.page;
  var pages = context.pages;

  var menu = "menu_"+ (current.data.lang || "fr");
  menu = context.site[menu];

  _.each(menu, function(menuItem){

    menuItem.active = false;
    menuItem.page   = _.where(pages, {basename: menuItem.page})[0];
    menuItem.dest   = menuItem.page ? menuItem.page.dest : "#";
    menuItem.label  = menuItem.label || menuItem.page.data.title;

    if(menuItem.page.basename == current.basename)
      menuItem.active = true;

    // Setting sub items
    _.each(menuItem.items, function(subMenuItem){
      subMenuItem.active  = false;
      subMenuItem.page    = _.where(pages, {basename: subMenuItem.page})[0];
      subMenuItem.dest    = subMenuItem.page ? subMenuItem.page.dest : "#";
      subMenuItem.label   = subMenuItem.label || subMenuItem.page.data.title;

      // Activating parent item
      if(subMenuItem.page.basename == current.basename){
        subMenuItem.active = true;
        menuItem.active = true;
      }        
    });
    
  });
  
  callback();
}