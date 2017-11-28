require('./index.css')
var _mm = require('util/mm.js');

//通用页面头部
var header = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //点击搜索按钮，做搜索提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //点击回车搜索提交
        $('.search-input').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    onLoad: function () {
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    //搜索提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        //如果提交时候有keyword，则正常跳转到list页面，否则返回首页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _mm.goHome();
        }
    }
}

header.init();