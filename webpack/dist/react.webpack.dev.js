"use strict";

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

var rootPath = path.resolve(__dirname, '..');
module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({
      //configFile: "./tsconfig.json",
      //logLevel: "info",
      extensions: ['.tsx', '.ts', '.js', '.json', '.png', '.jpg'] //mainFields: ["browser", "main"],
      // baseUrl: "/foo"

    })],
    // alias: {
    //   "i18n": path.resolve(__dirname, "../src/components/i18n/*"),
    //   "components": path.resolve(__dirname, "../src/components/*"),
    //   "config": path.resolve(__dirname, "../src/config/*"),
    //   "context": path.resolve(__dirname, "../src/context/*"),
    //   "sections": path.resolve(__dirname, "../src/sections/*"),
    //   "styles": path.resolve(__dirname, "../src/styles/*"),
    //   "types": path.resolve(__dirname, "../src/types/*"),
    // },
    mainFields: ['main', 'module', 'browser']
  },
  entry: path.resolve(rootPath, 'src', 'App.tsx'),
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(js|ts|tsx)$/,
      exclude: [path.resolve(__dirname, '../node_modules/'), path.resolve(__dirname, '../src/worker/')],
      //   /node_modules/
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(jpg|png)$/,
      use: {
        loader: 'url-loader'
      }
    }, {
      test: /\.worker\.js$/,
      //include: [path.resolve(__dirname, '../src/worker')],
      use: {
        loader: "worker-loader"
      }
    }]
  },
  devServer: {
    contentBase: path.join(rootPath, 'dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/'
  },
  output: {
    path: path.resolve(rootPath, 'dist/renderer'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  plugins: [new HtmlWebpackPlugin()]
}; // const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// module.exports = {
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//     mainFields: ["main", "module", "browser"],
//   },
//   entry: "./src/app.tsx",
//   target: "electron-renderer",
//   devtool: "source-map",
//   module: {
//     rules: [
//       {
//         test: /\.(js|ts|tsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   devServer: {
//     contentBase: path.join(__dirname, "../dist/renderer"),
//     historyApiFallback: true,
//     compress: true,
//     hot: true,
//     port: 4000,
//     publicPath: "/",
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "js/[name].js",
//   },
//   plugins: [new HtmlWebpackPlugin()],
// };