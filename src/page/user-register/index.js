require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');


// 表单错误提示
var formError = {
    show: function (errorMsg) {
        $('.error-item').show().find('.err-msg').text(errorMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //验证username
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //如果用户名为空，不做验证
            if (!username) {
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            });
        });

        // 注册按钮点击
        $('#submit').click(function () {
            _this.submit();
        });

        // 如果按下回车则提交
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    //提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        },
            //表单验证结果
            validateResult = this.formValidate(formData);

        if (validateResult.status) {
            //验证成功
            _user.register(formData, function (res) {
                //成功callback
                window.location.href = './result.html?type=register';

            }, function (errMsg) {
                //失败回调
                formError.show(errMsg);
            });
        } else {
            //验证失败
            formError.show(validateResult.msg);

        }
    },
    // 表单验证字段
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validator(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validator(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码长度不一致';
            return result;
        }
        if (!_mm.validator(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mm.validator(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_mm.validator(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validator(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
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