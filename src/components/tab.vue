<style lang="less" scoped>
.tab_components {
    flex: 0 1 auto;
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        flex: 1 1 auto;
        text-align: center;
        .tab_span {
            height: 50px;
            display: inline-block;
            line-height: 50px;
            color: #666;
            font-size: 18px;
            cursor: pointer;
        }
        .orange_span {
            color: #FA8435;
            cursor: pointer;
        }
    }
    .hot_service {
        cursor: pointer;
        background-color: #FA8435;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .tab_span {
            color: #fff;
            line-height: 50px;
            margin-right: 10px;
        }
        .service {
            position: absolute;
            width: 100%;
            bottom: -400px;
            height: 402px;
            background-color:rgba(138, 129, 122, .9);           
            z-index: 999;
            top: 50px;
            left: 0;
        }
    }
}
</style>
<template>
    <div class="tab_components">
        <div class="hot_service" v-on:mouseenter="show()" v-on:mouseleave="hide()">
            <span class="tab_span">热门服务</span>
            <img src="../assets/images/Popular-services.png">
            <div class="service" v-show="showHot">
                <serviceView v-on:show="show"></serviceView>
            </div>
        </div>
        <div v-for="(item,index) in tabs">
            <span class="tab_span orange_span" v-if="judge(index)" @click="jump(item.router)">{{item.title}}</span>
            <span class="tab_span" v-if="!judge(index)" @click="jump(item.router)">{{item.title}}</span>
        </div>
    </div>
</template>
<script>
import serviceView from '../components/service.vue'
import common from '../common/httpService.js'
export default {
    name: 'tab_view',
    data() {
        return {
            showHot: false,
            tabs: [{
                title: '首页',
                router: '/'
            }, {
                title: '求购专区',
                router: '/need'
            }, {
                title: '资源专区',
                router: '/resource'
            }, {
                title: '预售专区',
                router: '/presell'
            }, {
                title: '市场行情',
                router: '/market'
            }, {
                title: '药材百科',
                router: '/drugsEncy'
            }],
            needParam: {
                sort: {
                    "offer": "0",
                    "duedate": "0",
                    "shelve_time": "0"
                },
                location: [],
                keyWord: '',
                pn: 1,
                pSize: 10,
                spec: ''
            },
            resParam: {
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
            },
            preParam: {
                pn: 1,
                pSize: 15,
                country: '',
                breedName: '',
                spec: '',
                arriveTime: 0
            }
        }
    },
    props: {
        tab: ''
    },
    components: {
        serviceView
    },
    methods: {
        getNeedHttp() {
            let _self = this;
            this.fullscreenLoading = true;
            let url = common.urlCommon + common.apiUrl.most;
            if (common.SID) url = common.addSID(url);
            this.$store.dispatch('setSearchValue', {
                type: 1,
                value: ''
            });
            this.$store.dispatch('getNeedAllList', {
                body: {
                    biz_module: 'intentionService',
                    biz_method: 'queryBegBuyList',
                    biz_param: _self.needParam
                },
                path: url
            }).then(() => {
                _self.fullscreenLoading = false;
            }, () => {
                _self.fullscreenLoading = false;
            });
        },
        getResHttp() {
            let _self = this;
            let url = common.urlCommon + common.apiUrl.most;
            if (common.SID) url = common.addSID(url);
            this.fullscreenLoading = true;
            this.$store.dispatch('setSearchValue', {
                type: 0,
                value: ''
            });
            this.$store.dispatch('getResourceAllList', {
                body: {
                    biz_module: 'intentionService',
                    biz_method: 'querySupplyList',
                    biz_param: _self.resParam
                },
                path: url
            }).then(() => {
                _self.fullscreenLoading = false;
            }, () => {
                _self.fullscreenLoading = false;
            });
        },
        getPreHttp() {
            let _self = this;
            this.fullscreenLoading = true;
            this.$store.dispatch('getPresellList', {
                body: {
                    biz_module: 'intentionService',
                    biz_method: 'preSellList',
                    biz_param: _self.preParam
                },
                path: common.urlCommon + common.apiUrl.most
            }).then(() => {
                _self.fullscreenLoading = false;
            }, () => {
                _self.fullscreenLoading = false;
            });
        },
        show() {
            this.showHot = true;
        },
        hide() {
            this.showHot = false;
        },
        searchShow() {
            this.autoEle = true;
        },
        judge(index) {
            let res = false;
            if (this.tab - index === 1) {
                res = true;
            }
            return res;
        },
        jump(router) {
            let _self = this;
            switch (router) {
                case '/need':
                    _self.getNeedHttp();
                    break;
                case '/resource':
                    _self.getResHttp();
                    break;
                case '/presell':
                    _self.getPreHttp();
                    break;
            };   
            this.$store.dispatch('addIsTabNum', 1);
            this.$router.push(router);
        }
    }
}
</script>
