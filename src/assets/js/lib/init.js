import config from '../../../../package.json'

window.app = {};

/**
 * Parse data from context element attribute
 *
 * @param {object} el Context element
 * @param {string} type Classification of script
 */
function prep(el, type){
  let raw
  let sequences

  window.app[type] = {}

  raw = el.getAttribute('data-'+type)

  el.removeAttribute('data-'+type)

  sequences = raw.indexOf(',') ? raw.split(/\,\s|\,/) : raw

  sequences.forEach(function(seq){
    let _return
    let namespace
    let args
    let context
    let snippets = []
    let params = []

    namespace = seq.split(/\s\#/)[1] || null

    if (namespace) {
      seq = seq.slice(0, seq.match(/\s\#/).index)
    }

    /**
     * If snippet has params,
     * we need to set them up to be
     * passed to the script
     */
    if (seq.indexOf('--') > -1){
      args = seq.split(/\s\-\-\s/)

      snippets = args[1].split(/\s\|\s/)

      params = [].map.call(args[0].split(/\s/), function(param){
        return param.replace(/\'/g,'')
      });
    } 
    
    /**
     * Otherwise, we only have one snippet,
     * and we can just call it at that.
     */
    else {
      snippets.push(seq)
    }

    /**
     * Main function. Must be the LAST snippet
     * passed to the attribute
     */
    context = snippets[snippets.length - 1]

    // Remove the context snippet from the array
    snippets.splice(snippets.length -1, 1)

    // Create object to pass to init()
    _return = {
      context: context,
      snippets: snippets,
      params: params || []
    }

    /** 
     * Run init() to fire all snippets
     * and initialize context script
     */
    init(el, _return, type)
  });
}

/**
 * Find scripts and fire them
 *
 * @param {object} el DOM node
 * @param {object} args {context: fn(), snippets: [fns()], params: []}
 * @param {string} type Classification of script
 */
function init(el, args, type){
  let instance
  let context
  let returnData
  let fns = []

  /**
   * Set default param data
   */
  returnData = args.params

  /**
   * Find js snippets and add to 
   * fns array to be called next
   */
  context = require(type+'s/'+args.context)

  for (var s = 0; s < args.snippets.length; s++){
    try {
      fns[s] = require('lib/'+args.snippets[s])
    } catch(e) {
      console.log(e.toString())
    }
  }

  /**
   * Scrub data through utility functions
   */
  if(fns.length) {
    for (var i = 0; i < fns.length; i++){

      /**
       * Try executing on ES2015 module syntax,
       * fallback to ES5+CommonJS syntax
       */
      returnData = fns[i].default(args.params)
      fns[i+1] ? fns[i+1].default(returnData) : null
    }
  }

  /**
   * Fire main snippet
   *
   * Try executing on ES2015 module syntax,
   * fallback to ES5+CommonJS syntax
   */
  instance = new context.default(el, returnData) 

  if (args.namespace) {
    window.app[type][args.namespace] = instance
  }

  if (typeof jQuery !== 'undefined'){
    $(el).data(type, instance)
  }
}

export default function(context = null){
  context = context ? context : document

  /**
   * Find all specified elements
   * in the DOM and init their javascripts
   */
  config.barrel.types.forEach(function(type){
    const nodes = [].slice.call(context.querySelectorAll(`[data-${type}]`))

    for (var i = 0; i < nodes.length; i++){
      prep(nodes[i], type)
    }
  });
}
