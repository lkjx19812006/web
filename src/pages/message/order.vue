<style lang="less" scoped>
.order {
    .top_checkBox {
        height: 38px;
        background-color: #F8F8F8;
        border-top: 1px solid #E0E0E0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        .btn_wrap {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            div {
                padding: 3px 15px;
                color: #fff;
                border-radius: 5px;
                font-size: 12px;
                margin: 0 10px;
                cursor: pointer;
            }
            .btn_read {
                border: 1px solid #EDB200;
                background-color: #FBBD00;
            }
            .btn_del {
                border: 1px solid #EB7F00;
                background-color: #FB8800;
            }
        }
    }
    .items {
        padding: 24px 10px;
        padding-right: 0;
        .item {
            height: 100px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .checkBox_wrap {
                flex: 0 0 auto;
                width: 50px;
            }
            .content {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                background-color: #FBFBFB;
                height: 100%;
                position: relative;
                .time_wrap {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex: 0 0 auto;
                    height: 100%;
                    width: 116px;
                    .ymd {
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 5px;
                    }
                    .hm {
                        font-size: 14px;
                        color: #999;
                    }
                }
                .cont_txt {
                    flex: 1;
                    padding: 15px 0;
                    .cont_wrap {
                        height: 100%;
                        padding: 0 30px;
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;
                        border-left: 1px solid #E3E3E3;
                        font-size: 14px;
                        .state {
                            flex: 0 0 auto;
                            margin-right: 20px;
                            .pre_read {
                                color: #F08200;
                                font-weight: 700;
                            }
                        }
                        .info_cont {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            height: 100%;
                            flex: 1;
                            .send_good {
                                color: red;
                                font-size: 16px;
                            }
                            .order_num {
                                color: #808080;
                                font-size: 14px;
                            }
                            .info {
                                color: #4D4D4D;
                                margin-right: 10px;
                                .linkTo {
                                    color: #27A961;
                                    cursor: pointer;
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
                .type_img {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }
        }
        .normal {
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
                font-size: 18px;
                color: #CACACA;
                margin-top: 30px;
            }
        }
    }
    .page {
        text-align: center;
        margin-bottom: 100px;
    }
}
</style>
<template>
    <div class="order">
        <div class="top_checkBox">
            <el-checkbox @change="allChecked" v-model="checked">
                <span style="font-size: 12px; color: #666">全选</span>
            </el-checkbox>
            <div class="btn_wrap">
                <div class="btn_read" @click="isRead">
                    标为已读
                </div>
                <div class="btn_del" @click="del">
                    删除
                </div>
            </div>
        </div>
        <div class="items">
            <div v-if="olderList.length > 0" class="item" v-for="item in olderList">
                <div class="checkBox_wrap">
                    <el-checkbox @change="itemChecked" v-model="item.checked">
                    </el-checkbox>
                </div>
                <div class="content">
                    <div class="time_wrap">
                        <div class="ymd">
                            {{item.ctime, 0 | getYMDOlder}}
                        </div>
                        <div class="hm">
                            {{item.ctime, 1 | getYMDOlder}}
                        </div>
                    </div>
                    <div class="cont_txt">
                        <div class="cont_wrap">
                            <div class="state">
                                <span class="pre_read" v-if="item.isRead === 0">[未读]</span>
                                <span class="pre_read" style="color: #B3B3B3" v-if="item.isRead === 1">[已读]</span>
                            </div>
                            <div class="info_cont">
                                <div class="send_good">
                                    {{ item.orderStatus | filterOrder}}
                                </div>
                                <div class="info">
                                    <span>{{item.message, 60 | filterTxt}}</span>
                                    <span class="linkTo" @click="linkTo(item)">点击查看详情</span>
                                </div>
                                <div class="order_num">
                                    <span>订单编号：</span>
                                    <span>{{item.no}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="type_img">
                        <img v-if="item.intentionType === 1" src="../../../static/icon/yugou.png" height="48" width="64">
                        <img v-if="item.intentionType === 2" src="../../../static/icon/caigou.png" height="48" width="64">
                        <img v-if="item.intentionType === 3" src="../../../static/icon/xiaoshou.png" height="48" width="64">
                    </div>
                </div>
            </div>
            <div v-if="olderList.length ===  0" class="normal">
                <img src="../../../static/icon/normalMessage.png">
                <span>亲，暂时没有消息哦！</span>
            </div>
        </div>
        <div class="page" v-if="olderList.length > 0">
            <el-pagination @current-change="handleCurrentChange" :current-page="httpParam.pn" :page-size="httpParam.pSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                checked: false,
                checkedList: [],
                httpParam: {
                    type: 3,
                    pn: 1,
                    pSize: 10
                }
            }
        },
        computed: {
            olderList() {
                return this.$store.state.message.messageOlderList.list;
            },
            total() {
                return this.$store.state.message.messageOlderList.total
            }
        },
        created() {
            this.getOlderList();
            this.getMessageType();
        },
        methods: {
            isRead() {
                this.countChecked();
                if (this.checkedList.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要标记的信息！！！'
                    })
                    return;
                };
                this.$confirm('确定标记选择消息为已读吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.updateMessageRead(this.checkedList);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            del() {
                this.countChecked();
                if (this.checkedList.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的信息！！！'
                    })
                    return;
                };
                this.$confirm('确定删除选中的消息吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.deleteMessage(this.checkedList);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //处理全选
            allChecked() {
                let _self = this;
                this.olderList.forEach(function(item) {
                    item.checked = _self.checked;
                })
            },
            //改变单个
            itemChecked() {
                let flag = true;
                for (var i = 0; i < this.olderList.length; i++) {
                    if (!this.olderList[i].checked) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            },
            //计算选中的checkBox 排除已读的
            countChecked() {
                let _self = this;
                this.checkedList = [];
                this.olderList.forEach(function(item) {
                    if (item.checked) {
                        _self.checkedList.push(item.id);
                    }
                })
            },
            linkTo(item) {
                //点击后更新完成后 
                //先获取总数
                //再获取标题数量
                //再获取列表
                this.updateMessageRead(item.id);
                console.log(item)
                switch (item.intentionType) {
                    case 1: //预售
                        this.$router.push('/member/preSaleOrder?status=' + item.orderStatus + '&id=' + item.orderId + '&no=' + item.no);
                        break;
                    case 2: //采购
                        this.$router.push('/member/purchaseOrder?status=' + item.orderStatus);
                        break;
                    case 3: //销售
                        this.$router.push('/member/saleOrder?status=' + item.orderStatus);
                        break;
                }

            },
            //获取列表
            getOlderList() {
                let url = httpService.urlCommon + httpService.apiUrl.most
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'myMessagePushList',
                    biz_param: this.httpParam
                }
                url = httpService.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getOlderList', {
                    body: body,
                    path: url
                }).then(() => {
                    this.checked = false;
                }, () => {

                })
            },
            //分页
            handleCurrentChange(val) {
                this.httpParam.pn = val;
                this.getOlderList();
            },
            //更新消息状态
            updateMessageRead(param) {
                let isReadList = [];
                let _self = this;
                if (!param) {
                    return;
                } else {
                    if (this.isArray(param)) {
                        //是数组 直接传数组
                        isReadList = param;
                    } else {
                        //不是数组 直接push到数组中
                        isReadList.push(param)
                    }
                };
                let url = httpService.urlCommon + httpService.apiUrl.most
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'setMessageIsRead',
                    biz_param: {
                        isReadList: isReadList
                    }
                }
                url = httpService.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('updateMessage', {
                    body: body,
                    path: url
                }).then(() => {
                    //先获取总数
                    this.getMessageTotals();
                    //再获取标题数量
                    this.getMessageType();
                    //再获取列表
                    this.getOlderList();
                }, () => {

                })
            },
            isArray(o) {
                return Object.prototype.toString.call(o) == '[object Array]';
            },
            //获取消息类型 列表
            getMessageType() {
                let url = httpService.urlCommon + httpService.apiUrl.most
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'pushMessageList'
                }
                url = httpService.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getMessageType', {
                    body: body,
                    path: url
                }).then(() => {}, () => {})
            },
            //获取消息总数
            getMessageTotals() {
                let url = httpService.urlCommon + httpService.apiUrl.most
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'showIsRead'
                }
                url = httpService.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getMessageTotal', {
                    body: body,
                    path: url
                }).then(() => {}, () => {})
            },
            //删除消息
            deleteMessage(param) {
                let url = httpService.urlCommon + httpService.apiUrl.most
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'deleteMyMessage',
                    biz_param: {
                        messageList: param
                    }
                }
                url = httpService.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('deleteMessage', {
                    body: body,
                    path: url
                }).then(() => {
                    //先获取总数
                    this.getMessageTotals();
                    //再获取标题数量
                    this.getMessageType();
                    //再获取列表
                    this.getOlderList();
                }, () => {

                })
            }

        }
}
</script>
