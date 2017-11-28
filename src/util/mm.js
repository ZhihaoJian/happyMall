var conf = {
    serverHost: ''
};

var hogan = require('hogan.js');

var _mm = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登陆，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //回到首页
    goHome: function () {
        window.location.href = './index.html';
    },
    //渲染html模板
    renderHtml: function (htmlTemplate, data) {
        var template = hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功!');
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '操作失败!');
    },
    //表单字段验证，支持非空判断、手机、邮箱
    validator: function (value, type) {
        var value = $.trim(value);
        //非空验证
        if (type === 'require') {
            return !!value;
        }
        //手机号验证
        if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if (type === 'email') {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }
    }
};

module.exports = _mm;