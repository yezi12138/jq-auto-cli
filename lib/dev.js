const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const getConfig = require('../config/index')
const merge = require('webpack-merge')


var getDevConfig = (config, options) => {
  var port = options.port || 8080
  let devConfig =  {
    mode: 'development',
    entry: {
      client: `webpack-dev-server/client?http://localhost:${port}/`,
      server: 'webpack/hot/dev-server'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
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
