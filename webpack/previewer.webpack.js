const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootPath = path.resolve(__dirname, '..');

const common = {
}

const test = {
  //target: 'electron-renderer',
  // devtool: 'source-map',
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(rootPath, 'src', 'ws-scrcpy/frontend/Previewer.tsx'), // path.resolve(rootPath, 'src', 'ws-scrcpy/frontend/Previewer.tsx')
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(rootPath, 'dist/renderer/previewer-react'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 50002,
    publicPath: '/'
  },
  output: {
    path: path.join(rootPath, 'dist/renderer/previewer-react'),
    filename: '[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.tsx', '.ts', '.js', '.json', '.png', '.jpg'],
      }),
    ],
    mainFields: ['main', 'module', 'browser']
  },
};

// const scrcpyServer = {
//   entry: path.resolve(rootPath, './src/ws-scrcpy/server', 'index.ts'),
//   externals: [nodeExternals()],
//   // devtool: 'inline-source-map',
//   target: 'node',
//   mode: 'development',
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'babel-loader',
//         exclude: /node_modules/,
//       },
//       {
//         include: path.resolve(__dirname, '../ws-scrcpy/vendor/Genymobile'),
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name].[ext]'
//             }
//           }
//         ]
//       }
//     ]
//     },
//   node: {
//     global: false,
//     __filename: false,
//     __dirname: false,
//   },
//   output: {
//     filename: 'index.js',
//     path: path.resolve(rootPath, 'dist/scrcpy-server'),
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ],
//   },
// };


module.exports = [
  Object.assign({} , common, test),
]
// const path = require("path");
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