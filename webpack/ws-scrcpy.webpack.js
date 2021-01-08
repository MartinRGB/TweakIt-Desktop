const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootPath = path.resolve(__dirname, '..');
const nodeExternals = require('webpack-node-externals');

const common = {
}

// const scrcpyFrontend = {
//   entry: path.resolve(rootPath, 'ws-scrcpy', 'app/index.ts'),
//   externals: ['fs'],
//   plugins: [
//     new HtmlWebpackPlugin(),
//   ],
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist/scrcpy-window'),
//   },
// };

const scrcpyFrontend = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(rootPath, './ws-scrcpy/frontend', 'index.ts'),
  externals: ['fs'],
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
    new HtmlWebpackPlugin({
      template: __dirname + "/../ws-scrcpy/index.html",
      inject: 'head'
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(rootPath, 'dist/public'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};

const scrcpyServer = {
  entry: path.resolve(rootPath, './ws-scrcpy/server', 'index.ts'),
  externals: [nodeExternals()],
  // devtool: 'inline-source-map',
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        include: path.resolve(__dirname, '../ws-scrcpy/vendor/Genymobile'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
    },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(rootPath, 'dist/scrcpy-server'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};


module.exports = [
  Object.assign({} , common, scrcpyFrontend),
  Object.assign({} , common, scrcpyServer),
]