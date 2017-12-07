/*
* @Author: jingduo
* @Date:   2017-11-25 15:34:52
* @Last Modified by:   jingduo
* @Last Modified time: 2017-12-05 22:21:00
*/
require('./index.scss')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _product = require('service/product-service.js')
var Pagination = require('util/pagination/index.js')
var templateIndex = require('./index.string')

var page = {
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy:  _mm.getUrlParam('orderBy') || 'default',
			pageNum:  _mm.getUrlParam('pageNum') || 1,
			pageSize:  _mm.getUrlParam('pageSize') || 20
		}
	},
	init: function() {
		this.onLoad()
		this.bindEvent()
	},
	onLoad: function() {
		//加载list数据
		this.loadList()
	},
	bindEvent: function() {
		var _this = this
		//排序的点击事件
		$('.sort-item').click(function(){
			var $this = $(this)
			if($this.data('type') === 'default'){
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
					_this.data.listParam.orderBy = 'default'
				}
			}else if($this.data('type') === 'price'){
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
				_this.data.listParam.pageNum = 1
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc')
					_this.data.listParam.orderBy = 'price_asc'
				}else{
					$this.addClass('desc').removeClass('asc')
					_this.data.listParam.orderBy = 'price_desc'
				}
			}
			//重新加载列表
			_this.loadList()
		})
	},
	loadList: function() {
		var _this = this
		var listHtml = ''
		var listParam = this.data.listParam
		var $pListCon = $('.p-list-con')
		$pListCon.html('<div class="loading"></div>')
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
		_product.getProductList(listParam,function(res){
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.data.list
			})
			$pListCon.html(listHtml)
			_this.loadPagination({
				hasPreviousPage: res.data.hasPreviousPage,
				prePage: res.data.prePage,
				hasNextPage: res.data.hasNextPage,
				nextPage: res.data.nextPage,
				pageNum: res.data.pageNum,
				pages: res.data.pages
			})
		},function(errorMsg){
			_mm.errorTips(errorMsg)
		})
	},
	// 加载分页信息
	loadPagination: function(pageInfo){
		var _this = this
		this.pagination ? '' : this.pagination = new Pagination()
		this.pagination.render($.extend({},pageInfo,{container: $('.pagination'),onSelectPage: function(pageNum){
			_this.data.listParam.pageNum = pageNum
			_this.loadList()
		}}))
	}
}
$(function(){
	page.init()
})