<style lang="less" scoped>
.intention {
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
                border: 1px solid #E0E0E0;
                color: #666666;
                border-radius: 5px;
                background-color: #fff;
                font-size: 12px;
                margin: 0 10px;
                cursor: pointer;
            }
        }
    }
    .items {
        padding: 24px 10px;
        padding-right: 0;
        .item {
            height: 100px;
            margin-bottom: 25px;
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
                    padding: 20px 0;
                    .cont_wrap {
                        height: 100%;
                        padding: 0 30px;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        border-left: 1px solid #E3E3E3;
                        font-size: 14px;
                        .info {
                            color: #4D4D4D;
                            .pre_read {
                                color: #F08200;
                                margin-right: 10px;
                                font-weight: 700;
                            }
                        }
                        .linkTo {
                            color: #27A961;
                            cursor: pointer;
                        }
                    }
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
    <div class="intention">
        <div class="top_checkBox">
            <el-checkbox v-model="checked" @change="allChecked">
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
            <div v-if="intentionList.length > 0" class="item" v-for="item in intentionList">
                <div class="checkBox_wrap">
                    <el-checkbox @change="itemChecked" v-model="item.checked">
                    </el-checkbox>
                </div>
                <div class="content">
                    <div class="time_wrap">
                        <div class="ymd">
                            {{item.creatTime, 0 | getYMD}}
                        </div>
                        <div class="hm">
                            {{item.creatTime, 1 | getYMD}}
                        </div>
                    </div>
                    <div class="cont_txt">
                        <div class="cont_wrap">
                            <div class="info">
                                <span class="pre_read" v-if="item.isRead === 0">[未读]</span>
                                <span class="pre_read" style="color: #B3B3B3" v-if="item.isRead === 1">[已读]</span>
                                <span>{{item.message, 60 | filterTxt}}</span>
                            </div>
                            <div class="linkTo">
                                <span @click="linkTo(item)">查看详情</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="intentionList.length ===  0" class="normal">
                <img src="../../../static/icon/normalMessage.png">
                <span>亲，暂时没有消息哦！</span>
            </div>
        </div>
        <div class="page" v-if="intentionList.length > 0">
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
                    type: 1,
                    pn: 1,
                    pSize: 10
                }
            }
        },
        computed: {
            intentionList() {
                return this.$store.state.message.messageIntention.list;
            },
            total() {
                return this.$store.state.message.messageIntention.total
            }
        },
        created() {
            this.getIntentionList();
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
                this.intentionList.forEach(function(item) {
                    item.checked = _self.checked;
                })
            },
            //改变单个
            itemChecked() {
                let flag = true;
                for (var i = 0; i < this.intentionList.length; i++) {
                    if (!this.intentionList[i].checked) {
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
                this.intentionList.forEach(function(item) {
                    if (item.checked) {
                        _self.checkedList.push(item.id);
                    }
                })
            },
            linkTo(item) {
                let target = (isMy) => {
                    //1 跳自己
                    if (isMy === 1) {
                        this.$router.push('/member/myNeed?intentionId=' + item.intentionId);
                    } else if (isMy === 0) {
                        //0 跳列表
                        this.$router.push('/need?intentionId=' + item.intentionId);
                    } else {
                        this.$router.push('/need?intentionId=' + item.intentionId);
                    }
                };
                //点击后更新完成后 
                //先获取总数
                //再获取标题数量
                //再获取列表 item.intentionId, item.id
                this.updateMessageRead(item.id);
                if (item.intentionType === 0) {
                    //返回isMy
                    if (item.isMy) {
                        target(item.isMy)
                    } else {
                        //不返回isMy
                        //我的求购 判断是我的资源 还是 别人的资源
                        this.getDetail(item.intentionId).then((sur) => {
                            target(sur.biz_result.isMy)
                        }, (error) => {

                        });
                    }
                } else if (item.intentionType === 1) {
                    //我的资源列表
                    this.$router.push('/member/myResource?intentionId=' + item.intentionId);
                }
            },
            //获取列表
            getIntentionList() {
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
                this.$store.dispatch('getIntentionList', {
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
                this.getIntentionList();
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
                    this.getIntentionList();
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
                    this.getIntentionList();
                    //再获取标题数量
                    this.getMessageType();
                    //再获取列表
                    this.getIntentionList();
                }, () => {

                })
            },
            getDetail(id) {
                let _self = this;
                return new Promise((resolve, reject) => {
                    let url = httpService.addSID(httpService.urlCommon + httpService.apiUrl.most);
                    let body = {
                        biz_module: 'intentionService',
                        biz_method: 'queryIntentionInfo',
                        biz_param: {
                            id: id
                        }
                    };
                    //url = httpService.addSID(url);
                    body.version = 1;
                    let localTime = new Date().getTime();
                    body.time = localTime + httpService.difTime;
                    body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    httpService.commonPost(url, body)
                        .then(function(res) {
                            resolve(res);
                        })
                        .catch(function(err) {
                            reject(err);
                        })
                })

            },


        }
}
</script>
