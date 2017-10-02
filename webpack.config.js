const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    scripts: ['./src/assets/css/main.css','./src/assets/js/main'],
  },
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'main.js',
    chunkFilename: "[name]-[id].js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.s?css$/,
        extract: true,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
    ]
  },
  resolve: {
    alias: {
      'Lib': path.resolve(__dirname, 'src/assets/js/lib'),
      'Pages': path.resolve(__dirname, 'src/assets/js/pages'),
      'Modules': path.resolve(__dirname, 'src/assets/js/modules')
    },
  },
  plugins: [],
}
