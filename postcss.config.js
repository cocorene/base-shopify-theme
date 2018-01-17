const config = {
  plugins: [
    require('./postcss-tasks/postcss-module-import'),
    require('postcss-inline-svg'),
    require("postcss-color-function"),
    require('precss')({ /* ...options */ }),
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
  config.plugins.push(
    require('./postcss-tasks/postcss-shopify-fonts')('//cdn.shopify.com/s/files/1/2141/0785/t/10/assets/')
  )
}

config.plugins.push(require('precss'))

module.exports = config
