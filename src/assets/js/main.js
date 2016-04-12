document.addEventListener('DOMContentLoaded', function(){
  var modules = document.querySelectorAll('[data-module]');
  var components = document.querySelectorAll('[data-component]');

  function init(el, file, type){
    var File;

    try {
      File = require(type+'/'+file);
    } catch(e) {
      console.log(e.toString());
      File = false;
    }

    // Initialize the module with the calling element
    if(typeof File === 'function') {
      var snippet = new File(el);

      if (typeof jQuery !== 'undefined'){
        jQuery(el).data(type, snippet);
      }
    }
  }

  for (var i = 0; i < modules.length; i++){
    init(modules[i], modules[i].getAttribute('data-module'), 'modules');
  }
  for (var i = 0; i < components.length; i++){
    init(components[i], components[i].getAttribute('data-component'), 'components');
  }
});
