/*
 * @Author: zhengquan
 * @Date:   2017-06-15 23:34:36
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-25 00:06:11
 */

'use strict';

var _util = require('util/util.js');

var _cart = {
    //获取购物车的数量
    getCartCount: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/get_cart_product_count.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    addToCart: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject,
        });
    },
    // 获取购物车列表
    getCartList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/list.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    selectProduct: function(productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select.do'),
            data: { productId: productId },
            success: resolve,
            error: reject,
        });
    },
    unselectProduct: function(productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select.do'),
            data: { productId: productId },
            success: resolve,
            error: reject,
        });
    },
    selectAllProduct: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject,
        });
    },
    unselectAllProduct: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject,
        });
    },
    updateProduct: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject,
        });
    },
    deleteProduct: function(productIds, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/delete_product.do'),
            data: { productIds: productIds },
            success: resolve,
            error: reject,
        });
    }
};
module.exports = _cart;
