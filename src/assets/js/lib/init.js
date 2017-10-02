window.app = {}

/**
 * Parse data from Context element attribute
 *
 * @param {object} el Context element
 * @param {string} type Classification of script
 */
function prep (el, type) {
  let raw
  let sequences

  window.app[type] = {}

  raw = el.getAttribute('data-' + type)

  el.removeAttribute('data-' + type)

  sequences = raw.indexOf(',') ? raw.split(/,\s|,/) : raw

  sequences.forEach(function (seq) {
    let _return
    let namespace
    let args
    let Context
    let snippets = []
    let params = []

    namespace = seq.split(/\s#/)[1] || null

    if (namespace) {
      seq = seq.slice(0, seq.match(/\s#/).index)
    }

    /**
     * If snippet has params,
     * we need to set them up to be
     * passed to the script
     */
    if (seq.indexOf('--') > -1) {
      args = seq.split(/\s--\s/)

      snippets = args[1].split(/\s\|\s/)

      params = [].map.call(args[0].split(/\s/), function (param) {
        return param.replace(/'/g, '')
      })

    /**
     * Otherwise, we only have one snippet,
     * and we can just call it at that.
     */
    } else {
      snippets.push(seq)
    }

    /**
     * Main function. Must be the LAST snippet
     * passed to the attribute
     */
    Context = snippets[snippets.length - 1]

    // Remove the Context snippet from the array
    snippets.splice(snippets.length - 1, 1)

    // Create object to pass to init()
    _return = {
      Context: Context,
      snippets: snippets,
      params: params || []
    }

    /**
     * Run init() to fire all snippets
     * and initialize Context script
     */
    init(el, _return, type)
  })
}

/**
 * Find scripts and fire them
 *
 * @param {object} el DOM node
 * @param {object} args {Context: fn(), snippets: [fns()], params: []}
 * @param {string} type Classification of script
 */
function init (el, args, type) {
  let instance
  let Context
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
  Context = require(type + 's/' + args.Context)

  for (var s = 0; s < args.snippets.length; s++) {
    try {
      fns[s] = require('Lib/' + args.snippets[s])
    } catch (e) {
      console.log(e.toString())
    }
  }

  /**
   * Scrub data through utility functions
   */
  if (fns.length) {
    for (var i = 0; i < fns.length; i++) {
      /**
       * Try executing on ES2015 module syntax,
       * fallback to ES5+CommonJS syntax
       */
      returnData = fns[i].default(args.params)
      if (fns[i + 1]) {
        fns[i + 1].default(returnData)
      }
    }
  }

  /**
   * Fire main snippet
   *
   * Try executing on ES2015 module syntax,
   * fallback to ES5+CommonJS syntax
   */
  /*eslint-disable*/
  instance = new Context.default(el, returnData)
  /*eslint-enable*/

  if (args.namespace) {
    window.app[type][args.namespace] = instance
  }

  if (typeof jQuery !== 'undefined') {
    $(el).data(type, instance)
  }
}

export default function (Context = null) {
  Context = Context || document

  /**
   * Find all specified elements
   * in the DOM and init their javascripts
   */
  ;['module', 'component', 'page'].forEach(function (type) {
    const nodes = [].slice.call(Context.querySelectorAll(`[data - ${type}]`))

    for (var i = 0; i < nodes.length; i++) {
      prep(nodes[i], type)
    }
  })
}
