/*
* @Author: zhengquan
* @Date:   2017-06-25 14:17:58
* @Last Modified by:   zhengquan
* @Last Modified time: 2017-06-25 20:36:16
*/

'use strict';

var _util = require('util/util.js');
var _address = {
    //获取地址列表信息
    getAddressList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/list.do'),
            data:{
            	pageSize:50
            },
            success: resolve,
            error: reject,
        });
    },
    //新建收件人收货信息
    save: function(addressInfo,resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/add.do'),
            data:addressInfo,
            success: resolve,
            error: reject,
        });
    },
    //更新收件人收货信息
    update:function(addressInfo,resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/update.do'),
            data:addressInfo,
            success: resolve,
            error: reject,
        });
    },
    //删除收件人收货信息
    deleteAddress:function(shippingId,resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/del.do'),
            data:{
                shippingId:shippingId
            },
            success: resolve,
            error: reject,
        });
    },
    // 获取要编辑的收货人收货信息
    getAddress: function(shippingId,resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/select.do'),
            data:{
                shippingId:shippingId
            },
            success: resolve,
            error: reject,
        });
    }
};
module.exports = _address;