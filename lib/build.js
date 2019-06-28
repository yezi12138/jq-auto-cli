const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const getConfig = require('../config/index')
const merge = require('webpack-merge')
const copyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

var getBuildConfig = (config, options) => {
  let buildConfig = {
    mode: 'production',
    output: {
      publicPath: options.publicPath
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
                publicPath: options.publicPath
              }
            }
          ]
        },
        {
            test: /\.html$/,
            use: [{
                loader:path.join(__dirname, '../cms-loader/index')
            }, 'html-loader']
        }
      ]
    },
    plugins: [new CleanWebpackPlugin()],
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
  if (!options.polyfill) {
    delete newConfig.entry.polyfill
  }
  if (options.copyToDist) {
    newConfig.plugins.push(
      new copyWebpackPlugin([
        {
          from: `${options.path}\\images`,
          to: './images'
        }
      ])
    )
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
