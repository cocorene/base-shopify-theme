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

  [].forEach.call(modules, function(module, i){
    init(module, module.getAttribute('data-module'), 'modules');
  });
  [].forEach.call(components, function(component, i){
    init(component, component.getAttribute('data-component'), 'components');
  });
});
