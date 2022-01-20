const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootPath = path.resolve(__dirname, '..');
const nodeExternals = require('webpack-node-externals');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const common = {
}

const mainApplication = {
  //target: 'web',
  target: 'electron-renderer',
  //devtool: 'source-map',
  //devtool: 'inline-source-map',
  devtool: 'cheap-module-source-map',
  entry: path.resolve(rootPath, 'src', 'App.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [path.resolve(__dirname, '../node_modules/'),path.resolve(__dirname, '../src/worker/')],  //   /node_modules/
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
      {
        include: path.resolve(__dirname, '../src/ws-scrcpy/vendor/Genymobile'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'vendor/Genymobile/scrcpy/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    static: path.join(rootPath, 'dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 50000
    //publicPath: '/'
  },
  output: {
    path: path.resolve(rootPath, 'dist/renderer'),
    filename: 'js/[name].js',
    //publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Vishwas'),
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '..', './src/index.html'),
    // }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],

    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.tsx', '.ts', '.js', '.json', '.png', '.jpg'],
      }),
    ],
    mainFields: ['main', 'module', 'browser']
  },
  externals: [nodeExternals()],

}

module.exports = [
  Object.assign({} , common, mainApplication),
]
