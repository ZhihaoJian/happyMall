var _mm = require('util/mm.js');

var _user = {
    //登出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            medthod: 'post',
            success: resolve,
            error: reject
        })
    },
    //检查登陆状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            medthod: 'post',
            success: resolve,
            error: reject
        })
    }
};

module.exports = _user;

