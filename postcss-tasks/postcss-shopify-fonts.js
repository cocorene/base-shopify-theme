const postcss = require('postcss')

const trasverse = url => rule => {
  const str = rule.toString()
  if (~str.indexOf('@font-face')){
    rule.replaceValues(/\{\{ ['"](.[^'" ]*)['"] \| asset_url ?\}\}/g, (match, $1) => {
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

module.exports = postcss.plugin('postcss-shopify-liquid', init)
