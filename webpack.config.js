const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: [
    __dirname + '/src/main.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
              'vue-style-loader',
              'css-loader'
            ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
      
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
        patterns: [
            { from: './src/index.html', to: 'index.html' },
            { from: './src/assets/**', to: '/assets/' }
        ]
    })
  ]
}