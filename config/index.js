const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require("copy-webpack-plugin")

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
            filename: `${item}.html`,
            template: `${absPath}\\html\\${item}.html`,
            inject: true,
            hash: true,
            minify: {
                removeComments: true, //删除注释
                collapseWhitespace: true //压缩空格
            },
            chunks: ['polyfill', item]
        })
    })
}

function getCSSLoader(options) {
    var extractCSS = options.linkcss ? MiniCssExtractPlugin : false
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
            filename: '[name].[hash].js'
        },
        resolve: {
            extensions: ['.css', '.scss', '.js', '.json']
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
                }
            ]
        },
        externals: {
            jquery: "$"
        },
        plugins: [
            ...createHTMLPlugin(options),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new copyWebpackPlugin([{
                from:`${options.path}\\public`,    //要打包的静态资源目录地址，这里的__dirname是指项目目录下，是node的一种语法，可以直接定位到本机的项目目录中
                to: './public'  //要打包到的文件夹路径，跟随output配置中的目录。所以不需要再自己加__dirname
            }])
        ]
    }
}


module.exports = getConfig