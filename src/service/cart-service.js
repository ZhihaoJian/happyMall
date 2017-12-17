var _mm = require('util/mm.js');

var _cart = {
    //登出
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    },
    // 添加到购物车
    addToCart: function (productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            success: resolve,
            error: reject,
            data: productInfo
        })
    }
};

module.exports = _cart;