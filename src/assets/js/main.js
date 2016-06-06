import config from '../../package.json'
import initScripts from './lib/initScripts'

document.addEventListener('DOMContentLoaded', function(){
  /**
   * Find all specified elements
   * in the DOM and init their javascripts
   */
  config.barrel.types.forEach(function(type){
    var nodes = [].slice.call(document.querySelectorAll('[data-'+type+']'));

    for (var i = 0; i < nodes.length; i++){
      initScripts(nodes[i], type)
    }
  });
});

