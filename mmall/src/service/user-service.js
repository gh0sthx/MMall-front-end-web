/*
 * @Author: zhengquan
 * @Date:   2017-06-15 23:17:41
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2017-06-22 15:18:27
 */

'use strict';

var _util = require('util/util.js');
var _user = {
    //注册
    register: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //登出
    login: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //登出
    logout: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //检验用户名
    checkUsername: function(username, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //检查登陆状态(获取用户基本信息)
    checkLogin: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //获取密码提示问题
    getQuesion: function(username, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //获取用户密码提示问题的答案
    checkQuestionAnswer: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //获取用户详细信息
    getUserInfo: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //修改个人信息
    updateUserInfo: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        });
    },
    //重置密码信息
    updatePasswordInfo:function(passwordInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/reset_password.do'),
            data: passwordInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        });
    }
};
module.exports = _user;
