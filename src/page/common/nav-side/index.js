/*
* @Author: jingduo
* @Date:   2017-11-11 11:54:46
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-25 17:23:22
*/
require('./index.scss')
var _mm   = require('util/mm.js')
var templateIndex = require('./index.string')
//侧边导航
var navSide = {
	option: {
		name: '',
		navList: [
			{name: 'user-center', desc: '个人中心', href: './user-center.html'},
			{name: 'order-list', desc: '我的订单', href: './order-list.html'},
			{name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html'},
			{name: 'about', desc: '关于MMall', href: './about.html'}
		]
	},
	init: function(option) {
		//合并选项  用户传进来的option和初始option合并
		$.extend(this.option, option)
		this.renderNav();

	},
	renderNav: function (){
		var _this = this
		//计算active数据
		this.option.navList.map(function(v,i){
			if(v.name === _this.option.name){
				v.isActive = true
			}
		})
		//渲染list数据
		var navHtml = _mm.renderHtml(templateIndex,{navList:this.option.navList})
		//把HTML放入容器
		$('.nav-side').html(navHtml)
	}
}

module.exports = navSide