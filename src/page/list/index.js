require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        //排序的点击事件        
        $('.sort-item').click(function () {
            var $this = $(this);
            //重置页码
            _this.data.pageNum = 1;

            // 点击默认排序
            if ($this.data('type') === 'default') {
                // 如果是active样式
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active')
                        .siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击默认排序
            else if ($this.data('type') === 'price') {
                // 做active类处理
                $this.addClass('active')
                    .siblings('.sort-item')
                    .removeClass('active asc desc');
                // 升降序处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            //重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList: function () {

        var listParam = this.data.listParam,
            listHtml = '',
            _this = this,
            $pListCon = $('.p-list-con');

        //loading加载
        $pListCon.html('<div class="loading"></div>');

        // 删除参数中不必要的字段
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

        // 请求接口
        _product.getProductList(listParam, function (res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagenation({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagenation: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(
            $.extend({}, pageInfo, {
                container: $('.pagination'),
                onSelectPage: function (pageNum) {
                    _this.data.listParam.pageNum = pageNum;
                    _this.loadList();
                }
            })
        );
    }
};

$(function () {
    page.init();
})