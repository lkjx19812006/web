<style scoped>
.substance {
    display: flex;
    flex-direction: column;
}

.content {
    background: url('../../static/icon/login.png') no-repeat center !important;
    background-size: 100% 100%;
    flex: 1 0 auto;
    height: 820px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.content .center {
    display: flex;
    flex-direction: row;
}

.content .center .left_image {
    flex: 0 0 auto;
    width: 546px;
    height: 460px;
    /* padding-left: 10%; */
    float: left;
}

.content .center .left_image img {
    width: 100%;
    height: 100%;
}

.content .center .right_form {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 100px;
}

.content .center .right_form .form {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
    max-width: 350px;
    min-width: 350px;
}

.content .center .right_form .title {
    text-align: center;
    color: #FA8435;
    font-size: 20px;
    border-bottom: 1px solid #eee;
    margin: 20px 0;
    height: 60px;
    line-height: 45px;
}

.autos {
    display: flex;
    flex-direction: row;
}

.autos .forget {
    flex: 1;
    text-align: right;
    font-size: 14px;
    padding-right: 30px;
    color: #48576a;
    cursor: pointer;
}

.autos #left {
    text-align: left;
}

.autos .forget:hover {
    color: #FA8435;
}

.submit_button {
    padding-right: 15px;
}

.demo-ruleForm {
    margin: 0 30px;
}
</style>
<template>
    <div class="substance">
        <headerView title="欢迎登录"></headerView>
        <div ref="content" class="content" v-on:keydown="sendSubmit()">
            <div class="center">
                <div class="left_image">
                    <img src="../assets/images/picture.png">
                </div>
                <div class="right_form">
                    <div class="form">
                        <div class="title">用户登录</div>
                        <el-form :model="userInformation" :rules="rules" ref="ruleForm" label-width="20px" class="demo-ruleForm">
                            <el-form-item prop="username">
                                <el-input v-model="userInformation.username" placeholder="请输入手机号">
                                    <img slot="prepend" src="../assets/images/user.png">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input @keyup="sendSubmit" v-model="userInformation.password" placeholder="请输入密码" type="password">
                                    <img slot="prepend" src="../assets/images/password.png">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="autos">
                                    <!-- <div id="left" class="forget" @click="selectAuto">自动登陆</div> -->
                                    <div class="forget" @click="linkToForget">忘记密码？</div>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <div class="submit_button">
                                    <el-button :autofocus="true" type="primary" size="large" class="orange_button" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading" style="width:45%">登录</el-button>
                                    <el-button size="large" @click="resetForm('ruleForm')" style="width:45%">注册</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import httpService from '../common/httpService.js'
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
export default {
    name: 'login_view',
    data() {
        return {
            userInformation: {
                username: '',
                password: ''
            },
            fullscreenLoading: false,
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]

            }
        }
    },
    components: {
        headerView,
        footerView
    },
    created() {
        if (this.$store.state.user.user.phone) {
            this.$router.push('/');
        }
    },
    methods: {
        linkToForget() {
            this.$router.push('/forget');
        },
        sendSubmit() {
            if (window.event.keyCode === 13) {
                //提交表单 直接传表单对象
                this.submitForm('ruleForm');
            }
        },
        selectAuto() {

        },
        submitForm(formName) {
            let _self = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.fullscreenLoading = true;
                    _self.$store.dispatch('login', {
                        body: {
                            biz_param: {
                                phone: _self.userInformation.username,
                                password: _self.userInformation.password
                            }
                        },
                        path: httpService.urlCommon + httpService.apiUrl.login
                    }).then((response) => {
                        window.localStorage.KEY = response.biz_result.KEY;
                        window.localStorage.SID = response.biz_result.SID;
                        httpService.KEY = window.localStorage.KEY;
                        httpService.SID = window.localStorage.SID;
                        _self.setCookie('KEY', httpService.KEY);
                        _self.setCookie('SID', httpService.SID);
                        httpService.getDate(
                            function() {
                                let url = httpService.urlCommon + httpService.apiUrl.most
                                let body = {
                                    biz_module: 'userService',
                                    biz_method: 'queryUserInfo'
                                }
                                url = httpService.addSID(url);
                                body.version = 1;
                                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                                _self.$store.dispatch('getUserInformation', {
                                    body: body,
                                    path: url
                                }).then(() => {}, () => {

                                });
                            }
                        );
                        let srcUrl = _self.$store.state.user.srcUrl
                        if (srcUrl) {
                            _self.getMessageTotals();
                            _self.$router.push(srcUrl);
                        } else {
                            _self.getMessageTotals();
                            _self.$router.push('/');
                        }

                    }, (err) => {
                        _self.fullscreenLoading = false;
                        this.$refs['ruleForm'].resetFields();
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.push('/register');
        },
        clearCookie(name) {
            this.setCookies(name, "", -1);
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        },
        setCookie(name, value) {
            var Days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
        },
        getMessageTotals() {
            let url = httpService.urlCommon + httpService.apiUrl.most
            let body = {
                biz_module: 'pushService',
                biz_method: 'showIsRead'
            }
            url = httpService.addSID(url);
            body.version = 1;
            body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
            body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getMessageTotal', {
                body: body,
                path: url
            }).then(() => {}, () => {})
        }

    }
}
</script>
