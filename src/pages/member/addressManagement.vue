<style scoped>
.address_mana {
    position: relative;
}

.address_mana .add {
    width: 100%;
    float: left;
    margin-bottom: 48px;
}

.address_mana .add .add_title {
    float: left;
    width: 100%;
    font-size: 16px;
    line-height: 16px;
    padding-left: 12px;
    margin-bottom: 15px;
    border-left: 2px solid #FA8435;
}

.address_mana .add .add_content {
    float: left;
    width: 100%;
}

.address_mana .add .add_content .name {
    float: left;
    width: 45%;
    margin-top: 25px;
}

.address_mana .add .add_content .name>p {
    float: left;
    line-height: 36px;
    font-size: 14px;
    color: #838383;
    padding: 0;
    margin: 0;
    width: 95px;
}

.address_mana .add .add_content .name .name_content {
    float: left;
    width: 280px;
}

.address_mana .add .add_content .address {
    float: left;
    width: 100%;
    margin-top: 25px;
}

.address_mana .add .add_content .address>p {
    float: left;
    line-height: 36px;
    font-size: 14px;
    color: #838383;
    padding: 0;
    margin: 0;
    width: 95px;
}

.address_mana .add .add_content .address .address_content {
    width: 280px;
    float: left;
}

.address_mana .add .address .detailed_content {
    width: 700px;
    float: left;
}

.address_mana .add .keep {
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

.address_mana .add .block {
    float: right;
    margin-top: 15px;
}
</style>
<template>
    <div class="address_mana">
        <titleHead :param="myhead"></titleHead>
        <addAddress v-on:getAddress="getAddress"></addAddress>
        <div class="add">
            <div class="add_title">已保存的地址</div>
            <div>
                <el-table :data="addressList" border style="width: 100%">
                    <el-table-column label="是否默认">
                        <template scope="scope">
                            <!-- <span>{{ scope.row.type | addressType}}</span> -->
                            <div class="select" @click="selectDefault(scope.row.id)">
                                <el-radio class="radio" v-model="scope.row.type" :label="1" :disabled="showIt">默认</el-radio>
                            </div>
                            <!-- <div class="select">
                                <el-radio class="radio" v-model="scope.row.type" :label="0" :disabled="show">不默认</el-radio>
                            </div> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名">
                        <template scope="scope">
                            <span>{{ scope.row.contactName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系方式">
                        <template scope="scope">
                            <span>{{ scope.row.contactPhone }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="地址" width="230">
                        <template scope="scope">
                            <span>{{ scope.row.address }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <!-- totalNum -->
                    <el-pagination layout="prev, pager, next" :total="totalNum" :page-size="5" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog v-model="edit" size="tiny">
            <reviseAddress v-if="edit" :formData='params' v-on:getHttp='getHttp'></reviseAddress>
        </el-dialog>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import addAddress from '../../components/common/addAddress'
import reviseAddress from '../../components/common/reviseAddress'
import titleHead from '../../components/common/headTitle'
import validation from '../../validation/validation.js'
export default {
    name: 'address-list-view',
    data() {
        return {
            httpParam: {
                pn: 1,
                pSize: 5
            },
            myhead: {
                name: '地址管理'
            },
            edit: false,
            loading: false,
            params: {
                contactName: '',
                contactPhone: '',
                address: '',
                PCD: [],
                province: '',
                city: '',
                district: '',
                detailAddr: ''
            }

        }
    },
    components: {
        titleHead,
        addAddress,
        reviseAddress
    },
    computed: {
        addressList() {
            return this.$store.state.address.addressList;
        },
        totalNum() {
            return Number(this.$store.state.address.addressTotal);
        },
        showIt() {
            return this.$store.state.address.show;
        }
    },
    mounted() {
        this.getHttp();
    },
    methods: {
        handleCurrentChange(val) {
            console.log(val)
            this.httpParam.pn = val;
            this.getHttp();
        },
        getAddress() {
            this.httpParam.pn = 1;
            this.getHttp();
        },
        getHttp() {
            let _self = this;
            _self.edit = false;
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
        handleEdit(index, row) {
            this.edit = true;
            //构建三级联动数据
            this.params = row;
            this.params.PCD = [];
            if (row.provinceId) this.params.PCD.push(row.provinceId);
            if (row.cityId) this.params.PCD.push(row.cityId);
            if (row.districtId) this.params.PCD.push(row.districtId);
        },
        handleDelete(index, row) {
            this.$confirm('确定删除此地址?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.deleteAddress(row.id);
            }).catch(() => {
                _self.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        deleteAddress(id) {
            let _self = this;
            _self.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userAddressService',
                biz_method: 'deleteUserAddress',
                biz_param: {
                    id: id
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
                            message: '已删除地址'
                        });
                    }
                    _self.loading = false;
                })
                .catch(function(err) {
                    _self.loading = false;
                })
        },
        selectDefault(id) {
            let _self = this;
            _self.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userAddressService',
                biz_method: 'setDefaultAddress',
                biz_param: {
                    id: id
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
                            message: '已设置默认地址'
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
