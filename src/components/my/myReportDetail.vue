<style lang="less" scoped>
.my_need {
    .box {
        margin-top: 30px;
        .green {
            color: #089A47;
            cursor: pointer;
        }
        .orange {
            color: #FA8535;
            cursor: pointer;
        }
        .block {
            float: right;
            margin-top: 20px;
        }
        .top {
            .title {
                color: #92BD75;
                font-size: 20px;
                line-height: 20px;
                margin-bottom: 22px;
            }
            .content {
                width: 650px;
                display: flex;
                flex-direction: row;
                div {
                    flex: 1;
                    text-align: left;
                    font-size: 15px;
                    line-height: 15px;
                    margin-bottom: 14px;
                    color: #929292;
                }
            }
        }
    }
}
</style>
<template>
    <div class="my_need">
        <titleHead :param="myhead" v-on:empty='empty'></titleHead>
        <div class='box' v-if='!detailObj'>
            <el-table :data="myNeed.list" border style="width: 100%">
                <el-table-column label="发布时间">
                    <template scope="scope">
                        <span>{{scope.row.pubdate | formatBirth}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="品名">
                    <template scope="scope">
                        <span>{{scope.row.breedName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="规格">
                    <template scope="scope">
                        <span>{{scope.row.spec}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="产地">
                    <template scope="scope">
                        <span>{{scope.row.location}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template scope="scope">
                        <span>{{scope.row.number}}{{scope.row.unit}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="收到报价">
                    <template scope="scope">
                        <span>{{scope.row.offer}}条</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <span class='orange'>删除</span>&nbsp;&nbsp;
                        <span class='orange'>编辑</span>
                    </template>
                </el-table-column>
                <el-table-column label="详情">
                    <template scope="scope">
                        <span class='green' @click='lookDetail(scope.row.id)'>查看详情</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="myNeed.total" :page-size="10" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <div class='box'>
            <div class='top'>
                <div class='title'>求购需求</div>
                <div class='content'>
                    <div>发布时期：{{detailObj.pubdate | formatBirth}}</div>
                    <div>产品名称：{{detailObj.breedName}}</div>
                    <div>产品规格：{{detailObj.spec}}</div>
                </div>
                <div class='content'>
                    <div>发布产地：{{detailObj.location}}</div>
                    <div>需求数量：{{detailObj.number}}</div>
                    <div>剩余时间：{{detailObj.duedate | timeDays}}</div>
                </div>
            </div>
            <div class='bottom'>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import titleHead from '../../components/common/headTitle'
import myResDeatil from '../../components/my/myResDeatil'
let param = {
    sort: {
        "pubdate": "0",
        "duedate": "0"
    },
    onSell: 0,
    pn: 1,
    pSize: 10
}

function fetchItem(store, req, redirect) {
    let url = common.urlCommon + common.apiUrl.most;
    let body = {
        biz_module: 'intentionService',
        biz_method: 'myBegIntentionList',
        biz_param: param
    };
    if (!common.SID) {
        common.getSID(req, redirect);
    }
    url = common.addSID(url);
    body.version = 1;
    let localTime = new Date().getTime();
    body.time = localTime + common.difTime;
    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
    return store.dispatch('getMyNeed', {
        body: body,
        path: url
    });
}
export default {
    name: 'my-need-view',
    async data({
        store,
        req,
        redirect
    }) {
        await fetchItem(store, req, redirect)
        return {
            resourceParam: param,
            myhead: {
                name: '我的求购',
                title: ''
            },
            textarea: '',
            loading: false,
            detailObj: '',
            word: '我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还我滴好滴好大好的杀毒杀毒就阿红多少卡还'
        }
    },
    computed: {
        myNeed() {
            return this.$store.state.user.myNeed;
        }
    },
    components: {
        titleHead,
        myResDeatil
    },
    methods: {
        getHttp() {
            let _self = this;
            _self.loading = true;
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'myBegIntentionList',
                biz_param: _self.resourceParam
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getMyResource', {
                body: body,
                path: url
            }).then(() => {
                _self.loading = false;
            }, () => {
                _self.loading = false;
            })
        },
        getDetail(id) {
            let _self = this;
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'queryIntentionInfo',
                biz_param: {
                    id: id
                }
            };
            //url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body)
                .then(function(res) {
                    _self.loading = false;
                    if (res.code == '1c01') {
                        console.log(res.biz_result)
                        _self.detailObj = res.biz_result;
                        _self.myhead.title = '返回求购列表'
                    }
                })
                .catch(function(err) {
                    _self.loading = false;
                })
        },
        getOfferList(id) {
            let _self = this;
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionOfferService',
                biz_method: 'queryIntentionOfferList',
                biz_param: {
                    intentionId: id
                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body)
                .then(function(res) {
                    _self.loading = false;
                    if (res.code == '1c01') {
                        console.log(res.biz_result.list)
                        
                    }
                })
                .catch(function(err) {
                    _self.loading = false;
                })
        },
        empty() {
            this.detailObj = '';
        },
        lookDetail(id) {
            this.getDetail(id);
            this.getOfferList(id);
        },
        handleCurrentChange(val) {
            this.resourceParam.pn = val;
            this.getHttp();
        },

    }
}
</script>
