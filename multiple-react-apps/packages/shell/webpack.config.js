const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
            scriptLoading: "blocking",
        }),
    ]
};