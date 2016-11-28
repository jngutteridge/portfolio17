const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.join(__dirname, 'src', 'app-client.jsx')
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'public'),
        filename: 'app.js',
        publicPath: 'http://localhost:8080/'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ["css-loader", "sass-loader"])
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BROWSER': JSON.stringify(true),
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            beautify: true,
            dead_code: true
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
    externals: {
        jquery: "jQuery"
    },
    devtool: 'source-map'
};
