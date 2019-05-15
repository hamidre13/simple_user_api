const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = () => ({
  entry: ['webpack/hot/poll?1000', './src/index'],
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },

  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: './../dist',
    hot: true
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  output: { path: path.join(__dirname, '/../dist'), filename: 'server.js' }
});
