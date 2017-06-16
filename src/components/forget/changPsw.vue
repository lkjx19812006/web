<style lang="less" scoped>
.content {
    flex-direction: column;
    align-items: center;
    .title {
        margin: 20px 0;
        color: #3CB371;
        font-weight: bold;
        font-size: 17px;
    }
}
</style>
<template>
    <div class="content" v-loading.body="showLoading">        
        <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="6-12位字母、数字或符号"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="rePassword">
                <el-input type="password" v-model="ruleForm.rePassword" placeholder="6-12位字母、数字或符号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="large" class="orange_button" type="primary" @click="submitForm('ruleForm')">提交新密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    name: 'changPsw_form',
    props: {
        ruleForm: {
            default: null
        }
    },
    data() {
        // var validatePass = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入密码'));
        //     } else if (value.length < 6 || value.length > 12) {
        //         callback(new Error('密码的长度为6-12位'));
        //     } else {
        //         callback();
        //     }
        // };
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
        return {
            showLoading: false,
            rules: {
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
    methods: {
        submitForm(formName) {
            let _self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _self = this;
                    _self.showLoading = true;
                    let url = common.urlCommon + common.apiUrl.most;
                     let body = {
                        biz_module: 'userSmsService',
                        biz_method: 'findUserPassword',
                        version: 1,
                        time: 0,
                        sign: '',
                        biz_param: {
                            code: _self.ruleForm.messageCode,
                            phone: _self.ruleForm.phone,
                            newPassword: _self.ruleForm.password
                        }
                    }
                    url = common.addSID(url);
                    common.commonPost(url, body)
                        .then(function(res) {
                            _self.$emit('step', {step: 3});
                            _self.showLoading = false;
                        })
                        .catch(function(err) {
                            _self.showLoading = false;
                        })
                } else {
                    return false;
                }
            });
        },
        getTimeStamp(str) {
            var date = new Date(str);
            return date.getTime();
        }
    }
}
</script>
