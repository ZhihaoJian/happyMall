require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');



var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber') || ''
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        if (!this.data.orderNumber) {
            _mm.goHome();
        }
        this.loadPaymentInfo();
    },
    // 加载商品详情数据
    loadPaymentInfo: function () {
        var html = '',
            $pageWrap = $('.page-wrap'),
            _this = this;

        //loading
        $pageWrap.html('<div class="loading"></div>');

        // 请求detail信息
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    //监听订单状态    
    listenOrderStatus: function () {
        this.paymentTimer = window.setInterval(() => {
            _payment.getPaymentStatus(this.data.orderNumber, function (res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&paymentNumber=' + this.data.orderNumber;
                }
            });
        }, 5000)
    }

};

$(function () {
    page.init();
})