/*
 * @Author: zhengquan
 * @Date:   2017-06-26 22:31:05
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-26 22:50:57
 */

'use strict';

var _util = require('util/util.js');
var _payment = {
    //获取支付信息
    getPaymentInfo: function(orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject,
        });
    },
    // 获取订单状态
    getPaymentStatus: function(orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject,
        });
    }
};
module.exports = _payment;
