const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpackMerge = require('webpack-merge');
const modeCondfig = env => require(`./build-tools/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      target: 'node',
      node: {
        __filename: true,
        __dirname: true
      },

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
      plugins: [new webpack.ProgressPlugin()]
    },
    modeCondfig(mode)
  );
};
