/*
* @Author: jingduo
* @Date:   2017-08-01 21:04:05
* @Last Modified by:   jingduo
* @Last Modified time: 2017-08-02 22:23:44
*/

'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

//环境变量的配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlCofig = function(name){
	return {
		template : './src/view/'+ name +'.html',
		filename : 'view/'+ name +'.html',
		inject : true,
		hash : true,
		chunks : ['common',name]
	}
}
//webpack 
 var config = {
	entry: {
		'common' : ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login':  ['./src/page/login/index.js']
	},
	output: {
		path: './dist',
		publicPath : '/dist',
		filename: 'js/[name].js'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module: {
	    loaders: [
	      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
	      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: "url-loader?limit=100&name=resource/[name].[ext]" }
	    ]
	},
	resolve : {
		alias : {
			util : __dirname + '/src/util',
			page : __dirname + '/src/page',
			service : __dirname + '/src/service',
			image : __dirname + '/src/image'
		}
	},
	plugins: [
		//独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		//将css单独打包到文件中
		new ExtractTextPlugin("css/[name].css"),
		//html末班的处理
		new HtmlWebpackPlugin(getHtmlCofig('index')),
		new HtmlWebpackPlugin(getHtmlCofig('login')),

	]
};
if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;