<style lang="less" scoped>
.orange_button {
    background-color: #FA8435;
    border: none;
}

.content {
    flex: 0 0 auto !important;
    .dis_span {
        margin-left: 15px;
        font-size: 14px;
        color: #48576a;
    }
    .green_span {
        font-size: 14px;
        color: #3CB371;
        cursor: pointer;
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
}
</style>
<template>
    <div class="content" v-loading.body="showLoading">
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入11位手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="identiCode">
                <el-input v-model="ruleForm.identiCode" placeholder="请输入验证码" style="width:200px"></el-input>
                <span class="center_span">{{imageCode}}</span>
                <span class="orange_span" @click="changeCode()">看不清楚,换一张</span>
            </el-form-item>
            <el-form-item label="短信验证码" prop="messageCode">
                <div style="border:1px solid #bfcbd9;border-radius: 3px;">
                    <input v-model="ruleForm.messageCode" placeholder="请输入短信验证码" style="border:none;width:300px;text-indent: 10px;height:35px;" />
                    <span v-show="!countShow" class="orange_span" style="border-left:1px solid #ddd;padding-left:15px" @click="getCode()">获取验证码</span>
                    <span v-show="countShow" style="border-left:1px solid #ddd;padding-left:15px;color: #48576a">{{time}}秒后重试</span>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button size="large" class="orange_button" type="primary" @click="submitForm('ruleForm')">找回密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    name: 'register_form',
    props: {
      ruleForm: {default: null}
    },
    data() {
        var checkPhone = (rule, value, callback) => {
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        return {
            showLoading: false,
            countShow: false,
            imageCode: '',
            time: 60,           
            rules: {
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
                }]
            }
        }
    },
    mounted() {
        this.changeCode();
    },
    methods: {
        submitForm(formName) {
            let _self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.$emit('step', {step: 2, ruleForm: this.ruleForm});
                } else {
                    return false;
                }
            });
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
            if (!this.ruleForm.identiCode) {
                return this.$message({
                    message: '请填写验证码！',
                    type: 'warning'
                });
            } else if (this.ruleForm.identiCode.toLowerCase() != this.imageCode.toLowerCase()) {
                return this.$message({
                    message: '验证码填写有误！',
                    type: 'warning'
                });
            }
            let _self = this;
            let sec = 60;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userSmsService',
                biz_method: 'getRePwdCode',
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
        changeCode() {
            let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

            function generateMixed(n) {
                var res = "";
                for (var i = 0; i < n; i++) {
                    var id = Math.ceil(Math.random() * 61);
                    res += chars[id];
                }
                return res;
            }
            this.imageCode = generateMixed(4);
        }
    }
}
</script>
