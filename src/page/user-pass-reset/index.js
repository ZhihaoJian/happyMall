require('./index.css');

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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUserName();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名后下一步的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            // 用户名存在
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                // 不存在用户名
                formError.show('请提示用户名');

            }
        });
        // 输入密码提示问题答案的下一步点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            // 检查密码提示问题答案
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                // 不存在用户名
                formError.show('请提示密码提示问题答案');

            }
        });

        // 输入新密码后的下一步点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            // 检查密码提示问题答案
            if (password && password.length >= 6) {
                _user.resetpPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                // 密码为空
                formError.show('请输入不少于6位的新密码');

            }
        });
    },
    //加载用户输入名的第一步
    loadStepUserName: function () {
        $('.step-username').show();
    },

    //加载输入密码提示问题的第一步

    loadStepQuestion: function () {
        // 隐藏错误提示
        formError.hide();
        //做容器的切换
        $('.step-username')
            .hide()
            .siblings('.step-question')
            .show()
            .find('.question')
            .text(this.data.question);

    },

    //加载输入密码的第一步
    loadStepPassword: function () {
        // 隐藏错误提示
        formError.hide();
        //做容器的切换
        $('.step-question')
            .hide()
            .siblings('.step-password').show();

    }
}

$(function () {
    page.init();
})