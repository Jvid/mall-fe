/*
* @Author: jingduo
* @Date:   2017-12-07 21:21:58
* @Last Modified by:   jingduo
* @Last Modified time: 2017-12-07 23:06:31
*/
require('./index.scss')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _cart = require('service/cart-service.js')
var _product = require('service/product-service.js')
var templateIndex = require('./index.string')

var page = {
	data: {
		productId : _mm.getUrlParam('productId') || '',
	},
	init: function() {
		this.onLoad()
		this.bindEvent()
	},
	onLoad: function() {
		// 如果没有传id  调回主页
		if(!this.data.productId){
			_mm.goHome()
		}
		this.loadDetail()
	},
	bindEvent: function() {
		var _this = this
		// 图片预览
		$(document).on('mouseenter','.p-img-item',function(){
			var imageUrl = $(this).find('.p-img').attr('src')
			$('.main-img').attr('src',imageUrl)
		})
		// count的操作
		$(document).on('click','.p-count-btn',function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus'
			var $pCount = $('.p-count')
			var currCount = ~~$pCount.val()
			var minCount = 1
			var maxCout = _this.data.detailInfo.stock || 1
			if(type == 'plus'){
				$pCount.val((currCount+1) < maxCout ? (currCount+1) : maxCout)
			}else if(type == 'minus'){
				$pCount.val((currCount - 1) > minCount ? (currCount - 1) : minCount)
			}
		})
		// 加入购物车
		$(document).on('click','.cart-add',function(){
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			},function(res){
				window.location.href = './result.html?type=cart-add'
			},function(errMsg){
				_mm.errorTips(errMsg)
			})
		})
	},
	loadDetail: function() {
		var _this = this
		var html = '',$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>')
		_product.getProductDetail(this.data.productId,function(res){
			_this.filter(res.data)
			_this.data.detailInfo = res.data
			html = _mm.renderHtml(templateIndex,res.data)
			$pageWrap.html(html)
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>')
		})
	},
	filter: function(data) {
		data.subImages = data.subImages.split(',')
	}
}
$(function(){
	page.init()
})