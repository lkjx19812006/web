'use strict';
import axios from 'axios'
import Vue from 'vue'
import CryptoJS from "crypto-js"

var httpService = new Vue({
    data: {
        customerId: '',
        urlCommon: '/front',
        KEY: window.localStorage.KEY,
        SID: window.localStorage.SID,
        difTime: 0,
        h5needUrl: 'http://apps.yaocaimaimai.com/htm5/#/needDetails/', //http://apps.yaocaimaimai.com/htm5/#/needDetails/ http://192.168.1.142:81/htm5/#/needDetails/
        apiUrl: {
            login: '/account/login.do',
            code_login: '/account/verifiLogin.do',
            getDate: '/system/date.do',
            most: '/handle/control.do'
        }
    },
    methods: {
        addSID: function addSID(url) {
            if (this.SID && this.SID != undefined) {
                return url + ';jsessionid=' + this.SID;
            } else {
                return url;
            }
        },
        getSID: function getSID(req, redirect) {
            if (req) {
                var cookiesObj = {};
                var cookie = req.headers.cookie;
                this.difTime = req.session.difTime;
                cookie && cookie.split(';').forEach(function(Cookie) {
                    function Trim(str) {
                        return str.replace(/(^\s*)|(\s*$)/g, "");
                    }
                    Cookie = Trim(Cookie);
                    var parts = [];
                    parts[0] = Cookie.substr(0, 3);
                    parts[1] = Cookie.substr(4, Cookie.length);
                    if (parts[1]) cookiesObj[parts[0].trim()] = (parts[1] || '').trim();
                });
                this.SID = cookiesObj.SID;
                this.KEY = cookiesObj.KEY;
            } else {
                this.KEY = window.localStorage.KEY;
                this.SID = window.localStorage.SID;
            }
            if (!this.SID) {
                redirect('/login');
            }
        },
        getDate: function getDate(cb) {
            var _self = this;
            if (_self.difTime && cb) {
                return cb();
            } else if (_self.difTime) {
                return;
            } else {
                this.commonGet(this.urlCommon + this.apiUrl.getDate).then(function(response) {
                    if (response.code == '1c01') {
                        var timestamp = Date.parse(new Date());
                        window.localStorage.difTime = response.biz_result.time - timestamp;
                        _self.difTime = response.biz_result.time - timestamp;
                        if (cb) cb();
                    } else {
                        /*_self.$message({
                          showClose: true,
                          message: response.msg,
                          type: 'error'
                        });*/
                    }
                }, function(err) {
                    /* _self.$message({
                       showClose: true,
                       message: '网络错误，请稍后重试',
                       type: 'error'
                     });*/
                });
            }
        },
        getSign: function getSign(str) {
            var _self = this;
            if (!_self.KEY) {
                _self.KEY = 'test';
            }
            if (!str) {
                str = 'test';
            }
            var signStr = CryptoJS.HmacSHA1(str, _self.KEY).toString(CryptoJS.enc.Base64);
            return signStr;
        },
        commonPost: function commonPost(url, data) {
            var _self = this;
            return new Promise(function(resolve, reject) {
                axios({ method: 'post', url: url, data: data }).then(function(response) {
                    if (response.status === 200) {
                        if (response.data.code === '1c01') {
                            resolve(response.data);
                        } else {
                            _self.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                            reject(response.data);
                        }
                    }
                }).catch(function(error) {
                    // if (!process.BROWSER_BUILD) 浏览器环境 暂时用不到
                    if (error.response !== undefined && error.response !== '') {
                        if (error.response.status === 403 || error.response.status === 408) {
                            window.localStorage.KEY = '';
                            window.localStorage.SID = '';
                            _self.KEY = '';
                            _self.SID = '';
                            window.location.href = '/login';
                        };
                    };
                    reject(error);
                    /*if (!process.BROWSER_BUILD) {
                      } else {
                      _self.$message({
                        type: 'info',
                        message: '操作失败'
                      });
                    }*/
                });
            });
        },
        commonGet: function commonGet(url) {
            return new Promise(function(resolve, reject) {
                axios.get(url).then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                });
            });
        },
        commonGetEWMURL: function commonGetEWMURL(breeName, id) {
            var GB2312UnicodeConverter = {
                ToUnicode: function(str) {
                    return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
                },
                ToGB2312: function(str) {
                    return unescape(str.replace(/\\u/gi, '%u'));
                }
            };
            breeName = GB2312UnicodeConverter.ToUnicode(breeName);
            if (id.length <= 24) {
                var num = Math.floor(Math.random() * 10000000000);
                return this.h5needUrl + id + '?value=web&num=' + num;
            } else {
                return this.h5needUrl + id + '?value=web';
            }
        },
        validateUserInfo: function validateUserInfo(userInfo, callback) {
            //登录过了 有phone 才校验 没有登录不校验 没有名字要去 没有用户类型 要去 没有用户身份 要去
            if (userInfo.phone && (userInfo.userType === 0 || userInfo.manageType === -1  || userInfo.bizMain == '')) {
                callback();
                return false;
            } else {
                return true;
            }
        }

    }
});
export default httpService;
