/**
 * Shopify provides the ability to use liquid template tags in
 * CSS files. However, our development workflow doesn't send
 * CSS or JS to Shopify so we cannot compile these liquid tags. Futhermore,
 * the postcss-fontpath plugin ruins the liquid tag and makes it unusable.
 * This little plugin allows declarations to use the asset_url filter,
 * prefixing the file with a hardcoded asset CDN url.
 *
 * {{ 'file-name' | asset_url }} > //cdn.url/font-name
 */
const postcss = require('postcss')

const reg = /\{\{ ['"](.[^'" ]*)['"] \| asset_url ?\}\}/

const trasverse = url => rule => {
  const str = rule.toString()
  if (reg.test(str)){
    rule.replaceValues(reg, (match, $1) => {
      return url+$1
    })
  }
}

const mutateCSS = url => css => {
  css.walkAtRules(trasverse(url))
}

const init = url => {
  return mutateCSS(url)
}

module.exports = postcss.plugin('postcss-shopify-cdn', init)
