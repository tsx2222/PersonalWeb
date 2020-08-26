const CompressionPlugin = require('compression-webpack-plugin')
module.exports= {
    publicPath: './', // <----这里就是会修改webpack的outPath.publicPath
    devServer: {

        //设置开发接口代理
        proxy: {
            "/api": {
                target:"175.24.118.112:8181/",//例如协议+主机+端口
                //target: "http://localhost:8181/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //通过pathRewrite重写地址
                }
            }
        }
    },

    chainWebpack: (config) => {
        /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch')
            }
        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            }
        }

    }
}