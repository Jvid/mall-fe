/*
* @Author: jingduo
* @Date:   2017-11-25 15:34:52
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-25 16:43:18
*/
require('./index.scss')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var templateIndex = require('./index.string')

/* page 逻辑部分*/
var page = {
	init: function() {
		this.onLoad()
	},
	onLoad: function() {
		navSide.init({
			name: 'user-center'
		})
		this.loadUserInfo()
	},
	loadUserInfo: function(){
		var userHtml = ''
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res.data)
			$('.panel-body').html(userHtml)
		},function(errMsg){
			_mm.errorTips(errMsg)
		})
	}
}
$(function(){
	page.init()
})