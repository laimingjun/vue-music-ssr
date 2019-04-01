const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('vue-html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/entry-client.js'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        // use: ['vue-style-loader', 'css-loader', 'sass-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        // use: ['vue-style-loader', 'css-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new VueSSRClientPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      vue: true
    }),
    new CleanWebpackPlugin()
  ]
})