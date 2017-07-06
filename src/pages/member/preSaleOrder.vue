<style scoped>
.pre_sale_order {
    position: relative;
}

ul li {
    text-decoration: none;
    list-style: none;
}

.pre_sale_order .block {
    float: right;
    margin-top: 20px;
}

.pre_sale_order .status {
    height: 50px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    border-radius: 2px;
    margin-top: 30px;
}

.pre_sale_order .status>div {
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

.pre_sale_order .status .color {
    color: #FA6705;
    background-color: #fff;
}

.pre_sale_order .my_status {
    color: green;
    text-align: center;
}

.pre_sale_order .check_detail {
    color: #FA6705;
    text-align: center;
    cursor: pointer;
}

.pre_sale_order .my_title {
    padding-left: 15px;
    border-left: 2px solid #F8A226;
    font-size: 16px;
    font-weight: 600;
}

.pre_sale_order .specail {
    margin-top: 30px;
    margin-bottom: 23px;
}

.pre_sale_order .consignee_infor {
    font-size: 14px;
    line-height: 14px;
    color: #333;
    margin-left: 17px;
}

.pre_sale_order .t_specail {
    margin-top: 14px;
    margin-bottom: 30px;
}

.detail_infor {
    width: 100%;
}

.detail_infor .detail_title {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.detail_infor .detail_title>div {
    flex: 1;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background: #F8A226;
    color: #fff;
    margin-top: 10px;
}

.detail_infor .detail_title .t_title {
    flex: 2;
}

.detail_infor .detail_content {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.detail_infor .detail_content>div {
    flex: 1;
    height: 100px;
    text-align: center;
    box-sizing: border-box;
    line-height: 100px;
}

.detail_infor .detail_content .img {
    text-align: left;
    margin-top: 15px;
    flex: 2;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    line-height: 14px;
}

.detail_infor .detail_content .img img {
    width: 84px;
    height: 85px;
}

.detail_infor .detail_content .other {
    width: 110px;
    margin-left: 10px;
}

.detail_infor .detail_content .other .loca {
    margin-top: 35px;
    word-break: break-all;
}

.detail_infor .detail_content .other .other_name {
    padding-top: 10px;
}

.detail_infor .about_money {
    width: 100%;
    margin-top: 20px;
}

.detail_infor .about_money .preMoney {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 15px;
    line-height: 15px;
    margin-top: 30px;
}

.detail_infor .about_money .preMoney>img {
    width: 15px;
    height: 15px;
    margin-right: 15px;
}

.detail_infor .about_money .preMoney .word {
    margin-right: 70px;
    width: 100px;
}

.detail_infor .about_money .preMoney .moneys {
    flex: 1;
}

.three_price {
    padding-left: 30px;
    padding-top: 20px;
}

.outbox {
    display: flex;
}

.inbox {
    width: 98px;
}

.three_price>div {
    margin-bottom: 10px;
}
</style>
<template>
    <div class="pre_sale_order">
        <titleHead :param="myhead"></titleHead>
        <div class="status">
            <div v-for="(item,index) in sellStatus" v-bind:class="{color:item.show}" @click="checkStatus(item.back_id,index)">{{item.name}}</div>
        </div>
        <template>
            <el-table :data="orderList" border style="width: 100%">
                <el-table-column prop="breedName" label="商品">
                </el-table-column>
                <!-- 预付订金 -->
                <el-table-column label="预付订金" v-if='sellStatus[1].show'>
                    <template scope="scope">
                        <span>{{orderList[scope.$index].preMoney | floatType}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预付订金" v-if='sellStatus[2].show'>
                    <template scope="scope">
                        <span>已支付</span>
                    </template>
                </el-table-column>
                <el-table-column label="预付订金" v-if='sellStatus[3].show'>
                    <template scope="scope">
                        <span>已支付</span>
                    </template>
                </el-table-column>
                <!-- 应付尾款 -->
                <el-table-column label="应付尾款" v-if='sellStatus[1].show'>
                    <template scope="scope">
                        <span>{{orderList[scope.$index].payMentMoney | floatType}}(运杂费待确认)</span>
                    </template>
                </el-table-column>
                <el-table-column label="应付尾款" v-if='sellStatus[2].show'>
                    <template scope="scope">
                        <span>{{orderList[scope.$index].payMentMoney | floatType}}(运杂费待确认)</span>
                    </template>
                </el-table-column>
                <el-table-column label="应付尾款" v-if='sellStatus[3].show'>
                    <template scope="scope">
                        <span>{{orderList[scope.$index].payMentMoney | floatType}}(含运杂费)</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ctime" label="下单时间">
                </el-table-column>
                <el-table-column prop="arriveTime" label="预计到港期">
                </el-table-column>
                <el-table-column label="订单状态" width='110'>
                    <template scope="scope">
                        <div class="my_status">{{orderList[scope.$index].orderStatus | preStatus}}</div>
                        <div class="check_detail" @click="lookDetail(orderList[scope.$index].id, orderList[scope.$index].no)">查看</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template scope="scope">
                        <!-- <div v-if="'payMoney' == judgeOrderStatus(orderList[scope.$index].orderStatus)" class="check_detail" @click="payMoney(scope.$index, scope.row)">付定金</div> -->
                        <!-- <div v-if="'retainage' == judgeOrderStatus(orderList[scope.$index].orderStatus)" class="check_detail" @click="payRetainage(scope.$index, scope.row)">付尾款</div> -->
                        <div v-if="'send' == judgeOrderStatus(orderList[scope.$index].orderStatus)" class="check_detail" @click="seeLogistics(scope.$index, scope.row)">查看物流</div>
                        <div v-if="'send' == judgeOrderStatus(orderList[scope.$index].orderStatus)" class="check_detail" @click="btnConfirmReceipt(scope.$index, scope.row)">确认收货</div>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="totalNum" :page-size="10" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog v-model="edit" size="tiny" title="订单详情">
            <div class="my_title">订单编号:{{preOther.no}}</div>
            <div class="my_title specail">收货信息</div>
            <div class="consignee_infor">收件人：{{preOther.consignee}} | {{preOther.consigneePhone}}</div>
            <div class="consignee_infor t_specail">收货地址：{{preOther.consigneeAddr}}</div>
            <div class="my_title">产品信息</div>
            <div class='detail_infor'>
                <div class='detail_title'>
                    <div class='t_title'>商品</div>
                    <div>单价</div>
                    <div>数量</div>
                    <div>小计</div>
                </div>
                <div class='detail_content'>
                    <div class='img'>
                        <img :src="preDetail.image">
                        <div class='other'>
                            <div class='other_name'>{{preDetail.goodsName}}</div>
                            <div class='loca'>产地：{{preDetail.location}}</div>
                        </div>
                    </div>
                    <div>{{preDetail.price}}元/{{preDetail.unit}}</div>
                    <div>{{preDetail.number}}</div>
                    <div>{{preDetail.price,preDetail.number | filterPrice}}</div>
                </div>
                <!-- 待支付 -->
                <div class='about_money' v-show='preOther.orderStatus == 66'>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>待支付定金</div>
                        <div class='moneys'>￥{{preOther.preMoney | floatType}}</div>
                    </div>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>待支付尾款</div>
                        <div class='moneys'>￥{{preOther.payMentMoney | floatType}}（运杂费待确认）</div>
                    </div>
                </div>
                <!-- 待审核 -->
                <div class='about_money' v-show='preOther.orderStatus == 10'>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>已支付定金</div>
                        <div class='moneys'>￥{{preOther.preMoney | floatType}}</div>
                    </div>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>待支付尾款</div>
                        <div class='moneys'>￥{{preOther.payMentMoney | floatType}}（运杂费待确认）</div>
                    </div>
                </div>
                <!-- 待付尾款 -->
                <div class='about_money' v-show='preOther.orderStatus == 20'>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>已支付定金</div>
                        <div class='moneys'>￥{{preOther.preMoney | floatType}}</div>
                    </div>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>待支付尾款</div>
                        <div class='moneys'>￥{{preOther.payMentMoney | floatType}}</div>
                    </div>
                    <div class='three_price'>
                        <div>杂费价格：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ￥{{preOther.incidentals | floatType}}</div>
                        <!-- <div>运费价格：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ￥{{preOther.freight | floatType}}</div> -->
                        <div>优惠价格：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ￥{{preOther.preferential | floatType}}</div>
                    </div>
                    <div class='preMoney'>
                        <div>应支付尾款：</div>
                        <div>￥{{preOther.payMentMoney | floatType}}</div>
                    </div>
                </div>
                <!-- 剩下的状态 -->
                <div class='about_money' v-show='preOther.orderStatus == 40 || preOther.orderStatus == 50 || preOther.orderStatus == 60'>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>已支付定金</div>
                        <div class='moneys'>￥{{preOther.preMoney | floatType}}</div>
                    </div>
                    <div class='preMoney'>
                        <img src="/static/icon/no-select.png">
                        <div class='word'>已支付尾款</div>
                        <div class='moneys'>￥{{preOther.payMentMoney | floatType}}</div>
                    </div>
                    <div class='three_price'>
                        <div class="outbox">杂费价格：
                            <div class="inbox"></div> ￥{{preOther.incidentals | floatType}}</div>
                        <!-- <div>运费价格：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ￥{{preOther.freight | floatType}}</div> -->
                        <div class="outbox">优惠价格：
                            <div class="inbox"></div> ￥{{preOther.preferential | floatType}}</div>
                    </div>
                    <div class='preMoney'>
                        <div>付款总额：</div>
                        <div>￥{{preOther.total | floatType}}</div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog v-model="logist" size="tiny" title="物流信息">
            <logistics :param="logistics"></logistics>
        </el-dialog>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import titleHead from '../../components/common/headTitle'
import logistics from '../../components/common/logistics'

export default {
    name: 'orderlist-view',
    data() {
        return {
            httpParam: {
                orderStatus: 0,
                pn: 1,
                pSize: 10
            },
            myhead: {
                name: '预售订单'
            },
            status: '',
            sellStatus: [{
                name: '全部订单',
                back_id: 0,
                show: true
            }, {
                name: '待支付定金',
                back_id: 66,
                show: false
            }, {
                name: '待审核',
                back_id: 10,
                show: false
            }, {
                name: '待支付尾款',
                back_id: 20,
                show: false
            }, {
                name: '待发货',
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
            }],
            edit: false,
            logist: false,
            logistics: {
                arr: [],
                show: false
            },
            arr: [{
                name: '产品'
            }, {
                name: '产地'
            }, {
                name: '单价'
            }, {
                name: '数量'
            }],
            priceArr: [{
                name: '预付定金'
            }, {
                name: '已付定金'
            }, {
                name: '待支付尾款'
            }, {
                name: '杂费/运费'
            }, {
                name: '优惠价格'
            }, {
                name: '总价'
            }]
        }
    },
    computed: {
        orderList() {
            return this.$store.state.orderlist.preOrderList
        },
        totalNum() {
            return Number(this.$store.state.orderlist.preTotalNum);
        },
        preDetail() {
            return this.$store.state.orderlist.preOrderDetail;
        },
        preOther() {
            return this.$store.state.orderlist.preOrderDetailOther;
        }

    },
    components: {
        logistics,
        titleHead
    },
    created() {
        //确定消息中心带过来的数据   
        if (this.$route.query && this.$route.query.status && this.$route.query.status != undefined) {
            this.status = parseInt(this.$route.query.status);
            this.httpParam.orderStatus = this.status;
            var flag = true;
            for (var i = 0; i < this.sellStatus.length; i++) {
                let obj = this.sellStatus[i];
                obj.show = false;
                if (obj.back_id === this.status) {
                    obj.show = true;
                    flag = false;
                }
            }
            if (flag) {
                this.sellStatus[0].show = true;
            } else {
                let id = this.$route.query.id;
                let no = this.$route.query.no;
                if (id && id != undefined && no && no != undefined) {
                    this.getDetail(id, no);
                    this.edit = true;
                }
            }

        };
    },
    mounted() {
        this.getHttp();
    },
    methods: {
        lookDetail(id, no) {
            this.edit = true;
            this.getDetail(id, no);
        },
        handleCurrentChange(val) {
            this.httpParam.pn = val;
            this.getHttp();
        },
        judgeOrderStatus(val) {
            let status = ''
            switch (val) {
                case 10:
                    status = 'audit';
                    break;
                case 20:
                    status = 'retainage';
                    break;
                case 66:
                    status = 'payMoney';
                    break;
                case 40:
                    status = 'waitsend';
                    break;
                case 50:
                    status = 'send';
                    break;
                case 60:
                    status = '';
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
                biz_method: 'queryPreOrderList',
                biz_param: _self.httpParam
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getPreOrderList', {
                body: body,
                path: url
            }).then(() => {
                _self.loading = false
            }, () => {
                _self.loading = false
            });
        },
        getDetail(id, no) {
            let _self = this;
            _self.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'orderService',
                biz_method: 'queryCartOrderInfo',
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
            this.$store.dispatch('getPreOrderDetail', {
                body: body,
                path: url
            }).then(() => {
                _self.loading = false
            }, () => {
                _self.loading = false
            });
        },
        payMoney() {
            let _self = this;
            _self.$message({
                message: '支付功能尚未开通~',
                type: 'success'
            });
        },
        payRetainage() {
            let _self = this;
            _self.$message({
                message: '支付尾款功能尚未开通~',
                type: 'success'
            });
        },
        seeLogistics(index, row) {
            console.log(row.id)
            let _self = this;
            _self.logist = true;
            this.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'logisticsService',
                biz_method: 'queryLogisticsDetails',
                biz_param: {
                    orderId: row.id
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
                    _self.loading = false;
                })
                .catch(function(err) {
                    console.log(err)
                    _self.loading = false;
                })

        },
        btnConfirmReceipt(index, row) {
            this.$confirm('是否确认收货?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ConfirmReceipt(index, row);
            }).catch(() => {

            });
        },
        ConfirmReceipt(index, row) {
            let _self = this;
            this.statusShow = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'orderService',
                biz_method: 'updateOrderStatus',
                biz_param: {
                    id: row.id,
                    type: 0,
                    no: row.no
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
        checkStatus(status, index) {
            let _self = this;
            //console.log(status);
            for (var i = 0; i < _self.sellStatus.length; i++) {
                _self.sellStatus[i].show = false;
            }
            _self.sellStatus[index].show = true;
            _self.httpParam.orderStatus = status;
            _self.getHttp();
        }

    }
}
</script>
