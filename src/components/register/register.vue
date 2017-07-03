<style lang="less" scoped>
.orange_button {
    width: 360px;
    background-color: #FA8435;
    border: none;
}

.content {
    flex: 0 0 auto !important;
    .dis_span {
        font-size: 14px;
        color: #48576a;
    }
    .green_span {
        font-size: 14px;
        color: #3CB371;
        cursor: pointer;
    }
    .green_span:hover {
        color: #F98435;
    }
    .orange_span {
        color: #FA8435;
        cursor: pointer;
    }
    .center_span {
        margin: 0 10px;
        background-image: url("../../assets/images/captcha.png");
        background-repeat: no-repeat;
        background-position: center;
        font-size: 16px;
        background-color: #FFF0F5;
        font-weight: bold;
        width: 80px;
        display: inline-block;
        text-align: center;
        color: #FF0000;
    }
    .protol_wrap .title {
        text-align: center;
        padding: 10px 0;
        font-size: 18px;
        font-weight: 700;
        background-color: #FBFAF6;
    }
    .protol_wrap .content {
        height: 440px;
        padding: 0 20px;
        overflow-y: scroll;
    }
    .protol_wrap .footer {
        height: 80px;
        .btn {
            height: 50px;
            width: 100px;
            line-height: 50px;
            color: #fff;
            background-color: #F98435;
            padding: 0 20px;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            margin: 20px auto;
            cursor: pointer;
        }
    }
    .input_wrap {
        width: 360px;
        .input_message_wrap {
            display: inline-block;
            width: 245px;
        }
        .btn_wrap {
            display: inline-block;
            text-align: center;
            width: 102px;
            height: 34px;
            line-height: 34px;
            background-color: #FFD200;
            color: #fff;
            border: 1px solid #FFD200;
            border-radius: 4px;
            float: right;
            cursor: pointer;
        }
        .gay_wrap {
            color: #A7A7A7;
            background-color: #F8F8F8;
            border-color: #F0EFEF;
            cursor: not-allowed;
        }
    }
}
</style>
<template>
    <div class="content" v-loading.body="showLoading">
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item class="" label="用户名称" prop="fullname">
                <div class="input_wrap">
                    <el-input v-model="ruleForm.fullname" placeholder="请输入用户名称"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <div class="input_wrap">
                    <el-input v-model="ruleForm.phone" placeholder="请输入11位手机号"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="短信验证码" prop="messageCode">
                <div class="input_wrap">
                    <div class="input_message_wrap">
                        <el-input v-model="ruleForm.messageCode" placeholder="请输入短信验证码"></el-input>
                    </div>
                    <span v-show="!countShow" class="btn_wrap" @click="getCode()">获取验证码</span>
                    <span v-show="countShow" class="btn_wrap gay_wrap">{{time}}秒后重试</span>
                </div>
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
                <div class="input_wrap">
                    <el-input type="password" v-model="ruleForm.password" placeholder="6-12位字母、数字或符号"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <div class="input_wrap">
                    <el-input type="password" v-model="ruleForm.rePassword" placeholder="6-12位字母、数字或符号"></el-input>
                </div>
            </el-form-item>
            <el-form-item prop="name">
                <el-checkbox name="type" v-model="ruleForm.name"></el-checkbox>
                <span class="dis_span">我已经阅读并同意遵守</span>
                <span class="green_span" @click="changShow">《药材买卖网用户服务协议》</span>
            </el-form-item>
            <el-form-item>
                <el-button size="large" class="orange_button" type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            </el-form-item>
        </el-form>
        <el-dialog custom-class="protol_wrap" v-model="showPro" size="tiny">
            <div class="title">药材买卖网用户服务协议</div>
            <div class="content">
                <protol></protol>
            </div>
            <div class="footer">
                <div class="btn" @click="selectPro">
                    同意并继续
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import protol from './protol.vue'
export default {
    name: 'register_form',
    data() {
        var validateBox = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请同意用户服务协议'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!(/^(?=.{6,16})(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]*$/.test(value))) {
                callback(new Error('密码为6-16位字母和数字组合'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var checkPhone = (rule, value, callback) => {
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        return {
            showPro: false,
            showLoading: false,
            countShow: false,
            imageCode: '',
            time: 60,
            ruleForm: {
                phone: '',
                identiCode: '',
                messageCode: '',
                password: '',
                rePassword: '',
                name: '',
                fullname: ''
            },
            rules: {
                name: [{
                    validator: validateBox,
                    trigger: 'blur'
                }],
                fullname: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入手机号码',
                    trigger: 'blur'
                }, {
                    validator: checkPhone,
                    trigger: 'blur'
                }],
                identiCode: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }],
                messageCode: [{
                    required: true,
                    message: '请输入短信验证码',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    validator: validatePass,
                    trigger: 'blur'
                }],
                rePassword: [{
                    required: true,
                    message: '请再次输入密码',
                    trigger: 'blur'
                }, {
                    validator: validatePass2,
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        // this.changeCode();
    },
    components: {
        protol
    },
    methods: {
        changShow() {
            this.showPro = true;
        },
        selectPro() {
            this.ruleForm.name = true;
            this.showPro = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _self = this;
                    _self.showLoading = true;
                    let url = common.urlCommon + common.apiUrl.most;
                    let body = {
                        biz_module: 'userSmsService',
                        biz_method: 'registerUser',
                        biz_param: {
                            phone: this.ruleForm.phone,
                            code: this.ruleForm.messageCode,
                            password: this.ruleForm.password,
                            rePassword: this.ruleForm.rePassword,
                            fullname: this.ruleForm.fullname
                        }
                    }
                    common.commonPost(url, body)
                        .then(function(res) {
                            _self.login();
                        })
                        .catch(function(err) {
                            _self.showLoading = false;
                        })
                } else {
                    return false;
                }
            });
        },
        login() {
            let _self = this;
            _self.$store.dispatch('login', {
                body: {
                    biz_param: {
                        phone: _self.ruleForm.phone,
                        password: _self.ruleForm.password
                    }
                },
                path: common.urlCommon + common.apiUrl.login
            }).then((response) => {
                _self.showLoading = false;
                console.log(response);
                _self.$emit('step', 2);
                window.localStorage.KEY = response.biz_result.KEY;
                window.localStorage.SID = response.biz_result.SID;
                common.KEY = window.localStorage.KEY;
                common.SID = window.localStorage.SID;
                _self.setCookie('KEY', common.KEY);
                _self.setCookie('SID', common.SID);
                common.getDate(
                    function() {
                        let url = common.urlCommon + common.apiUrl.most
                        let body = {
                            biz_module: 'userService',
                            biz_method: 'getCmsUserInfo'
                        }
                        url = common.addSID(url);
                        body.version = 1;
                        body.time = Date.parse(new Date()) + parseInt(common.difTime);
                        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                        _self.$store.dispatch('getUserInformation', {
                            body: body,
                            path: url
                        }).then(() => {}, () => {});
                    }
                );
            }, (err) => {
                _self.showLoading = false;
            });
        },
        setCookie(name, value) {
            var Days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        getCode() {
            if (!this.ruleForm.phone) {
                return this.$message({
                    message: '请输入手机号码！',
                    type: 'warning'
                });
            } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.phone))) {
                return this.$message({
                    message: '请输入正确的手机号码！',
                    type: 'warning'
                });
            }
            // if (!this.ruleForm.identiCode) {
            //     return this.$message({
            //         message: '请填写验证码！',
            //         type: 'warning'
            //     });
            // } else if (this.ruleForm.identiCode.toLowerCase() != this.imageCode.toLowerCase()) {
            //     return this.$message({
            //         message: '验证码填写有误！',
            //         type: 'warning'
            //     });
            // }
            let _self = this;
            let sec = 60;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userSmsService',
                biz_method: 'getVervifyCode',
                biz_param: {
                    mobile: this.ruleForm.phone
                }
            }
            _self.countShow = true;
            let time = setInterval(function() {
                sec--;
                _self.time = sec;
                if (sec == 0) {
                    clearInterval(time);
                    sec = 60;
                    _self.countShow = false;
                }
            }, 1000);
            common.commonPost(url, body)
                .then(function(res) {
                    console.log(res);
                })
                .catch(function(err) {
                    clearInterval(time);
                    _self.countShow = false;
                    console.log(err);
                })
        },
        // changeCode() {
        //     let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        //     function generateMixed(n) {
        //         var res = "";
        //         for (var i = 0; i < n; i++) {
        //             var id = Math.ceil(Math.random() * 61);
        //             res += chars[id];
        //         }
        //         return res;
        //     }
        //     this.imageCode = generateMixed(4);
        // }
    }
}
</script>
