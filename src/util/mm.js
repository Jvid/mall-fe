/*
* @Author: jingduo
* @Date:   2017-08-02 22:09:17
* @Last Modified by:   jingduo
* @Last Modified time: 2017-08-02 22:34:07
*/

'use strict';

var _mm = {
	//网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'GET',
			url : param.url || '',
			dataType : param.type || 'JSON',
			data : param.data || '',
			success : function(res){
				//请求成功
				if(0 === res.status){
					typeOf(param.success) === 'function' && param.success(res.data,res.msg);
				}
				//没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeOf(param.error) === 'function' && param.error(res.data,res.msg);
				}
			},
			error : function(err){
				console.log(typeOf(param.error) )
				typeOf(param.error) === 'function' && param.error(err.statusText);
			}
		})
	},
	//统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	}
};

module.exports = _mm;