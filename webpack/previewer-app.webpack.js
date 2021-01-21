const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootPath = path.resolve(__dirname, '..');

const common = {
}

const previewerApplication = {
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
        test: /\.(png|jpe?g|gif||obj|mtl|glb)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(rootPath, 'dist/renderer/react-previewer'), //assets/react-previewer
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 50002,
    publicPath: '/'
  },
  output: {
    path: path.join(rootPath, 'dist/renderer/react-previewer'), //assets/react-previewer
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
  Object.assign({} , common, previewerApplication),
]
