/*
* @Author: jingduo
* @Date:   2017-11-25 15:34:52
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-25 17:40:31
*/
require('./index.scss')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')

/* page 逻辑部分*/
var page = {
	init: function() {
		this.onLoad()
		this.bindEvent()
	},
	onLoad: function() {
		navSide.init({
			name: 'user-pass-update'
		})
		this.loadUserInfo()
	},
	loadUserInfo: function(){
		
	},
	bindEvent: function(){
		var _this = this
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password: $.trim($('#password').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo)
			if(validateResult.status){
				_user.updatePassword({
					passwordOld: userInfo.password,
					passwordNew: userInfo.passwordNew
				},function(res){
					_mm.successTips(res.msg)
					// window.location.href = './user-center.html'
				},function(errMsg){
					_mm.errorTips(errMsg)
				})
			}else{
				_mm.errorTips(validateResult.msg)
			}
		})
	},
	//验证字段信息
	validateForm: function(formData){
		var result = {
			status: false,
			msg: ''
		}
		//验证原密码
		if(!_mm.validate(formData.password,'require')){
			result.msg = '请填写原密码'
			return result
		}
		//验证邮箱
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码长度必须大于6位'
			return result
		}
		//验证密码提示问题否为空
		if(formData.passwordConfirm !== formData.passwordNew){
			result.msg = '两次密码不一样'
			return result
		}
		result.status = true
		result.msg = "验证通过"
		return result
	}
}
$(function(){
	page.init()
})