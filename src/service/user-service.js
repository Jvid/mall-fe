/*
* @Author: jingduo
* @Date:   2017-11-10 22:19:10
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-22 23:14:38
*/
var _mm = require('util/mm.js')

var _user = {
	//用户登录
	login: function(userInfo,resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	

	//登出
	logout: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//验证用户存在否
	checkUsername: function(username,resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			method: 'POST',
			data: {
				type: 'username',
				str: username
			},
			success: resolve,
			error: reject
		})
	},
	//用户注册
	register: function(userInfo,resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	//检查登录状态
	checkLogin: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	}
}

module.exports = _user