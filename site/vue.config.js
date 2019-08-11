const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'highlight.js$': 'highlight.js/lib/highlight'
            }
        },
        module: {
            rules: [
                {
                test: /\.md$/i,
                use: 'raw-loader',
                },
            ],
        },
        plugins: [
            new MinifyPlugin(),
        ],
        devtool: false,
    },
};