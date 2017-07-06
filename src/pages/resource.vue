<style lang="less" scoped>
@width : 1200px;
body {
    .content_body {
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
        .content {
            min-height: 800px;
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .body_content {
                width: 1200px;
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                .resource_detail {
                    border: 1px solid #eee;
                    background-color: #fff;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 150px;
                    padding: 20px;
                    margin-bottom: 20px;
                    .resource_image {
                        flex: 0 0 270px;
                        height: 170px;
                        position: relative;
                        overflow: hidden;
                        img {
                            position: absolute;
                            margin: auto;
                            left: 0;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            width: 300px;
                            min-height: 150px;
                            cursor: pointer;
                        }
                    }
                    .need_detail_left {
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: column;
                        margin-left: 30px;
                        margin-right: 40px;
                        .title {
                            margin-bottom: 35px;
                            .names {
                                margin-right: 40px;
                                display: flex;
                                flex-direction: row;
                                .breed_name {
                                    cursor: pointer;
                                }
                                img {
                                    height: 25px;
                                    margin-left: 5px;
                                }
                            }
                            display: flex;
                            flex-direction: row;
                            font-size: 24px;
                            color: #676767;
                            .orange_span {
                                margin-left: 20px;
                            }
                        }
                        .detail {
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            font-size: 16px;
                            color: #666;
                            width: 650px;
                            .detail_box {
                                margin-bottom: 15px;
                                display: flex;
                                flex-direction: row;
                                width: 650px;
                                .item {
                                    flex: 1;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }
                            }
                            .last_box {
                                margin-bottom: 0px;
                            }
                            .image {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                .distance {
                                    margin: 0 0 0 10px;
                                }
                                img {
                                    margin: 0 10px;
                                }
                                div {
                                    padding: 0;
                                }
                            }
                        }
                    }
                    .need_detail_right {
                        flex: 0 1 auto;
                    }
                }
                // .resource_detail:hover {
                //     background-color: #fff;
                //     border: 1px solid #FA8435;
                //     .border_orange_button {
                //         background-color: #FA8435;
                //         color: #fff;
                //     }
                // }
                .page {
                    padding: 20px 0;
                    text-align: center;
                }
            }
        }
    }
}
</style>
<template>
    <div class="content_body" v-loading.fullscreen.lock="fullscreenLoading">
        <headerView tab="3"></headerView>
        <div class="content">
            <div class="body_content">
                <resourceTextCondition :httpParam="httpParam" v-on:getData="getHttp"></resourceTextCondition>
                <resourceCondition :httpParam="httpParam" v-on:getData="getHttp"></resourceCondition>
                <div class="resource_detail" v-for="item in resourceList" v-show="item.isMy == '0'">
                    <div class="resource_image">
                        <img :src="item.image[0]" v-on:click="buy(item)">
                    </div>
                    <div class="need_detail_left">
                        <div class="title">
                            <div class='names'>
                                <div class='breed_name' v-on:click="buy(item)">{{item.breedName}}</div>
                                <img src="../static/icon/burst.png" v-if="item.especial == 1 && item.type == 1" class="small_img">
                            </div>
                            <div>
                                <span class="orange_span">{{item.price+'元/'+item.unit}}</span>
                            </div>
                        </div>
                        <div class="detail">
                            <div class='detail_box'>
                                <div class='item'>品种：{{item.breedName}}</div>
                                <div class='item'>规格：{{item.spec}}</div>
                                <div class='item' v-if="item.shelveTime">上架时间：{{item.shelveTime | formatBirth}}</div>
                                <div class='item' v-if="!item.shelveTime">上架时间：近期上架</div>
                            </div>
                            <div class='detail_box'>
                                <div class='item'>产地：{{item.location}}</div>
                                <div class='item'>库存：{{item.number+item.unit}}</div>
                                <div class='item'>状态：<span v-show='item.onSell == 2'>在售</span></div>
                            </div>
                            <div class='detail_box last_box'>
                                <div class='item' v-if="item.quality == ''">卖点：暂未填写卖点</div>
                                <div class='item' v-if="item.quality != ''">卖点：{{item.quality}}</div>
                                <div class="image item">
                                    <div>专属交易员：{{item.employeeName}}</div>
                                    <div class="distance">|</div>
                                    <img src="../assets/images/phone-green.png">
                                    <div>{{item.employeeMobil}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="need_detail_right">
                        <el-button type="primary" size="large" class="border_orange_button" @click="buy(item)">立即采购</el-button>
                    </div>
                </div>
                <div class="page">
                    <el-pagination @current-change="handleCurrentChange" :current-page="httpParam.pn" :page-size="httpParam.pSize" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../common/httpService.js'
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
import resourceTextCondition from '../components/need/needTextCondition.vue'
import resourceCondition from '../components/resource/resourceCondition.vue'
let httpParam = {
    sort: {
        "shelve_time": "0",
        "price": "0",

    },
    location: [],
    sampling: '-1',
    pn: 1,
    pSize: 10,
    spec: '',
    keyWord: ''
}
export default {
    name: 'resource_view',
    data() {
        return {
            httpParam: httpParam,
            fullscreenLoading: false
        }
    },
    watch: {
        resourceValue() {
            this.httpParam.pn = 1;
            this.httpParam.keyWord = this.$store.state.search.searchValue.resourceValue;
        }
    },
    components: {
        headerView,
        footerView,
        resourceTextCondition,
        resourceCondition
    },
    computed: {
        resourceList() {
            return this.$store.state.resource.resourceAllList.list
        },
        total() {
            return this.$store.state.resource.resourceAllList.total
        },
        resourceValue() {
            this.httpParam.keyWord = this.$store.state.search.searchValue.resourceValue;
        }
    },
    mounted() {
        if (this.$store.state.search.searchValue.resourceValue) {
            this.httpParam.keyWord = this.$store.state.search.searchValue.resourceValue;
        } else {
            this.httpParam.keyWord = '';
        }
        this.httpParam.pn = 1;
        if (this.$store.state.resource.resourceAllList.list.length == 0) {
            this.getHttp();
        }
    },
    methods: {
        getHttp(params) {
            //确定是头部搜索组件下来的请求
            if (params && (params.type === 'need' || params.type === 'resource')) {
                this.httpParam.pn = params.pn
            };
            let _self = this;
            let url = common.urlCommon + common.apiUrl.most;
            if (common.SID) url = common.addSID(url);
            this.fullscreenLoading = true;
            this.$store.dispatch('getResourceAllList', {
                body: {
                    biz_module: 'intentionService',
                    biz_method: 'querySupplyList',
                    biz_param: _self.httpParam
                },
                path: url
            }).then(() => {
                _self.fullscreenLoading = false;
            }, () => {
                _self.fullscreenLoading = false;
            });
        },
        handleCurrentChange(val) {
            this.httpParam.pn = val;
            this.getHttp();
        },
        buy(val) {
            // let newWin = window.open();
            // newWin.location.href = "/resourceDetail/" + val.id;
            this.$router.push("/resourceDetail/" + val.id);
        }
    }
}
</script>
