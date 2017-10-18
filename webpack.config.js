const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const cssModules = 'modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
         /* alias: {
              'react': 'inferno-compat',
              'react-dom': 'inferno-compat'
            }*/
           /*   alias: {
              'react': 'preact-compat',
              'react-dom': 'preact-compat'
            }*/
    },

    entry: [
      //  'babel-polyfill', 
        './src/polyfill.js',
        './src/index.jsx'],
    output: {
        filename: 'semicrol.react.js',
      /*  path: '/Desarrollo/Fundanet/Fundanet/SRC/Desarrollo/NET/Web/Fundanet.Convocatorias.Web/Scripts',*/
        path: '/build',
        publicPath: '/'
    },

    module: {
        loaders: [{
                test: /(\.js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                })
            },
            {
                test: /\.jpe?g|png|gif|svg$/,
                loader: "file-loader?name=/[name].[ext]"
            }
        ]
    },

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        inline: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'semicrol.react.css',
            disable: false,
            allChunks: true
        })
    ]
}