<style lang="less" scoped>
.presellConfirm {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100vh;
    .presellConfirm_content {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1 0 auto;
        .intention_detail {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 1200px;
            .need_title {
                width: 100%;
                font-size: 20px;
                color: #666;
                border-bottom: 1px solid #eee;
                padding: 20px 0;
                margin-bottom: 20px;
                .title_bottom_span {
                    border-bottom: 2px solid #FA8435;
                    padding-bottom: 20px;
                }
            }
            .detail,
            .address,
            .goodsInformation {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                .address_title {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 16px;
                    color: #666;
                    width: 100%;
                    margin-bottom: 20px;
                    .border_padding {
                        border: 2px solid #666;
                        padding: 2px;
                        margin-right: 5px;
                        border-radius: 50%;
                    }
                }
                .submit_area {
                    border-top: 1px solid #eee;
                    width: 100%;
                    margin: 20px 0;
                    padding: 20px 0;
                    text-align: right;
                }
                .address_item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-size: 14px;
                    color: #666;
                    width: 100%;
                    flex-wrap: wrap;
                    .address_content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-width: 300px;
                        margin: 0 20px 20px 0;
                        border: 1px solid #eee;
                        padding: 20px;
                        position: relative;
                        cursor: pointer;
                        .name {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            i {
                                font-size: 16px;
                                margin-left: 5px;
                                color: #FA8435;
                                cursor: pointer;
                            }
                        }
                        .address_detail {
                            padding-top: 20px;
                            text-align: left;
                            width: 100%;
                            .triangle {
                                width: 0;
                                height: 0;
                                border-left: 35px solid transparent;
                                border-bottom: 35px solid #FA8435;
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                i {
                                    color: #fff;
                                    margin: 19px 0 0 -18px;
                                    font-size: 10px;
                                }
                            }
                        }
                    }
                    .addressActiveClass {
                        border: 1px solid #FA8435;
                    }
                    .address_content:hover {
                        border: 1px solid #FA8435;
                    }
                    .table {
                        .goods {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin-top: 20px;
                            .goods_image {
                                overflow: hidden;
                                width: 80px;
                                height: 80px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img {
                                    max-width: 100%;
                                }
                            }
                            .goods_information {
                                flex: 1 1 auto;
                                text-align: left;
                                margin-left: 20px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                height: 80px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="presellConfirm" :v-loading.body="findLoading">
        <headerView tab="4"></headerView>
        <div class="presellConfirm_content">
            <div class="intention_detail">
                <div class="need_title"><span class="title_bottom_span">确认订单信息</span></div>
                <div class="detail">
                    <div class="address">
                        <div class="address_title">
                            <span>收货地址</span>
                            <span class="pointer" @click="addStatus = true"><i class="border_padding el-icon-plus"></i>新增收货地址</span>
                        </div>
                        <div class="address_item">
                            <div :class="['address_content',item.selectShow ? 'addressActiveClass' : '']" v-for="item in addressList" v-on:mouseenter="show(item)" v-on:mouseleave="hide(item)" @click="select(item)">
                                <div class="name">
                                    <div><span>{{item.contactName}}</span><span class="left_dis">{{item.contactPhone}}</span> </div>
                                    <div v-show="item.operateShow"><i class="el-icon-edit" v-on:click.stop="edit(item)"></i><i class="el-icon-delete" v-on:click.stop="del(item)"></i></div>
                                </div>
                                <div class="address_detail">
                                    {{item.address}}
                                    <div class="triangle" v-show="item.selectShow">
                                        <i class="el-icon-check"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="goodsInformation">
                        <div class="address_title">
                            <span>商品信息</span>
                        </div>
                        <div class="address_item need_table">
                            <div class="table">
                                <el-table :data="cart" style="width: 100%;border:none;text-align:center">
                                    <el-table-column label="商品" width="400">
                                        <template scope="scope">
                                            <div class="goods">
                                                <div class="goods_image">
                                                    <img :src="scope.row.image[0]">
                                                </div>
                                                <div class="goods_information">
                                                    <div>{{scope.row.breedName}}</div>
                                                    <div><span>规格:{{scope.row.spec}}</span><span class="left_dis">产地:{{scope.row.location}}</span></div>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="价格" width="200">
                                        <template scope="scope">
                                            <span>{{scope.row.price+'元/'+scope.row.unit}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="preBuyNumber" label="数量" width="200">
                                        <template scope="scope">
                                            <span>{{scope.row.preBuyNumber + scope.row.unit}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="合计金额(元)" width="200">
                                        <template scope="scope">
                                            <span>￥{{scope.row.price, scope.row.preBuyNumber | filterPrice}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="预付定金(元)" width="200">
                                        <template scope="scope">
                                            <span style="color: red">￥{{scope.row.price, scope.row.preBuyNumber | filterPrePrice}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="submit_area">
                            <el-button size="large" @click="submit()" type="primary" class="orange_button">业务员联系我</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footerView></footerView>
        <el-dialog v-model="addStatus" size="small">
            <addAddress v-on:getAddress="getAddress"></addAddress>
        </el-dialog>
        <el-dialog v-model="reviseStatus" size="small">
            <reviseAddress v-on:getHttp="getAddress" :params="addressParam"></reviseAddress>
        </el-dialog>      
        <el-dialog v-on:close="closeMsg" class="my_msg" v-model="dialogMsg">
            <msg title="信息发送成功，请耐心等待" phone="021-55502736"></msg>
        </el-dialog>
    </div>
</template>
<script>
import common from '../common/httpService.js'
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
import addAddress from '../components/common/addAddress.vue'
import reviseAddress from '../components/common/reviseAddress.vue'
import msg from '../components/msg.vue'
import {
    pcdTrans
} from '../filters/index.js'
export default {
    data() {
            return {
                dialogMsg: false,
                cart: [],
                findLoading: false,
                number: 0,
                intentionId: '',
                addressId: '',
                addStatus: false,
                delAddressStatus: false,
                delAddressId: 0,
                reviseStatus: false,
                addressParam: {
                    editObj: {},
                    address: []
                },
                addressList: []

            }
        },
        components: {
            headerView,
            footerView,
            addAddress,
            reviseAddress,
            msg
        },
        computed: {},
        methods: {
            closeMsg() {
                this.$router.push('/member/preSaleOrder');
            },
            delAddress() {
                let _self = this;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'deleteUserAddress',
                    biz_param: {
                        id: _self.delAddressId
                    }
                };
                if (common.KEY) {
                    url = common.addSID(url);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                common.commonPost(url, body).then(function(suc) {
                    _self.$message({
                        showClose: true,
                        message: suc.msg,
                        type: 'info'
                    });
                    window.localStorage.cart = '';
                    _self.findLoading = false;
                    _self.getAddress();
                    _self.delAddressStatus = false;
                }).catch(function(err) {
                    _self.findLoading = false;
                })
            },
            edit(item) {
                console.log(1, item)
                let arr = [];
                arr.push(item.province);
                arr.push(item.city);
                arr.push(item.district);
                this.addressParam.editObj = item;
                this.addressParam.address = pcdTrans(arr);
                this.reviseStatus = true;
            },
            del(item) {
                this.delAddressId = item.id;
                this.delAddressStatus = true;
                this.$confirm('确定删除该条地址吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.delAddress();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            getAddress() {
                let _self = this;
                this.addStatus = false;
                this.reviseStatus = false;
                let url = common.urlCommon + common.apiUrl.most
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'queryUserAddressList'
                }
                url = common.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                common.commonPost(url, body).then((res) => {
                    res.biz_result.list.forEach(item => {
                        item.operateShow = false;
                        item.selectShow = false;
                        if (item.type === 1) {
                            item.selectShow = true;
                            _self.addressId = item.id;
                        }
                    })
                    _self.addressList = res.biz_result.list;
                })
            },
            submit() {
                if (!this.addressId) {
                    return this.$message({
                        showClose: true,
                        message: '请先选择收货地址！',
                        type: 'error'
                    });
                }
                let goods = [];
                let obj = {
                    number: this.number,
                    intentionId: this.intentionId
                }
                goods.push(obj);
                this.findLoading = true;
                let _self = this;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'submitPreOrder',
                    biz_param: {
                        sourceId: _self.intentionId,
                        number: _self.number,
                        addressId: _self.addressId
                    }
                };
                if (common.KEY) {
                    url = common.addSID(url);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                this.$confirm('确定提交信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    common.commonPost(url, body).then(function(suc) {
                        // _self.$message({
                        //     showClose: true,
                        //     message: suc.msg,
                        //     type: 'success'
                        // });
                        window.localStorage.preCart = '';
                        _self.findLoading = false;
                        _self.dialogMsg = true;
                    }).catch(function(err) {
                        _self.findLoading = false;
                    })
                }).catch(() => {});
            },
            show(item) {
                item.operateShow = true;
            },
            hide(item) {
                item.operateShow = false;
            },
            select(item) {
                this.addressList.forEach(item => {
                    item.selectShow = false;
                })
                item.selectShow = true;
                this.addressId = item.id;
            }
        },
        mounted() {
            if (window.localStorage.preCart) this.cart.push(JSON.parse(window.localStorage.preCart));
            else {
                return this.$router.push("/presell");
            }
            console.log(1,this.cart);
            if (!this.cart[0].preBuyNumber) {
                return this.$router.push("/presell");
            }
            this.number = this.cart[0].preBuyNumber;
            this.intentionId = this.cart[0].id;
            this.getAddress();
        }
}
</script>
