/*
* @Author: jingduo
* @Date:   2017-11-10 22:31:46
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-10 22:38:33
*/
var _mm = require('util/mm.js')
var _cart ={
	//获取购物车数量
	getCartCount: function(resolve,reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	},

}
module.exports = _cart