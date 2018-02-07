/*
 * @Author: zhengquan
 * @Date:   2017-06-22 23:53:28
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-24 16:05:15
 */

'use strict';

var _util = require('util/util.js');
var _product = {
    //获取产品列表信息
    getProductList: function(listParam, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject,
        });
    },
    // 获取产品详细信息
    getProductDetail: function(productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject,
        });
    },
};
module.exports = _product;
