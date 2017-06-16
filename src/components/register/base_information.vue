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
        <div class="title">尊敬的用户，您已注册成为药材买卖网的用户，请填写以下信息，让我们为您提供更好的服务！</div>
        <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="fullname">
                <el-input v-model="ruleForm.fullname" placeholder="请输入您的真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="您的生日">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="ruleForm.gender" placeholder="请选择">
                    <el-option v-for="(item, index) in options" :label="item.label" :key="index" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司名称" prop="company">
                <el-input v-model="ruleForm.company" placeholder="请输入公司全称"></el-input>
            </el-form-item>
            <el-form-item label="您的职位" prop="companyJob">
                <el-input v-model="ruleForm.companyJob" placeholder="请输入您的职位"></el-input>
            </el-form-item>
            <el-form-item label="主营品种" prop="bizMain">
                <el-select class="my_tag" v-model="ruleForm.bizMain" multiple filterable remote placeholder="请输入主营品种" :remote-method="querySearchAsync" :loading="loading">
                    <el-option v-for="item in optionsList" :key="item.breedName" :label="item.breedName" :value="item.breedName">
                    </el-option>
                </el-select>
                <!--  <el-input v-model="ruleForm.bizMain" placeholder="请输入主营品种"></el-input> -->
            </el-form-item>
            <el-form-item>
                <el-button size="large" class="orange_button" type="primary" @click="submitForm('ruleForm')">完成</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    name: 'information_form',
    data() {
        var validateBizMain = (rule, value, callback) => {
            if (value.length <= 0) {
                callback(new Error('请填写主营品种，可多选'));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            timeout: '',
            optionsList: [],
            showLoading: false,
            options: [{
                label: '男',
                value: '男'
            }, {
                label: '女',
                value: '女'
            }],
            ruleForm: {
                fullname: '',
                birthday: '',
                gender: '男',
                company: '',
                companyJob: '',
                bizMain: []
            },
            rules: {
                fullname: [{
                    required: true,
                    message: '请输入您的真实名称',
                    trigger: 'blur'
                }],
                bizMain: [{
                    required: true,
                    validator: validateBizMain,
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        submitForm(formName) {
            let bizMain = this.ruleForm.bizMain.join(',');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _self = this;
                    _self.showLoading = true;
                    let birthday = '';
                    if (_self.ruleForm.birthday) {
                        birthday = _self.getTimeStamp(_self.ruleForm.birthday) / 1000;
                    }
                    let url = common.urlCommon + common.apiUrl.most;
                    common.getSID();
                    let body = {
                        biz_module: 'userService',
                        biz_method: 'updateUserInfo',
                        version: 1,
                        time: 0,
                        sign: '',
                        biz_param: {
                            fullname: _self.ruleForm.fullname,
                            birthday: birthday,
                            company: _self.ruleForm.company,
                            bizMain: bizMain,
                            gender: _self.ruleForm.gender,
                            companyJob: _self.ruleForm.companyJob
                        }
                    }
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);

                    url = common.addSID(url);
                    common.commonPost(url, body)
                        .then(function(res) {
                            _self.$emit('step', 3);
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
        },
        querySearchAsync(queryString) {
            if (queryString !== '') {
                this.loading = true;
                let _self = this;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    common.commonPost(common.urlCommon + common.apiUrl.most, {
                        biz_module: 'searchKeywordService',
                        biz_method: 'querySearchKeywordBreed',
                        biz_param: {
                            keyWord: queryString,
                            pn: 1,
                            pSize: 20
                        }
                    }).then(function(suc) {
                        _self.loading = false;
                        _self.optionsList = suc.biz_result.list;
                    }, () => {
                        _self.loading = false;
                    });
                }, 300);
            } else {
                this.optionsList = [];
            }

        },
    }
}
</script>
