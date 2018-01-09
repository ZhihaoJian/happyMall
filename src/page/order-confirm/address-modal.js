var templateAddressModal = require('./address-modal.string');
var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _city = require('util/cities/index.js');

var addressModal = {
    show: function (option) {
        //option的绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        //渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    //关闭弹窗
    hide: function () {
        this.$modalWrap.empty();
    },
    loadModal: function () {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();

    },
    //加载城市
    loadCities: function (provinceName) {
        var cities = _city.getCities(provinceName) || [],
            $citySelected = this.$modalWrap.find('#receiver-city');

        $citySelected.html(this.getSelectedOption(cities));

        //如果是更新地址并且有城市信息做城市的回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelected.val(this.option.data.receiverCity);
        }
    },
    //加载省份
    loadProvince: function () {
        var provinces = _city.getProvinces() || [],
            $provincesSelect = this.$modalWrap.find('#receiver-province');
        $provincesSelect.html(this.getSelectedOption(provinces));
        //如果是更新地址并且有省份信息做省份的回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provincesSelect.val(this.option.data.receiverProvince);
            //加载省份
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    //获取select框的选项,输入数组array，输出html
    getSelectedOption: function (optionArray) {
        var html = '<option value="">请选择<option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    bindEvent: function () {
        var _this = this;

        //省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function (e) {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });

        //提交收货地址
        this.$modalWrap.find('#address-btn').click(function (e) {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            //使用新地址且通过
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function (res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
            //更新收件人地址并且验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function (res) {
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
            //验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
            }
        });

        //保证点击modal内容区时候不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        });

        //点击x号或者蒙版区域 关闭弹窗
        this.$modalWrap.find('.close').click(function (e) {
            _this.hide();
        });
    },
    //获取表单收件人信息方法，并做表单验证
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if (this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        //表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入收件人所在城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人的详细地址';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }

        return result;
    }
}

module.exports = addressModal;