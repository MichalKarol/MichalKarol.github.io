const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'highlight.js$': 'highlight.js/lib/highlight'
            }
        },
        plugins: [
            new MinifyPlugin(),
        ],
        devtool: false,
    },
};