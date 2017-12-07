/*
* @Author: jingduo
* @Date:   2017-11-10 22:19:10
* @Last Modified by:   jingduo
* @Last Modified time: 2017-12-07 22:36:55
*/
var _mm = require('util/mm.js')

var _product = {
	//获取商品列表
	getProductList: function(listParam,resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/list.do'),
			method: 'POST',
			data: listParam,
			success: resolve,
			error: reject
		})
	},
	getProductDetail:function(productId,resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/detail.do'),
			method: 'POST',
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		})
	},
}

module.exports = _product