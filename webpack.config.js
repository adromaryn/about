'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const	path	=	require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports ={
  entry: [
    'babel-polyfill'
  ],
  entry: {
    auth: __dirname + '/src/auth/index.js'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: 2
    }),
    new ExtractTextPlugin("[name].css")
  ],

  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['','.js']
  },

  resolveLoader: {
    moduleDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },
  module : {

    preloaders: [
      {
        loader: 'eslint',
        include: [
          path.resolve(__dirname,	"src")
        ],
        test:	/\.jsx?$/
      }
    ],

    loaders: [
      {
        loader: 'babel',
        include: [
          path.resolve(__dirname,	"src")
        ],
        test: /\.jsx?$/,
        query: {
          cacheDirectory: true
        }
      },
      {
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        test: /\.css$/
      },
      {
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
        test: /\.scss$/
      }
    ]
  }
}

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new OptimizeCssAssetsPlugin()
  );
}
