
var Hogan = require('hogan')
var conf = {
	serverHost: ''
}
var _mm = {
	request: function(param) {
		var _this = this
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function(res) {
				//请求成功
				if(res.status === 0){
					typeof param.success === 'function' && param.success(res)
				}
				//没有登录状态，需要强制登录
				else if(res.status === 10){
					_this.doLogin()
				}
				//参数出错
				else if(res.status === 1){
					typeof param.error === 'function' && param.error(res.msg)
				}
			},
			error: function(err) {
				typeof param.error === 'function' && param.error(err.statusText)
			}
		})
	},
	//获取服务器地址
	getServerUrl: function(path) {
		return conf.serverHost + path
	},
	//url参数
	getUrlParam: function(name) {
		//happymmall.com/product/list?keyword=XXX&page=1
		var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)')
		var result = window.location.search.substr(1).match(reg);

		return result ? decodeURIComponent(result[2]) : null
	},
	//渲染html模板
	renderHtml: function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate)
		var result = template.render(data)
		return result
	},
	//成功提示
	successTips: function(msg) {
		alert(msg || '操作成功')
	},
	//错误提示
	errorTips: function(msg) {
		alert(msg || '哪里不对了')
	},
	//字段的验证，支持是非空判断、手机、邮箱
	validate: function(value,type){
		var value = $.trim(value)
		//非空验证
		if('require' === type){
			return !!value
		}
		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value)
		}
		//邮箱验证
		if('email' === type){
			return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)
		}
	},
	goHome: function() {
		window.location.href = './index.html'
	},
	//统一登录处理
	doLogin: function() {
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
	}
}


module.exports = _mm