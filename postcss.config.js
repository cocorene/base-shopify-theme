const config = {
  plugins: [
    require('./postcss-tasks/postcss-module-import'),
    require('postcss-inline-svg'),
    require("postcss-color-function"),
    require('autoprefixer')({
      browsers: [
        'last 3 versions',
        'iOS >= 8',
        'Safari >= 8',
        'ie 11',
      ]
    }),
    require('postcss-extend'),
  ]
}

if (process.env.ENV === 'development') {
  // Chuck in directly after importing files
  config.plugins.splice(1, 0,
    require('./postcss-tasks/postcss-shopify-fonts')('//cdn.shopify.com/s/files/<add-cdn-uri-here>/assets/')
  )
}

config.plugins.push(require('precss'))

module.exports = config
