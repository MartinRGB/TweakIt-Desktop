const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootPath = path.resolve(__dirname, '..');

const common = {
}

const mainApplication = {
  target: 'electron-renderer',
  //devtool: 'source-map',
  devtool: 'inline-source-map',
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
    contentBase: path.join(rootPath, 'dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 50000,
    publicPath: '/'
  },
  output: {
    path: path.resolve(rootPath, 'dist/renderer'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin()
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
    path: path.join(rootPath, 'dist/renderer/previewer'),
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

module.exports = [
  Object.assign({} , common, mainApplication),
]
