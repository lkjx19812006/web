var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {        
        app: './src/main.js',
        vendors: ['vue', 'vuex', 'vue-router', 'axios'],
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            //这里主要是相当于 requirejs中的 给模块取别名 组件中就直接 require(qrious) 就可以正常使用 CMD 或者 AMD 规范的文件
            // 'qrious': resolve('static/js/qrious.min.js')
        }
    },
    // 此项配置可以将某些库设置为外部引用，内部不会打包合并进去。
    externals: {
        // Qrious: 'qrious'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    // 挂载全局插件
    plugins: [
        // new webpack.ProvidePlugin({
        //     Qrious: 'qrious'
        // }),
    ]
}
