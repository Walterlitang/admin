const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}

const defaultSettings = require('./src/settings.js')
const name = defaultSettings.title || '96111部队强军网管理后台' // page title
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false,
    /* 开发环境配置 */
    devServer: {
        port: 8081,
        /* 代理目录 */
        // proxy: {
        //     '^/api': {
        //         target: 'http://192.168.0.131:8080',
        //         ws: true,
        //         changeOrigin: true
        //     }
        // }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'scss',
            'patterns': [
                // 文件路径根据实际情况编写
                path.resolve(__dirname, '@/assets/css/*.scss'),
            ]
        }
    },
    css: {
        loaderOptions: {
            scss: {
                // 文件路径根据实际情况编写
                //prependData: `@import "@/assets/css/variable.scss";`
            }
        }
    },
}
