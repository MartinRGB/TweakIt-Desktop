const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootPath = path.resolve(__dirname, '..');
const nodeExternals = require('webpack-node-externals');

const common = {
}


const scrcpyFrontend = {
  //target: 'electron-renderer',
  // devtool: 'source-map',
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(rootPath, 'src', 'ws-scrcpy/frontend/index.ts'), // path.resolve(rootPath, 'src', 'ws-scrcpy/frontend/Previewer.tsx')
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
  // devServer: {
  //   contentBase: path.join(rootPath, 'dist/renderer/previewer'),
  //   historyApiFallback: true,
  //   compress: true,
  //   hot: true,
  //   port: 50001,
  //   publicPath: '/'
  // },
  output: {
    path: path.join(rootPath, 'assets/scrcpy-previewer'), //assets/scrcpy-previewer
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


const scrcpyServer = {
  entry: path.resolve(rootPath, 'src', 'ws-scrcpy/server/index.ts'),
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  target: 'node',
  mode: 'development',
  //devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        include: path.resolve(__dirname, '../src/ws-scrcpy/vendor/Genymobile'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'vendor/Genymobile/scrcpy/[name].[ext]' //[path][name].[ext]
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
    path: path.resolve(rootPath, 'assets/scrcpy-server'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};

module.exports = [
  Object.assign({} , common, scrcpyFrontend),
  Object.assign({} , common, scrcpyServer),
]
