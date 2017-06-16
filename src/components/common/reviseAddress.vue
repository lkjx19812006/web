<style scoped>
.address_revise {
    width: 100%;
    float: left;
    position: relative;
}

.address_revise .add {
    width: 100%;
    float: left;
    margin-bottom: 48px;
}

.address_revise .add .add_title {
    float: left;
    width: 100%;
    font-size: 16px;
    line-height: 16px;
    padding-left: 12px;
    margin-bottom: 15px;
    border-left: 2px solid #FA8435;
}

.address_revise .add .add_content {
    float: left;
    width: 100%;
}

.address_revise .add .add_content .name {
    float: left;
    width: 45%;
    margin-top: 25px;
}

.address_revise .add .add_content .name>p {
    float: left;
    line-height: 36px;
    font-size: 14px;
    color: #838383;
    padding: 0;
    margin: 0;
    width: 95px;
}

.address_revise .add .add_content .name .name_content {
    float: left;
    width: 280px;
}

.address_revise .add .add_content .address {
    float: left;
    width: 100%;
    margin-top: 25px;
}

.address_revise .add .add_content .address>p {
    float: left;
    line-height: 36px;
    font-size: 14px;
    color: #838383;
    padding: 0;
    margin: 0;
    width: 95px;
}

.address_revise .add .add_content .address .address_content {
    width: 280px;
    float: left;
}

.address_revise .add .address .detailed_content {
    width: 700px;
    float: left;
}

.address_revise .add .keep {
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

.address_revise .add .block {
    float: right;
    margin-top: 15px;
}
</style>
<template>
    <div class="address_revise">
        <div class="add">
            <div class="add_title">编辑地址</div>
            <div class="add_content">
                <div class="address">
                    <p>收货人姓名：</p>
                    <div class="address_content">
                        <el-input v-model="params.editObj.contactName" placeholder="请输入姓名"></el-input>
                    </div>
                </div>
                <div class="address">
                    <p>联系方式：</p>
                    <div class="address_content">
                        <el-input v-model="params.editObj.contactPhone" placeholder="请输入电话"></el-input>
                    </div>
                </div>
                <div class="address">
                    <p>收货地址：</p>
                    <div class="address_content">
                        <el-cascader :options="pcdSelect" v-model="params.address"></el-cascader>
                    </div>
                </div>
                <div class="address">
                    <p>详细地址：</p>
                    <div class="address_content">
                        <el-input type="textarea" :rows="5" placeholder="请输入详细地址" v-model="params.editObj.detailAddr">
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="keep" @click="saveRevise">保存收货地址</div>
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
export default {
    data() {
            return {
                pcdSelect: padArr,
                edit: false,
                loading: false,
            }
        },
        props: {
            params: {

            }
        },
        computed: {
            addressList() {
                return this.$store.state.address.addressList;
            },
            totalNum() {
                return this.$store.state.address.addressTotal;
            },
            showIt() {
                return this.$store.state.address.show;
            }
        },
        methods: {
            saveRevise() {
                let _self = this;
                var checkArr = [];
                var address = '';
                if (_self.params.address) address = getPCD(_self.params.address[0], _self.params.address[1], _self.params.address[2]); //转换地址
                console.log(_self.params.address)
                _self.params.editObj.province = address.split('/')[0]; //省
                _self.params.editObj.city = address.split('/')[1]; //市
                _self.params.editObj.district = address.split('/')[2]; //区
                let checkName = validation.checkNull(_self.params.editObj.contactName, '请输入姓名！');
                checkArr.push(checkName);
                let checkLookName = validation.checkLook(_self.params.editObj.contactName);
                checkArr.push(checkLookName);
                let checkPhone = validation.checkPhone(_self.params.editObj.contactPhone);
                checkArr.push(checkPhone);
                let checkAddress = validation.checkNull(address, '请选择地址！');
                checkArr.push(checkAddress);
                let checkdetailAddr = validation.checkNull(_self.params.editObj.detailAddr, '请输入详细信息！');
                checkArr.push(checkdetailAddr);
                let checkLookDes = validation.checkLook(_self.params.editObj.detailAddr);
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
                _self.reviseAddress();
            },
            reviseAddress() {
                let _self = this;
                _self.edit = false;
                if (!_self.params.editObj.district) _self.params.editObj.district = ' ';
                if (!_self.params.editObj.city) _self.params.editObj.city = ' ';
                _self.loading = true;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'updateUserAddressInfo',
                    biz_param: {
                        contactName: _self.params.editObj.contactName,
                        contactPhone: _self.params.editObj.contactPhone,
                        province: _self.params.editObj.province,
                        city: _self.params.editObj.city,
                        district: _self.params.editObj.district,
                        detailAddr: _self.params.editObj.detailAddr,
                        id: _self.params.editObj.id,
                        address: _self.params.editObj.province + _self.params.editObj.city + _self.params.editObj.district + _self.params.editObj.detailAddr
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
                            _self.$emit('getHttp', 1);
                            _self.edit = false;
                            _self.$message({
                                type: 'success',
                                message: '已修改地址'
                            });
                        }
                        _self.loading = false;
                    })
                    .catch(function(err) {
                        _self.loading = false;
                    })
            }
        }
}
</script>
