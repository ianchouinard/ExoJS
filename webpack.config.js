const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        ExoJS: './dev/ExoJs.dev.js',
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: 'ExoJS.js'
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new MinifyPlugin()
  ]
};