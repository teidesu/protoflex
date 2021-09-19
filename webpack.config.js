const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        protoflex: './src/index.js',
        'protoflex.min': './src/index.js'
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'PB',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            include: /\.js$/,
            filename: '[name].js.map'
        })
    ],

    // excluding buffer from bundle since we handle env-related stuff ourselves
    node: false,
    externals: {
        buffer: 'root Buffer',
    },
}
