var _mm = require('util/mm.js');

var _address = {
    //获取地址列表
    getAddressList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            success: resolve,
            error: reject,
            data: {
                pageSize: 50,
                pageNum: 1
            }
        });
    },
    //新建收件人地址
    save: function (addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            success: resolve,
            error: reject,
            data: addressInfo
        });
    },
    //更新收件人地址
    update: function (addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            success: resolve,
            error: reject,
            data: addressInfo
        });
    },
    //获取单条收件人信息
    getAddress: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    },
    //删除收件人
    deleteAddress: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _address;

