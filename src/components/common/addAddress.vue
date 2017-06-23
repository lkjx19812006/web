<style scoped>
.address_mana {
    position: relative;
}

.address_ma .add {
    width: 100%;
    float: left;
    padding-bottom: 48px;
}

.address_ma .add .add_title {
    float: left;
    width: 100%;
    font-size: 16px;
    line-height: 16px;
    padding-left: 12px;
    margin-bottom: 15px;
    border-left: 2px solid #FA8435;
}

.address_ma .add .add_content {
    float: left;
    width: 100%;
}

.address_ma .add .add_content .name {
    float: left;
    width: 50%;
    margin-top: 25px;
    display: flex;
    flex-direction: row;
}

.address_ma .add .add_content .name>p {
    float: left;
    line-height: 36px;
    font-size: 14px;
    color: #838383;
    padding: 0;
    margin: 0;
    width: 95px;
}

.address_ma .add .add_content .name .name_content {
    float: left;
    flex: 1;
    padding-right: 15px;
    box-sizing: border-box;
}

.address_ma .add .add_content .address {
    float: left;
    width: 100%;
    margin-top: 25px;
}

.address_ma .add .add_content .address>p {
    float: left;
    line-height: 36px;
    font-size: 14px;
    color: #838383;
    padding: 0;
    margin: 0;
    width: 95px;
}

.address_ma .add .add_content .address .address_content {
    width: 50%;
    padding-right: 15px;
    box-sizing: border-box;
    float: left;
}

.address_ma .add .address .detailed_content {
    width: 80%;
    float: left;
}

.address_ma .add .keep {
    float: left;
    margin-left: 95px;
    font-size: 17px;
    color: white;
    background-color: #FFC945;
    box-sizing: border-box;
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    margin-top: 20px;
    margin-bottom: 10px;
    cursor: pointer;
}
</style>
<template>
    <div class='address_ma'>
        <div class="add">
            <div class="add_title">新增的地址</div>
            <div class="add_content">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="120px" class="demo-ruleForm">
                    <div class="name">
                        <el-form-item class="name_content" label="收货人姓名：" prop="contactName">
                            <el-input v-model="formData.contactName" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </div>
                    <div class="name">
                        <el-form-item class="name_content" label="联系方式：" prop="contactPhone">
                            <el-input v-model="formData.contactPhone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </div>
                    <div class="address">
                        <el-form-item class="address_content" label="收货地址：" prop="PCD">
                            <el-cascader style="width: 100%" placeholder="请选择收货地址" :options="citys" v-model="formData.PCD"></el-cascader>
                        </el-form-item>
                    </div>
                    <div class="address">
                        <el-form-item class="detailed_content" label="详细地址：" prop="detailAddr">
                            <el-input type="textarea" :rows="3" placeholder="请输入详细地址" v-model="formData.detailAddr">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="keep" @click="saveAddress('formData')">保存收货地址</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'

