var path 							= require('path')
var webpack 					= require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")

//环境变量的配置   online / dev
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

var getHtmlConfig = function(name,title) {
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		title: title,
		inject: true,
		hash: true,
		chunks: ['common',name]
	}
}

var config = {
	entry: {
		'common' : ['./src/page/common/index.js'],
		'index'  : ['./src/page/index/index.js'],
		'user-login'  : ['./src/page/user-login/index.js'],
		'user-register'  : ['./src/page/user-register/index.js'],
		'result'  : ['./src/page/result/index.js'],

	},
	output: {
		path : './dist',
		publicPath: '/dist',
		filename : 'js/[name].js'
	},
	externals: {
     'jquery': 'window.jQuery'
  },
	module:  {
    loaders:  [
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract("style-loader","css-loader")
      },
      {
        test: /\.string$/,
        loader:  "html-loader"
      },
      {
      	test: /\.scss$/,
      	loader: ExtractTextPlugin.extract("style", 'css!sass')
      },
      {
        test: /\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/,
        loader:  'url-loader?limit=100&name=resource/[name].[ext]'
      },
    ]
	},
	resolve: {
		alias: {
			node_modules: __dirname + '/node_modules',
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image',
		}
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename: 'js/base.js'
		}),
		new ExtractTextPlugin("css/[name].css"),
		new htmlWebpackPlugin(getHtmlConfig('index','首页')),
		new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new htmlWebpackPlugin(getHtmlConfig('result','操作结果')),

	],
}
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config