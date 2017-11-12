/*
* @Author: jingduo
* @Date:   2017-11-11 12:57:30
* @Last Modified by:   jingduo
* @Last Modified time: 2017-11-12 09:52:50
*/
require('./index.scss')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js')

$(function(){
	var type = _mm.getUrlParam('type') || 'default'
	var $element = $('.'+type+'-success')
	$element.show()
})