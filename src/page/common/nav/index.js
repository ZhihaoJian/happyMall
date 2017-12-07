var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
require('./index.css');

// 导航
var nav = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function () {
        //登陆点击事件
        $('.js-login').click(function () {
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (error) {
                _mm.errorTips(error.Msg);
            });
        });
    },
    //加载用户信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login')
                .hide()
                .siblings('.user.login')
                .show()
                .find('.username')
                .text(res.username);
        }, function (error) {

        })
    },
    //加载用户购物车数量
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count')
                .text(res || 0);
        }, function (error) {
            $('.nav .cart-count')
                .text(0);
        })
    }
};

module.exports = nav.init();