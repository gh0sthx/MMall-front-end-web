/*
 * @Author: zhengquan
 * @Date:   2017-06-25 15:50:18
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-25 20:19:21
 */

'use strict';

var _util = require('util/util.js');
var _cities = require('util/cities/city.js');
var _address = require('service/address-service.js');
var templateAddressModel = require('./address-model.string');

var addressModel = {
    show: function(option) {
        //option的绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modelWrap = $('.model-wrap');
        //渲染页面
        this.loadModel();
        //绑定事件
        this.bindEvent();
    },
    hide: function() {
        this.$modelWrap.empty();
    },
    bindEvent: function() {
        var _this = this;
        // 省份和城市二级联动
        this.$modelWrap.find('#receiver-province').change(function() {
            var selectProvince = $(this).val();
            _this.loadCities(selectProvince);
        });
        //保存收货地址
        this.$modelWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            // 使用新地址，且验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res) {
                    _util.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _util.errorTips(errMsg);
                });
                //更新收件人，并且验证通过
            } else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function(res) {
                    _util.successTips('地址更新成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _util.errorTips(errMsg);
                });
                // 验证不通过
            } else {
                _util.errorTips(receiverInfo.errMsg || '好像哪里不对了～～');
            }
        });
        //关闭弹框
        this.$modelWrap.find('.model-con').click(function(e) {
            e.stopPropagation();
        });
        //点击model内容区，不关闭弹窗
        this.$modelWrap.find('.close').click(function() {
            _this.hide();
        });
    },
    // 获取表单里收件人信息,并坐表单的验证
    getReceiverInfo: function() {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modelWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modelWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modelWrap.find('#receiver-city').val();
        receiverInfo.receiverPhone = $.trim(this.$modelWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modelWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modelWrap.find('#receiver-zip').val());
        if (this.option.isUpdate) {
            receiverInfo.id = this.$modelWrap.find('#receiver-id').data('receiver-id');
        }
        // 表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入收件人所在城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    // 加载弹出框
    loadModel: function() {
        var addressModelHtml = _util.renderHtml(templateAddressModel, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modelWrap.html(addressModelHtml);
        //加载省份
        this.loadProvince();
    },
    //加载省份信息
    loadProvince: function() {
        var provinces = _cities.getProvinces(),
            $provinceSelect = this.$modelWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //如果是更新地址，并且有省份信息，做省份回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    // 加载城市信息
    loadCities: function(provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modelWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        //如果是更新地址，并且有城市信息，做城市回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    //获取select框的选项:输入array ,输出html
    getSelectOption: function(optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, iLength = optionArray.length; i < iLength; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    }
};
module.exports = addressModel;
