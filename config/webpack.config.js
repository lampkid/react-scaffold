var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var projectConf = require('./project.config.js');
var entry = projectConf.entry;

var hasCommon = true;

var CDN_ONLINE = 'http://127.0.0.1:8080/dist/'; //online path
var CDN_OFFLINE = 'http://127.0.0.1:8080/dist/'; //local path
var nodeEnv = process.env.NODE_ENV;

//var outputPath = path.resolve(__dirname, '../../../dist/activity/')
var outputPath = path.resolve(__dirname, '../dist/')


var config = {
  entry: entry,
  output: {
        path: outputPath ,
        filename: "[name].js",
        publicPath: nodeEnv === 'development' ? CDN_OFFLINE : CDN_ONLINE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: function (path) {
            //return !!(path.match('node_modules/') && !path.match('node_modules/pome'));
            return !!(path.match('node_modules/'));
      }
      
    },
    // CSS
    { 
      test: /\.(css)$/, 
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]'
    },
    {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=[local]' })
    },
    {
        test: /\.less$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?modules&importLoaders=1&localIdentName=[local]', 'less-loader'] })
    },
    /*
    {
        test: /\.css$/,
        loaders: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]' 
    },
    {
        test: /\.less$/,
        loaders: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]!less-loader'
    }
    */


    /*
    // CSS
    { 
      test: /\.(css)$/, 
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]'
    }
    */
    ]
  }
};


if (nodeEnv === 'development') {

    config.devtool = 'source-map';

    config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': "'development'"
          }
        })
    );

    var devServerConfig = require('./webpack-dev-server.js');

    config.devServer =  devServerConfig;

    //生成页面
    var webpackPagePlugins = projectConf.pages;
    config.plugins = config.plugins.concat(webpackPagePlugins);

}

if (nodeEnv === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': "'production'"
          }
        })
    );

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        })

    );
}

config.plugins.push(

        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        })
);


if (hasCommon) {
    config.entry.common = ['react', 'react-dom'];

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.js'})) 

}


module.exports = config;


