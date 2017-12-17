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
    },
    // 获取购物车列表
    getCartList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        })
    },
    //选择购物车商品
    selectProduct: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            success: resolve,
            error: reject,
            data: {
                productId: productId
            }
        })
    },
    //取消选择购物车商品
    unselectProduct: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            success: resolve,
            error: reject,
            data: {
                productId: productId
            }
        })
    },
    //取消选择购物车全部商品
    unselectAllProduct: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        })
    },
    //选择购物车全部商品
    selectAllProduct: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        })
    },
    // 更新购物车商品数量
    updateProduct: function (productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            success: resolve,
            error: reject,
            data: productInfo
        })
    },
    //删除指定商品
    deleteProduct: function (productIds, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/delete_product.do'),
            success: resolve,
            error: reject,
            data: {
                productIds: productIds
            }
        })
    },
};

module.exports = _cart;