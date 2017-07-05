<style scoped>
.sale_order {
    position: relative;
}

.sale_order .title {
    font-size: 20px;
    color: #333333;
    height: 45px;
    border-bottom: 1px solid #000;
    margin-bottom: 15px;
}

.sale_order .block {
    float: right;
    margin-top: 20px;
}

.sale_order .status {
    height: 50px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    border-radius: 2px;
    margin-top: 30px;
}

.sale_order .status>div {
    float: left;
    flex: 1;
    box-sizing: border-box;
    cursor: pointer;
    border-top: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
    text-align: center;
    line-height: 50px;
    border-radius: 2px;
    background-color: #FBFAF6;
}

.sale_order .seelogis {
    cursor: pointer;
    color: #FA6705;
}

.sale_order .status .color {
    color: #FA6705;
    background-color: #fff;
}

.sale_order .arr {
    position: relative;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
}

.sale_order .arr .image {
    width: 100px;
    height: 70px;
    display: inline-block;
}

.sale_order .arr>div {
    display: inline-block;
    font-size: 14px;
}

.sale_order .arr .name {
    position: absolute;
    top: 0px;
    left: 120px;
}

.sale_order .arr .spec {
    position: absolute;
    bottom: 3px;
    left: 120px;
}

.sale_order .arr .location {
    position: absolute;
    bottom: 23px;
    left: 120px;
}

.sale_order .arr .number {
    position: absolute;
    bottom: 3px;
    left: 340px;
}

.sale_order .arr .price {
    position: absolute;
    bottom: 3px;
    left: 580px;
}

.sale_order .logis {
    position: absolute;
    margin-left: -200px;
    left: 50%;
    top: 5%;
    z-index: 20;
}

.sale_order .shade {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    top: 0;
    z-index: 15;
}

