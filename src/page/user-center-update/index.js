/*
* @Author: jingduo
* @Date:   2017-11-25 15:34:52
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-25 17:03:05
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
		this.bindEvent()
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
	},
	bindEvent: function(){
		var _this = this
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo)
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res){
					_mm.successTips(res.msg)
					window.location.href = './user-center.html'
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
		//验证手机号
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result
		}
		//验证邮箱
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱不正确'
			return result
		}
		//验证密码提示问题否为空
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题不能为空'
			return result
		}
		//验证密码提示问题答案
		if(!_mm.validate(formData.answer,'require')){
			result.msg = '密码提示问题答案不能为空'
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