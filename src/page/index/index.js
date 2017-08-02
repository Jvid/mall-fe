/*
* @Author: jingduo
* @Date:   2017-08-01 21:09:11
* @Last Modified by:   jingduo
* @Last Modified time: 2017-08-02 22:48:15
*/

'use strict';
var _mm = require('util/mm.js');

_mm.request({
	url : '/product/list.do?keyword=1',
	success : function(res){
		console.log(res);
	},
	error : function(errMsg){
		console.log(errMsg);
	}
})