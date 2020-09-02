const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')
const {HotModuleReplacementPlugin} = require('webpack')

module.exports = {
  devServer: {
    hot: true,
    watchOptions: {
        poll: true
    }
  },
  devtool: 'source-map',
  mode: 'development',
  entry: [
    __dirname + '/src/main.js'
  ],
  output: {
    path: __dirname + '/dev',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
            loader: 'vue-loader',
            options: {
                appendExtension: true,
                sourceMap: true
            }
        }]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin({
        patterns: [
            { from: './src/index.html', to: 'index.html' }
        ]
    })
  ]
}