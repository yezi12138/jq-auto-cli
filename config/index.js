const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

function getEntry(entry) {
  let obj = {}
  entry.forEach(item => {
    obj[item.name] = item.path
  })
  return obj
}

function createHTMLPlugin(options) {
  var absPath = `${options.path}\\`
  var list = options.entry.map(item => item.name)
  return list.map(item => {
    return new HtmlWebpackPlugin({
      filename: `html/${item}.html`,
      template: `${absPath}\\html\\${item}.html`,
      inject: true,
      minify: {
        removeComments: true, //删除注释
        collapseWhitespace: true //压缩空格
      },
      chunks: ['polyfill', item]
    })
  })
}

function getCSSLoader(options) {
  var extractCSS = options.insetCSS ? MiniCssExtractPlugin : false
  var baseLoader = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not ie <= 8']
          })
        ]
      }
    },
    'sass-loader'
  ]
  if (extractCSS) {
    baseLoader.unshift(extractCSS.loader)
  } else {
    baseLoader.unshift('style-loader')
  }
  return baseLoader
}

/**
 *
 * @param {*} options 用户的配置
 * 规定js文件都在js目录下
 * 规定html文件都在html目录下
 * 规定xx都在xx目录下
 */
var getConfig = options => {
  return {
    entry: {
      polyfill: '@babel/polyfill',
      ...getEntry(options.entry)
    },
    output: {
      path: `${options.path}\\${options.output}`,
      filename: 'js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  //   useBuiltIns: 'usage'
                }
              ]
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        },
        {
          test: /\.s?css$/,
          use: getCSSLoader(options)
        },
        {
            test: /\.html$/,
            use: [{
                loader:path.join(__dirname, '../cms-loader/index'),
                options: {
                    path: options.path
                }
            }, 'html-loader']
        }
      ]
    },
    externals: {
      jquery: '$'
    },
    plugins: [
      ...createHTMLPlugin(options),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
}

module.exports = getConfig