let param = {
    pn: 1,
    pSize: 5
}
export default {
    data() {
            function validateAddress(rule, value, callback) {
                if (!value.length) {
                    return callback(new Error('请选择交货地'));
                } else {
                    callback();
                }
            }
            return {
                edit: false,
                loading: false,
                formData: {
                    contactName: '',
                    contactPhone: '',
                    address: '',
                    PCD: [],
                    province: '',
                    city: '',
                    district: '',
                    detailAddr: ''
                },
                // httpParam: param,
                rules: {
                    detailAddr: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }],
                    PCD: [{
                        required: true,
                        validator: validateAddress,
                        trigger: 'blur'
                    }],
                    contactName: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    contactPhone: [{
                        required: true,
                        pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                        message: '请输入合法的手机号',
                        trigger: 'blur'
                    }],
                },
            }
        },
        computed: {
            citys() {
                return this.$store.state.search.cityList;
            },
        },
        mounted() {
            if (this.$store.state.search.cityList.length === 0) {
                this.getCity();
            }
        },
        methods: {
            // getHttp() {
            //     let _self = this;
            //     _self.loading = true;
            //     let url = common.urlCommon + common.apiUrl.most;
            //     let body = {
            //         biz_module: 'userAddressService',
            //         biz_method: 'queryUserAddressList',
            //         biz_param: _self.httpParam
            //     };
            //     if (!common.SID) {
            //         common.getSID(req, redirect);
            //     }
            //     url = common.addSID(url);
            //     body.version = 1;
            //     let localTime = new Date().getTime();
            //     body.time = localTime + common.difTime;
            //     body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            //     this.$store.dispatch('getAddressList', {
            //         body: body,
            //         path: url
            //     }).then(() => {
            //         _self.loading = false
            //     }, () => {
            //         _self.loading = false
            //     });
            // },
            addAddress() {
                let _self = this;
                _self.loading = true;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'addUserAddress',
                    biz_param: {
                        contactName: _self.formData.contactName,
                        contactPhone: _self.formData.contactPhone,
                        province: _self.formData.province,
                        city: _self.formData.city,
                        district: _self.formData.district,
                        detailAddr: _self.formData.detailAddr,
                        address: _self.formData.address
                    }
                };
                url = common.addSID(url);
                body.version = 1;
                let localTime = new Date().getTime();
                body.time = localTime + common.difTime;
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                common.commonPost(url, body)
                    .then(function(res) {
                        if (res.code == '1c01') {
                            // _self.getHttp();
                            _self.$message({
                                type: 'success',
                                message: '已增加地址'
                            });
                            _self.formData.contactName = '';
                            _self.formData.contactPhone = '';
                            _self.formData.address = '';
                            _self.formData.PCD = [];
                            _self.formData.province = '';
                            _self.formData.city = '';
                            _self.formData.district = '';
                            _self.formData.detailAddr = '';
                            _self.$emit('getAddress');
                        }
                        _self.loading = false;
                    })
                    .catch(function(err) {
                        _self.loading = false;
                    })
            },
            saveAddress(formName) {
                let _self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _self.$confirm('确定新增收货地址吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'info'
                        }).then(() => {
                            _self.getAddress();
                            _self.addAddress();
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });

                    } else {
                        return false;
                    }
                });
            },
            getAddress() {
                // this.formData.address;
                //处理地址 地址Id 文本型的地址
                var address = [];
                var pp = [];
                var cc = [];
                let _self = this;
                this.formData.PCD.forEach(function(PCDid, index) {
                    switch (index) {
                        case 0:
                            //确定省级ID对应的name名称
                            _self.citys.forEach(function(p, i) {
                                if (PCDid === p.id) {
                                    address.push(p.cname);
                                    pp = p.childList;
                                    _self.formData.province = PCDid;
                                    _self.formData.city = '';
                                    _self.formData.district = '';
                                }
                            })
                            break;
                        case 1:
                            pp.forEach(function(c, i) {
                                if (PCDid === c.id) {
                                    address.push(c.cname);
                                    cc = c.childList;
                                    _self.formData.city = PCDid;
                                    _self.formData.district = '';
                                }
                            })
                            break;
                        case 2:
                            cc.forEach(function(d, i) {
                                if (PCDid === d.id) {
                                    address.push(d.cname);
                                    _self.formData.district = PCDid;
                                }
                            })
                            break;
                    }
                })
                this.formData.address = address.join('') + this.formData.detailAddr;
            },
            getCity() {
                function sortArr(item, type) {
                    item.label = item.cname;
                    item.value = item.id;
                    if (item.childList.length > 0) item.children = item.childList;
                    if (item.childList.length > 0) item.children.forEach(function(childItem) {
                        sortArr(childItem);
                    })
                }
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'locationService',
                    biz_method: 'queryLocationList',
                    biz_param: {}
                }).then(function(suc) {
                    suc.biz_result.list.forEach(function(item) {
                        sortArr(item);
                    });
                    console.log(suc.biz_result.list)
                    _self.$store.dispatch('sch_getCityList', suc.biz_result.list);
                }).catch(function(err) {
                    _self.$store.dispatch('sch_getCityList', []);
                })
            },

        }
}
</script>
