require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var nav_side = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');


// page逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //点击提交按钮的动作
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            },
                validateResult = _this.validateForm(userInfo);

            if (validateResult.status) {
                //更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    onLoad: function () {
        // 初始化左侧菜单
        nav_side.init({
            name: 'user-pass-update'
        });
    },

    // 验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        //验证原密码是否为空
        if (!_mm.validator(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不得少于6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }

        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function () {
    page.init();
})