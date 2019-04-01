const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('vue-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const portfinder = require('portfinder')
const path = require('path')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8000

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: path.resolve(__dirname, '../src/entry-client.js'),
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: 'http://127.0.0.1:8000/dist/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
    ]
  },
  devServer: {
    port: PORT,
    host: HOST,
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      vue: true
    }),
    new VueSSRClientPlugin(),
    new VueLoaderPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
              devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: () => {
            const notifier = require('node-notifier')

            return (severity, errors) => {
              if (severity !== 'error') return

              const error = errors[0]
              const filename = error.file && error.file.split('!').pop()

              notifier.notify({
                title: 'vue-musc-ssr',
                message: severity + ': ' + error.name,
                subtitle: filename || '',
                icon: path.join(__dirname, 'logo.png')
              })
            }
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})