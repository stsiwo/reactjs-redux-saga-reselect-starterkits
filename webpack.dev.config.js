const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // dev server outputs bundled file in contentBase directory, but where you define in output property
  devServer: {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: true,
    port: 3000 
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify("development"),
      OWNER_BUCKET_NAME: JSON.stringify("bactivityhair.com-dev-bucket"),
      API1_URL: JSON.stringify("http://localhost:8080"),
      PUBLIC_IMAGE_PATH: JSON.stringify("/images/"),
    })
  ]
}); 
