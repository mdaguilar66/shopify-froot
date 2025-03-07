const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // Switch to 'production' when deploying

  entry: './src/index.js', // ✅ Single entry point

  output: {
    path: path.resolve(__dirname, 'dist'), // ✅ Output compiled assets inside `dist/assets`
    filename: 'assets/theme.min.js', // ✅ Bundled JS file
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/theme.css.liquid', // ✅ CSS output file
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }, // ✅ Copy static assets (images, fonts, etc.)
        { from: 'src/config', to: 'config' }, // ✅ Copy theme settings
        { from: 'src/layout', to: 'layout' }, // ✅ Copy layouts
        { from: 'src/locales', to: 'locales' }, // ✅ Copy translations
        { from: 'src/sections', to: 'sections' },
        { from: 'src/snippets', to: 'snippets' }, // ✅ Copy snippets
        { from: 'src/templates', to: 'templates' }, // ✅ Copy templates
      ],
    }),
  ],
};