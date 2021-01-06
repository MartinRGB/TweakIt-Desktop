const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const rootPath = path.resolve(__dirname, '..')

const common = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, "./ws-scrcpy")
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        include: [
          path.resolve(__dirname, "./ws-scrcpy")
        ],
        use: {
          loader: 'ts-loader'
        },
        exclude: /node_modules/,
      },
      {
        test: /\.worker\.js$/,
        include: [
          path.resolve(__dirname, "./ws-scrcpy")
        ],
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, "./ws-scrcpy")
        ],
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: [
          path.resolve(__dirname, "./ws-scrcpy")
        ],
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(asset)$/i,
        include: [
          path.resolve(__dirname, "./ws-scrcpy")
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]',
            },
          },
        ],
      },
      {
        include: path.resolve(__dirname, './vendor/Genymobile'),
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
  resolve: {
    extensions: [ '.tsx','.ts', '.js' ], //
  },
  
}

const frontend = {
  entry: path.resolve(rootPath, 'ws-scrcpy', 'app/index.ts'),
  externals: ['fs'],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/../ws-scrcpy/public/index.html",
      inject: 'head'
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/scrcpy-window'),
  },
};

const backend = {
  entry: './ws-scrcpy/server/index.ts',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  mode: 'development',
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/scrcpy-server'),
  },
  target: 'node',
}

module.exports = [
  Object.assign({} , common, frontend),
  Object.assign({} , common, backend)
];
