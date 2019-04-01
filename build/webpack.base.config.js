const path = require('path')

const config = {
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, '../src'),
      "scss": path.join(__dirname, '../src/common/scss')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: '!vue-style-loader!css-loader!sass-loader',
            }
          }
        }
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            // webpack4 动态加载bug，需引入此插件
            babelrc: false,
            plugins: [
              "dynamic-import-webpack"
            ]
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'img/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  }
}

module.exports = config