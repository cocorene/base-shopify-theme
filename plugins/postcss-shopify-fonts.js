/**
 * Shopify provides the ability to use liquid template tags in
 * CSS files. However, our development workflow doesn't send
 * CSS or JS to Shopify so we cannot compile these liquid tags.
 * This little plugin allows fonts to use the asset_url filter,
 * prefixing the file with a hardcoded asset CDN url. This is
 * only used in development, not when compiling for production
 * or staging.
 *
 * {{ 'file-name' | asset_url }} > //cdn.url/font-name
 */
const postcss = require('postcss')

const trasverse = url => rule => {
  const str = rule.toString()
  if (~str.indexOf('@font-face')){
    rule.replaceValues(/\{\{ ['"](.[^'" ]*)['"] \| asset_url ?\}\}/, (match, $1) => {
      return url+$1
    })
  }
}

const mutateCSS = url => css => {
  if (process.env.ENV === 'development') {
    css.walkAtRules(trasverse(url))
  }
}

const init = url => {
  return mutateCSS(url)
}

module.exports = postcss.plugin('postcss-shopify-liquid', init)
