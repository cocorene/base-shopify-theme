document.addEventListener('DOMContentLoaded', function(){
  var modules = document.querySelectorAll('[data-module]');
  var components = document.querySelectorAll('[data-component]');

  for (var i = 0; i < modules.length; i++) {
    init(modules[i], 'modules');
  }
  for (var i = 0; i < components.length; i++) {
    init(components[i], 'components');
  }

  function init(el, type){
    var snippet = el.getAttribute('data-module');

    // Find the module script
    try {
      var File = require(type+snippet);
    } catch(e) {
      console.log(e.toString());
      var File = false;
    }

    // Initialize the module with the calling element
    if(typeof File === 'function') {
      var mod = new File(el);
    }
  }
});
