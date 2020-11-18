const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], //, '.json'

    // plugins: [new TsconfigPathsPlugin()],

    // plugins: [
    //   new TsconfigPathsPlugin({
    //     //configFile: "./tsconfig.json",
    //     //logLevel: "info",
    //     extensions: ['.tsx', '.ts', '.js', '.json', '.png', '.jpg'],
    //     //mainFields: ["browser", "main"],
    //     // baseUrl: "/foo"
    //   })
    // ]
    
    // alias: {
    //   "i18n": path.resolve(__dirname, "../src/components/i18n/*"),
    //   "components": path.resolve(__dirname, "../src/components/*"),
    //   "config": path.resolve(__dirname, "../src/config/*"),
    //   "context": path.resolve(__dirname, "../src/context/*"),
    //   "sections": path.resolve(__dirname, "../src/sections/*"),
    //   "styles": path.resolve(__dirname, "../src/styles/*"),
    //   "types": path.resolve(__dirname, "../src/types/*"),

    // },
  },
  devtool: 'source-map',
  entry: path.resolve(rootPath, 'electron', 'main.ts'),
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    __dirname: false
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js'
  }
}

// const path = require("path");

// module.exports = {
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//   },
//   devtool: "source-map",
//   entry: "./electron/main.ts",
//   target: "electron-main",
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
//   node: {
//     __dirname: false,
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].js",
//   },
// };