.sale_order .el-table th {
    background-color: red;
}
</style>
<template>
    <div class="sale_order">
        <titleHead :param="myhead"></titleHead>
        <div class="status">
            <div v-for="(item,index) in supplyStatus" v-bind:class="{color:item.show}" @click="checkStatus(item.back_id,index)">{{item.name}}</div>
        </div>
        <el-table :data="orderList" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <div v-for="item in orderList[props.$index].goodsArray" class="arr">
                        <img :src="item.image" class="image" @click="bigImgs(item.image)">
                        <div class="name">{{item.goodsName}}</div>
                        <div class="number">购买数量:{{item.number}}</div>
                        <div class="spec">规格:{{item.spec}}</div>
                        <div class="location">产地:{{item.location}}</div>
                        <div class="price">价格:{{item.price}}元/{{item.unit}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="订单号" prop="no">
            </el-table-column>
            <el-table-column label="订单时间" prop="ctime" width="150">
            </el-table-column>
            <el-table-column label="订单状态" width="120">
                <template scope="scope">
                    <span>{{orderList[scope.$index].orderStatus | purchaseStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单总价" prop="total">
                <template scope="scope">
                    <span v-if="orderList[scope.$index].orderStatus == 0 || orderList[scope.$index].orderStatus == 10">{{orderList[scope.$index].amount}}元(运杂费待确认)</span>
                    <span v-if="orderList[scope.$index].orderStatus !==10 && orderList[scope.$index].orderStatus !==0">{{orderList[scope.$index].total}}元(含运杂费)</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!-- <div class="seelogis" v-if="'cancel' ==judgeOrderStatus(orderList[scope.$index].orderStatus) " @click="cancelOrder(orderList[scope.$index].id,orderList[scope.$index].no)">取消订单</div> -->
                    <div class="seelogis" v-if="'send' ==judgeOrderStatus(orderList[scope.$index].orderStatus)&&httpParam.type==0" @click="ConfirmReceipt(orderList[scope.$index].id,orderList[scope.$index].no)">确认收货</div>
                    <div class="seelogis" v-if="'send' ==judgeOrderStatus(orderList[scope.$index].orderStatus)" @click="seeLogistics(orderList[scope.$index].id)">查看物流</div>
                    <div class="seelogis" v-if="'waitsend' ==judgeOrderStatus(orderList[scope.$index].orderStatus)&&httpParam.type==0" @click="urge()">催促发货</div>
                    <div class="seelogis" v-if="'pay' ==judgeOrderStatus(orderList[scope.$index].orderStatus)&&httpParam.type==0" @click="payMoney()">立即支付</div>
                    <div class="seelogis" v-if="'collectmoney' ==judgeOrderStatus(orderList[scope.$index].orderStatus)&&httpParam.type==1" @click.stop="collectMoney(orderList[scope.$index].id,orderList[scope.$index].no)">确认收款</div>
                    <!-- <div @click="seeLogistics(orderList[scope.$index].id)">sass</div> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="totalNum" :page-size="10" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog v-model="edit" size="tiny" title="物流信息">
            <logistics :param="logistics"></logistics>
        </el-dialog>
        <popUps :popParam="popParam"></popUps>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import logistics from '../../components/common/logistics.vue'
import titleHead from '../../components/common/headTitle'
import popUps from '../../components/common/popUp'
export default {
    name: 'orderlist-view',
    data() {
        return {
            status: '',
            logistics: {
                arr: [],
                show: false
            },
            popParam: {
                pops_show: false,
                bigImg: false,
                bigUrl: ''
            },
            httpParam: {
                orderStatus: 0,
                type: 0,
                pn: 1,
                pSize: 10
            },
            supplyStatus: [{
                name: '全部订单',
                back_id: 0,
                show: true
            }, {
                name: '待审核',
                back_id: 10,
                show: false
            }, {
                name: '待付款',
                back_id: 20,
                show: false
            }, {
                name: '待卖家发货',
                back_id: 40,
                show: false
            }, {
                name: '待收货',
                back_id: 50,
                show: false
            }, {
                name: '已完成',
                back_id: 60,
                show: false
            }, {
                name: '已取消',
                back_id: -1,
                show: false
            }],
            myhead: {
                name: '采购订单'
            },
            edit: false

        }

    },
    computed: {
        orderList() {
            return this.$store.state.orderlist.userOrderList
        },
        totalNum() {
            return Number(this.$store.state.orderlist.userTotalNum);
        }
    },
    created() {
        //确定消息中心带过来的数据   
        if (this.$route.query && this.$route.query.status && this.$route.query.status != undefined) {
            this.status = parseInt(this.$route.query.status);
            this.httpParam.orderStatus = this.status;
            var flag = true;
            for (var i = 0; i < this.supplyStatus.length; i++) {
                let obj = this.supplyStatus[i];
                obj.show = false;
                if (obj.back_id === this.status) {
                    obj.show = true;
                    flag = false;
                }
            }
            if (flag) {
                this.supplyStatus[0].show = true;
            }
        };
    },
    mounted() {
        this.getHttp();
    },
    components: {
        logistics,
        titleHead,
        popUps
    },
    methods: {
        handleClick() {
            console.log(1);
        },
        bigImgs(img) {
            this.popParam.bigImg = true;
            this.popParam.pops_show = true;
            this.popParam.bigUrl = img;
        },
        handleSizeChange(val) {

        },
        handleCurrentChange(val) {
            this.httpParam.pn = val;
            this.getHttp();
        },
        judgeOrderStatus(val) {
            let status = ''
            switch (val) {
                case -2:
                    status = '';
                    break;
                case -1:
                    status = '';
                    break;
                case 0:
                    status = 'cancel';
                    break;
                case 10:
                    status = 'cancel';
                    break;
                case 20:
                    status = 'pay';
                    break;
                case 30:
                    status = 'collectmoney';
                    break;
                case 40:
                    status = 'waitsend';
                    break;
                case 50:
                    status = 'send';
                    break;
                case 60:
                    status = 'success';
                    break;
                case 70:
                    status = 'success';
                    break;
            }
            return status;
        },
        getHttp() {
            let _self = this;
            this.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'orderService',
                biz_method: 'queryCartOrderList',
                biz_param: _self.httpParam
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getUserOrderList', {
                body: body,
                path: url
            }).then(() => {
                _self.loading = false
            }, () => {
                _self.loading = false
            });
        },
        seeLogistics(id) {
            let _self = this;
            _self.edit = true;
            this.statusShow = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'logisticsService',
                biz_method: 'queryLogisticsDetails',
                biz_param: {
                    orderId: id
                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body)
                .then(function(res) {
                    console.log(res);
                    if (res.biz_result.data) _self.logistics.arr = res.biz_result.data;
                    _self.statusShow = false;
                })
                .catch(function(err) {
                    console.log(err)
                    _self.statusShow = false;
                })

        },
        ConfirmReceipt(id, no) {
            let _self = this;
            this.statusShow = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'orderService',
                biz_method: 'updateOrderStatus',
                biz_param: {
                    id: id,
                    type: 0,
                    no: no
                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body)
                .then(function(res) {
                    _self.statusShow = false;
                    if (res.code == "1c01") {
                        _self.$message({
                            message: '已确认收货',
                            type: 'success'
                        });
                    }
                    _self.getHttp();
                })
                .catch(function(err) {
                    console.log(err)
                    _self.statusShow = false;
                })
        },
        cancelOrder(id, no) {
            let _self = this;
            this.statusShow = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'orderService',
                biz_method: 'cancelOrder',
                biz_param: {
                    id: id,
                    no: no
                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body)
                .then(function(res) {
                    _self.statusShow = false;
                    if (res.code == "1c01") {
                        _self.$message({
                            message: '取消成功',
                            type: 'success'
                        });
                    }
                    _self.getHttp();
                })
                .catch(function(err) {
                    console.log(err)
                    _self.statusShow = false;
                })
        },
        urge() {
            let _self = this;
            _self.$message({
                message: '已催促发货~',
                type: 'success'
            });
        },
        payMoney() {
            let _self = this;
            _self.$message({
                message: '支付功能尚未开通~',
                type: 'success'
            });
        },
        checkStatus(status, index) {
            let _self = this;
            console.log(status);
            for (var i = 0; i < _self.supplyStatus.length; i++) {
                _self.supplyStatus[i].show = false;
            }
            _self.supplyStatus[index].show = true;
            _self.httpParam.orderStatus = status;
            _self.getHttp();
        }

    }
}
</script>
