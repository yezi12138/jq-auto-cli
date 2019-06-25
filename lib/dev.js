const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const getConfig = require('../config/index')
const merge = require('webpack-merge')
const copyWebpackPlugin = require('copy-webpack-plugin')

var getDevConfig = (config, options) => {
  var port = options.port || 8080
  let devConfig = {
    mode: 'development',
    entry: {
      client: `webpack-dev-server/client?http://localhost:${port}/`,
      server: 'webpack/hot/dev-server'
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|bmp|jpeg)$/, //正则表达式匹配图片规则
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'images/[name].[ext]',
                publicPath: '../'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new copyWebpackPlugin([
        {
          from: `${options.path}\\images`,
          to: './images'
        }
      ])
    ],
    devServer: {
      hot: true,
      contentBase: `${options.path}\\${options.output}`,
      host: 'localhost',
      watchContentBase: true
    }
  }
  return merge(config, devConfig)
}

module.exports = function(options) {
  var config = getConfig(options)
  var compiler = webpack(getDevConfig(config, options))
  var server = new webpackDevServer(compiler)
  server.listen(options.port || 8080)
}
