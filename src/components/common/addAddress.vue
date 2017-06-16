<style scoped>
.address_mana {
    position: relative;
}

.address_ma .add {
    width: 100%;
    float: left;
    margin-bottom: 48px;
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
    width: 280px;
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
    margin-top: 40px;
    cursor: pointer;
}
</style>
<template>
    <div class='address_ma'>
        <div class="add">
            <div class="add_title">新增的地址</div>
            <div class="add_content">
                <div class="name">
                    <p>收货人姓名：</p>
                    <div class="name_content">
                        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
                    </div>
                </div>
                <div class="name">
                    <p>联系方式：</p>
                    <div class="name_content">
                        <el-input v-model="formData.phone" placeholder="请输入电话"></el-input>
                    </div>
                </div>
                <div class="address">
                    <p>收货地址：</p>
                    <div class="address_content">
                        <el-cascader :options="pcdSelect" v-model="formData.address"></el-cascader>
                    </div>
                </div>
                <div class="address">
                    <p>详细地址：</p>
                    <div class="detailed_content">
                        <el-input type="textarea" :rows="3" placeholder="请输入详细地址" v-model="formData.detailAddr">
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="keep" @click="saveAddress">保存收货地址</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import validation from '../../validation/validation.js'
import {
    addressLinkage,
    getPCD,
    pcdTrans
} from '../../filters/index.js'
let padArr = addressLinkage();
let param = {
    pn: 1,
    pSize: 5
}
export default {
    data() {
            return {
                pcdSelect: padArr,
                edit: false,
                loading: false,
                formData: {
                    name: '',
                    phone: '',
                    address: [],
                    province: '',
                    city: '',
                    district: '',
                    detailAddr: ''
                },
                editObj: {

                },
                httpParam: param,
                address: []
            }
        },
        methods: {
            getHttp() {
                let _self = this;
                _self.loading = true;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'queryUserAddressList',
                    biz_param: _self.httpParam
                };
                if (!common.SID) {
                    common.getSID(req, redirect);
                }
                url = common.addSID(url);
                body.version = 1;
                let localTime = new Date().getTime();
                body.time = localTime + common.difTime;
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getAddressList', {
                    body: body,
                    path: url
                }).then(() => {
                    _self.loading = false
                }, () => {
                    _self.loading = false
                });
            },
            addAddress() {
                let _self = this;
                if (!_self.formData.district) _self.formData.district = ' ';
                if (!_self.formData.city) _self.formData.city = ' ';
                _self.loading = true;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'addUserAddress',
                    biz_param: {
                        contactName: _self.formData.name,
                        contactPhone: _self.formData.phone,
                        province: _self.formData.province,
                        city: _self.formData.city,
                        district: _self.formData.district,
                        detailAddr: _self.formData.detailAddr
                    }
                };
                url = common.addSID(url);
                console.log(url)
                body.version = 1;
                let localTime = new Date().getTime();
                body.time = localTime + common.difTime;
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                common.commonPost(url, body)
                    .then(function(res) {
                        if (res.code == '1c01') {
                            _self.getHttp();
                            _self.$message({
                                type: 'success',
                                message: '已增加地址'
                            });
                            _self.formData.name = '';
                            _self.formData.phone = '';
                            _self.formData.address = [];
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
            saveAddress() {
                let _self = this;
                var checkArr = [];
                var address = '';
                if (_self.formData.address) address = getPCD(_self.formData.address[0], _self.formData.address[1], _self.formData.address[2]); //转换地址
                _self.formData.province = address.split('/')[0]; //省
                _self.formData.city = address.split('/')[1]; //市
                _self.formData.district = address.split('/')[2]; //区
                let checkName = validation.checkNull(_self.formData.name, '请输入姓名！');
                checkArr.push(checkName);
                let checkLookName = validation.checkLook(_self.formData.name);
                checkArr.push(checkLookName);
                let checkPhone = validation.checkPhone(_self.formData.phone);
                checkArr.push(checkPhone);
                let checkAddress = validation.checkNull(address, '请选择地址！');
                checkArr.push(checkAddress);
                let checkdetailAddr = validation.checkNull(_self.formData.detailAddr, '请输入详细信息！');
                checkArr.push(checkdetailAddr);
                let checkLookDes = validation.checkLook(_self.formData.detailAddr);
                checkArr.push(checkLookDes);
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        this.$message({
                            showClose: false,
                            message: checkArr[i]
                        });
                        return;
                    }
                }
                _self.addAddress();
            }

        }
}
</script>
