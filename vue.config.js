const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('scss', resolve('src/common/scss'))
  }
}

// const path = require('path')
// const webpack = require('webpack')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const nodeExternals = require('webpack-node-externals')

// const IS_TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
// const target = IS_TARGET_NODE ? 'server' : 'client'

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// module.exports = {
//   chainWebpack: (config) => {
//     config.resolve.alias.set('scss', resolve('src/common/scss'))
//   },
//   configureWebpack: {
//     entry: resolve(`./src/entry-${target}.js`),
//     target: IS_TARGET_NODE ? 'node' : 'web',
//     plugins: [
//       IS_TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
//       new webpack.DefinePlugin({
//         'process.env.VUE_ENV': '"server"'
//       })
//     ],
//     externals: nodeExternals({
//       whitelist: [/.scss$/, /.css$/]
//     }),
//     output: {
//       libraryTarget: 'commonjs2'
//     }
//   }
// }