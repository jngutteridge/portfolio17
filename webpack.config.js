const webpack = require('webpack');
const path    = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'app-client.jsx'),
    output: {
        path: path.join(__dirname, 'src', 'web', 'js'),
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: ['babel-loader'],
            query: {
                cacheDirectory: 'babel_cache',
                presets: ['react', 'es2015']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: true },
            mangle: true,
            sourcemap: true,
            beautify: true,
            dead_code: true
        })
    ]
};
