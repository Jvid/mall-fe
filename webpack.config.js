var path 							= require('path')
var webpack 					= require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")

//环境变量的配置   online / dev
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

var getHtmlConfig = function(name) {
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		inject: true,
		hash: true,
		chunks: ['common',name]
	}
}

var config = {
	entry: {
		'common' : ['./src/page/common/index.js'],
		'index'  : ['./src/page/index/index.js'],
		'login'  : ['./src/page/login/index.js']
	},
	output: {
		path : './dist',
		publicPath: '/dist',
		filename : 'js/[name].js'
	},
	module:  {
    loaders:  [
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract("style-loader","css-loader")
      },
      {
      	test: /\.scss$/,
      	loader: ExtractTextPlugin.extract("style-loader","css-loader!sass-loader")
      },
      {
        test: /\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/,
        loader:  'url-loader?limit=100&name=resource/[name].[ext]'
      },
    ]
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename: 'js/base.js'
		}),
		new ExtractTextPlugin("css/[name].css"),
		new htmlWebpackPlugin(getHtmlConfig('index')),
		new htmlWebpackPlugin(getHtmlConfig('login')),

	],
}
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://loaclhost:8088/')
}

module.exports = config