var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname,
        filename: './dist/bundle.js', 
		publicPath: 'http://localhost:8090/assets',
        library: "home"
    },
    
    watch: NODE_ENV == 'development',
    
     watchOptions: {
    aggregateTimeout: 100
     },
    
    resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extensions:         ['', '.js']
  },
    
     resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },
    
    module: {
        loaders: [
           {
				loader: 'babel-loader',
                test: path.join(__dirname, 'app'),
                query: {
                  presets: 'es2015'
                }
			},{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.(ttf|woff|woff2|eot|svg)$/,
      loader: 'file-loader'
    }
        ]
    },
    plugins: [
        new CopyWebpackPlugin ([
            { from: './index.html', to: './dist/index.html' }
        ]),
        new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    })
    ], 
};
   
if (NODE_ENV == 'production') {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
  );
}