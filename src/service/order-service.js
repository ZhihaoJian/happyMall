var _mm = require('util/mm.js');

var _order = {
    //获取商品列表
    getProductList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject,
        });
    },
    //提交订单
    createOrder: function (orderInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            success: resolve,
            error: reject,
            data: orderInfo
        });
    },
    //获取订单列表
    getOrderList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            success: resolve,
            error: reject,
            data: listParam
        });
    },
    //获取订单详情
    getOrderDetail: function (orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            success: resolve,
            error: reject,
            data: {
                orderNo: orderNumber
            }
        });
    },
    //取消订单
    cancelOrder: function (orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            success: resolve,
            error: reject,
            data: {
                orderNo: orderNumber
            }
        });
    }
};

module.exports = _order;

