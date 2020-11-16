const path = require('path');
const {
  override,
  addBabelPreset,
  addBabelPlugin,
} = require('customize-cra');

const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;

const addCustom = () => (config) => {
  if (process.env.NODE_ENV !== 'production') {
    config.devtool = 'cheap-source-map';
    // config.devtool = 'source-map';
  }
  config.module.rules.push({
    test: /\.css$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, 'src'),
    use: [
      // No need for "css-loader" nor "style-loader"
      // for CRA will later apply them anyways.
      {
        loader: "postcss-loader",
        options: {
          ident: 'postcss',
          plugins: [
            tailwindcss(),
            autoprefixer()
          ]
        }
      }
    ],
  });
  config.plugins.push(
    new LicenseWebpackPlugin(),
  );
  return config;
};

module.exports = {
  webpack: override(
    addBabelPreset('@emotion/babel-preset-css-prop'),
    addBabelPlugin('macros'),
    addCustom()
  ),
};
