/*
* @Author: jingduo
* @Date:   2017-11-10 22:50:45
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-10 23:08:38
*/
require('./index.scss')
var _mm   = require('util/mm.js')

//通用页面头部
var header = {
	init: function(){
		this.bindEvent()
	},
	onLoad: function() {
		var keyword = _mm.getUrlParam('keyword')
		if(keyword){
			// keyword存在则回填输入框
			$('#search-input').val(keyword)
		}
	},
	bindEvent: function(){
		var _this = this
		//点击搜索按钮以后  做走索提交
		$('#search-btn').click(function(){
			_this.searchSubmit()
		})
		//按下回车   做搜索
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				//13 是回车键的keyCode
				_this.searchSubmit()
			}
		})
	},
	//搜索的提交
	searchSubmit: function() {
		var keyword =$.trim($('#search-input').val())
		//如果提交的时候有keyword，正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword='+keyword
		}
		//如果没有keywork 跳回主页
		else{
			_mm.goHome()
		}
	}
}
header.init()