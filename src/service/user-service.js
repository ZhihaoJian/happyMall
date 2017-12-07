var _mm = require('util/mm.js');

var _user = {
    // 获取用户密码提示问题
    getQuestion: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: {
                username: username
            }
        });
    },
    //登出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查登陆状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: userInfo
        });
    },
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: {
                type: 'username',
                str: username
            }
        });
    },
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: userInfo
        });
    },
    // 检查密码提示问题答案
    checkAnswer: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: userInfo
        });
    },
    // 重置密码
    resetpPassword: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: userInfo
        });
    },
    //获取用户信息
    getUserInfo: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //更新用户信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: userInfo
        });
    },
    //登录状态下，更新密码
    updatePassword: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            success: resolve,
            error: reject,
            data: userInfo
        });
    },
};

module.exports = _user;

