const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const env = require('./env');

module.exports = (_, options) => {
  const isDev = options.mode !== 'production';

  const base_url = isDev ? env.base_url.dev : env.base_url.prod;

  return {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: "[name].js" // name of the generated bundle
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    devtool: 'source-map',
    devServer: {
        port: 9000,
        hot: false,
        historyApiFallback: true
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject : "body",
            scriptLoading: "blocking"
        }),
        new DefinePlugin({
          'BASE_URL': JSON.stringify(base_url)
        })
    ]
  }
}