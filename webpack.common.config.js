const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Note: html-webpack-plugin must come before favicons-webpack-plugin in the plugins array.
    new HtmlWebpackPlugin({
      title: 'ReactJS + Redux-Saga + Reselect (TypeScript) Starter Kits',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      template: 'src/index.html',
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/external' }
      ]
    }),
    //new FaviconsWebpackPlugin('./static/ryohei_kato_logo_face.svg'), // svg works too!
    //new BundleAnalyzerPlugin({
    //  analyzerPort: 8889,
    //  analyzerMode: "static",
    //}),
    // https://github.com/kensnyder/quill-image-resize-module/issues/7
    // to prevent error: Uncaught TypeError: Cannot read property 'imports' of undefined (caused by quill-image-xxxx libarary)
    //new webpack.ProvidePlugin({
    //  'window.Quill': 'quill',
    //  'Quill': 'quill/dist/quill.js',
    //})
  ],
  resolve: {
    mainFiles: ['index'],
    modules: ['node_modules'],
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      hooks: path.resolve(__dirname, 'src/ui/hooks/'),
      contexts: path.resolve(__dirname, 'src/ui/contexts/'),
      components: path.resolve(__dirname, 'src/ui/components/'),
      ui: path.resolve(__dirname, 'src/ui/'),
      requests: path.resolve(__dirname, 'src/requests/'),
      domain: path.resolve(__dirname, 'src/domain/'),
      configs: path.resolve(__dirname, 'src/configs/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      states: path.resolve(__dirname, 'src/states/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      sideEffects: path.resolve(__dirname, 'src/sideEffects/'),
      src: path.resolve(__dirname, 'src/'),
      static: path.resolve(__dirname, 'src/assets'),
      tests: path.resolve(__dirname, 'tests/'),
    }
  },
  // webpack does not tell whether you installed listed loader until it is used. so be careful
  // don't include "include" option if you are intended to include node modoule resource
  module: {
    rules: [
      // react-spring bug: 'r.XXXFunction is not function'
      // when bundle for production, produces above error.
      // solution: put below rule
      // ref: https://github.com/pmndrs/react-spring/issues/1078
      {
        test: /react-spring/,
        sideEffects: true
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // https://github.com/kensnyder/quill-image-resize-module/issues/7
        // to prevent error: Uncaught TypeError: Cannot read property 'imports' of undefined (caused by quill-image-xxxx libarary)
        //exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(s[ac]ss|css)$/i,
        // NOTE: You can use it standalone or in conjunction with css-loader (recommended). Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader, if you use any.
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            }
          }
        ],
      },
      {
        // for favicon
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'file-loader'
        ]
      }
      //]
      //{
      //test: /\.(csv|tsv)$/,
      //include: path.resolve(__dirname, 'src'),
      //use: [
      //'csv-loader'
      //]
      //},
      //{
      //test: /\.xml$/,
      //include: path.resolve(__dirname, 'src'),
      //use: [
      //'xml-loader'
      //]
      //}
    ]
  }
};
