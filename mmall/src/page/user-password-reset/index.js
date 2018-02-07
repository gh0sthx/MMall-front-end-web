/*
 * @Author: zhengquan
 * @Date:   2017-06-22 10:51:19
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-22 15:24:14
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');

//page逻辑部分
var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        //初始化左侧菜单
        navSide.init({
            name: 'update-password'
        });
    },
    bindEvent: function() {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function() {
            var passwordInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            }
            var validateResult = _this.validateForm(passwordInfo);
            if (validateResult.status) {
                //更新用户信息
                _user.updatePasswordInfo({
                    passwordOld: passwordInfo.password,
                    passwordNew: passwordInfo.passwordNew
                }, function(res) {
                    _util.successTips("密码修改成功");
                    window.location.href = './user-password-reset.html';
                }, function(errMsg) {
                    _util.errorTips(errMsg);
                });
            } else {
                _util.errorTips(validateResult.msg);
            }
        });
    },
    //表单字段的验证
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '新密码不能少于6位';
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
};
$(function() {
    page.init();
});
