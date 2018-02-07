/*
 * @Author: zhengquan
 * @Date:   2017-06-18 20:21:53
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-21 22:51:50
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.error-msg').text('');
    }
};

//page逻辑部分
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this;
        //输入用户名获取密码提示问题中的按钮点击
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuesion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入用户名');
            }
        });
        //输入密码问题提示中的按钮点击
        $('#submit-answer').click(function() {
            var answer = $.trim($('#answer').val());
            //密码提示问题的答案
            if (answer) {
                _user.checkQuestionAnswer({
                    username: _this.data.username,
                    password: _this.data.password,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题的答案');
            }
        });
        //输入新密码的按钮点击
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            //密码提示问题的答案
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    password: _this.data.password,
                    forgetToken: _this.data.token
                }, function(res) {
                    window.location.href = './result.html?type=password-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入不少于6位新密码');
            }
        });
    },
    //加载输入用户名的一步
    loadStepUsername: function() {
        $('.step-username').show();
    },
    //加载密码提示问题的一步
    loadStepQuestion: function() {
        //错误信息的隐藏
        formError.hide();
        //步骤的切换
        $('.step-username').hide()
            .siblings('.step-answer').show()
            .find('.question').text(this.data.question);
    },
    //加载重置密码的的一步
    loadStepPassword: function() {
        //错误信息的隐藏
        formError.hide();
        //步骤的切换
        $('.step-answer').hide()
            .siblings('.step-password').show();
    }
};
$(function() {
    page.init();
});
