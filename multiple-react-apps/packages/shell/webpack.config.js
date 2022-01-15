const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (_, options) => {
  const isDev = options.mode !== 'production';

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
        new DefinePlugin(
          isDev ? {
            'NAVBAR_URL': JSON.stringify('http://localhost:8081/navbar.js'),
            'TODO_URL': JSON.stringify('http://localhost:8082/todo.js'),
            'FOOTER_URL': JSON.stringify('http://localhost:8083/footer.js'),
            'LOGIN_URL': JSON.stringify('http://localhost:8084/login.js'),
          } : {
            'NAVBAR_URL': JSON.stringify('https://yoda-libs.github.io/glaze-ui-examples/navbar.js'),
            'TODO_URL': JSON.stringify('https://yoda-libs.github.io/glaze-ui-examples/todo.js'),
            'FOOTER_URL': JSON.stringify('https://yoda-libs.github.io/glaze-ui-examples/footer.js'),
            'LOGIN_URL': JSON.stringify('https://yoda-libs.github.io/glaze-ui-examples/login.js'),
          }
        )
    ]
  }
}