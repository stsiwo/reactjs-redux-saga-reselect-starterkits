const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: './src/index.tsx', 
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/reactjs-redux-saga-reselect-starterkits/',
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify("production"),
      //OWNER_BUCKET_NAME: JSON.stringify("bactivityhair.com-bucket"),
      //API1_URL: JSON.stringify("https://api.bactivityhair.com"),
      //PUBLIC_IMAGE_PATH: JSON.stringify("/images/"),
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  }
}); 
