const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const getConfig = require('../config/index')
const merge = require('webpack-merge')

var getBuildConfig = (config, options) => {
  let buildConfig =  {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            ie8: true
          }
        })
      ]
    }
  }
  let newConfig = merge(config, buildConfig)

  if (options.polyfill === 'false') {
    delete newConfig.entry.polyfill
  }
  return newConfig
}

module.exports = function(options) {
  let config = getConfig(options)
  webpack(getBuildConfig(config, options), (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      return
    }
    console.log(
      stats.toString({
        colors: true,
        env: true
      })
    )
    const info = stats.toJson()
    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  })
}
