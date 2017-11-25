/*
* @Author: jingduo
* @Date:   2017-11-23 20:18:02
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-23 21:22:36
*/
require('./index.scss')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')

//表单里的错误提示
var formError = {
	show: function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg)
	},
	hide: function(){
		$('.error-item').hide().find('.err-msg').text('')
	}
}
/* page 逻辑部分*/
var page = {
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function() {
		this.onLoad()
		this.bindEvent()
	},
	onLoad: function(){
		this.loadStepUsername()
	},
	//登录点击按钮
	bindEvent: function() {
		var _this = this
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//用户名存在
			if(username){
				_user.getQuestion(username,function(res){
					_this.data.username = username
					_this.data.question = res.data
					_this.loadStepQuestion()
				},function(errMsg){
					formError.show(errMsg)
				})
			}
			//用户名不存在
			else{
				formError.show('请输入用户名')
			}
		})
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val())
			//检查密码提示问题答案
			if(answer){
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				},function(res){
					_this.data.answer = answer
					_this.data.token = res.data
					_this.loadStepPassword()
				},function(errMsg){
					formError.show(errMsg)
				})
			}
			//用户名不存在
			else{
				formError.show('请输入密码提示问题答案')
			}
		})
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val())
			//检查密码提示问题答案
			if(password && password.length >= 6){
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset'
				},function(errMsg){
					formError.show(errMsg)
				})
			}
			//用户名不存在
			else{
				formError.show('请输入不少于6位的新密码')
			}
		})
	},
	//提交表单
	submit: function() {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		}
		//表单验证结果
		var validateResult = this.formValidate(formData)
		
		if(validateResult.status){
			//提交
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html'
			},function(errMsg){
				formError.show(errMsg)
			})
		}
		//验证失败
		else{
			//错误提示
			formError.show(validateResult.msg)
		}
	},
	// 加载输入用户名的一步
	loadStepUsername: function() {
		$('.step-username').show()
	},
	// 加载输入密码提示问题答案的一步
	loadStepQuestion: function() {
		formError.hide()
		//隐藏错误提示  显示第二步  将问题插入
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question)
	},
	// 加载输入password的一步
	loadStepPassword: function() {
		formError.hide()
		$('.step-question').hide().siblings('.step-password').show()
	}

}
$(function(){
	page.init()
})