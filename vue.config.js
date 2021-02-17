module.exports = {

    devServer: {
        port: 8083
    },

    productionSourceMap: false,

    configureWebpack: {
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /.html$/,
                    loader: "vue-template-loader",
                    exclude: /index.html/
                },

                {
                    test: /\.(ver|txt)$/i,
                    use: 'raw-loader',
                }
            ]
        }
    }

};


