var _mm = require('util/mm.js');

var _product = {
    //获取商品列表
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            success: resolve,
            error: reject,
            data: listParam
        });
    },
    // 获取商品详细信息
    getProductDetail: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            success: resolve,
            error: reject,
            data: { productId: productId }
        });
    },
};

module.exports = _product;

