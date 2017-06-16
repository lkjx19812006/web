<style lang="less" scoped>
.service_need_compent {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 10px;
    .input_search {
        margin-top: 20px;
        display: flex;
        flex: 0 1 auto;
        justify-content: center;
        width: 300px;
        .search_button {
            margin-left: 10px;
            width: 90px;
        }
    }
    .breed_table {
        display: flex;
        flex-direction: column;
        width: 300px;
        align-items: flex-start;
        padding-bottom: 10px;
        a {
            text-decoration: none;
        }
        a:hover {
            > p {
                color: #FA8435;
            }
            cursor: pointer;
        }
        p {
            font-size: 14px;
            color: #7F7F7F;
            font-weight: bold;
        }
        .bread_detail {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 300px;
            justify-content: space-between;
            cursor: pointer;
            span {
                width: 75px;
                font-size: 14px;
                color: #7F7F7F;
                padding: 3px 0 0 0;
                text-align: left;
            }
        }
        .orange {
            width: 75px;
            font-size: 14px;
            padding: 3px 0 0 0;
            color: #7F7F7F;
            text-align: left;
        }
        .orange:hover {
            color: #FA8435;
            cursor: pointer;
        }
        .offerRes {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            .orange {
                flex: 1 0 auto;
                padding: 0 10px;
            }
        }
    }
    .breed_table_bottom {
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>
<template>
    <div class="service_need_compent">
        <div class="input_search">
            <search v-model="breedName" placeholder="请输入查询的药材名称" v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></search>
            <el-button v-on:click="search" icon="search" size="middle" class="orange_button search_button"></el-button>
        </div>
        <div :class="[breedClass]" v-for="(item,index) in list">
            <router-link :to="item.link">
                <p>{{item.title}}</p>
            </router-link>
            <div class="bread_detail" v-for="subItem in item.list" v-if="item.title === '立即报价'">
                <span class="orange" @click="linkTo(subItem)">{{subItem.breedName,3 | filterTxt}}</span>
                <span>{{subItem.location, 4 | filterTxt}}</span>
                <span>{{subItem.number+subItem.unit, 6 | filterTxt}}</span>
                <span>{{subItem.overTime, 6 | filterTxt}}</span>
            </div>
            <div class="offerRes" v-if="item.title === '发布资源'">
                <span v-for="subItem in item.list" class="orange" @click="resourcePub(subItem)">{{subItem.breedName,3 | filterTxt}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import search from '../../components/search.vue'
export default {
    data() {
            let _self = this;
            return {
                breedClass: 'breed_table',
                breedName: '',
                list: [{
                    title: '立即报价',
                    link: '/need',
                    list: []
                }, {
                    title: '发布资源',
                    link: '/resourcePub/',
                    list: []
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
            }
        },
        components: {
            search
        },
        methods: {
            linkTo(item) {
                this.needParam.keyWord = item.breedName;
                this.searchResource();
            },
            resourcePub(item){
                this.$router.push('/resourcePub/' + item.id);
            },
            searchResource() {
                let _self = this;
                this.$store.dispatch('setSearchValue', {
                    type: 1,
                    value: this.needParam.keyWord
                }).then(() => {
                    _self.$store.dispatch('getNeedAllList', {
                        body: {
                            biz_module: 'intentionService',
                            biz_method: 'queryBegBuyList',
                            biz_param: _self.needParam
                        },
                        path: common.urlCommon + common.apiUrl.most
                    }).then((res) => {
                        if (res.biz_result.list.length === 0) {
                            _self.$message({
                                message: '未搜索到相关信息',
                                type: 'info'
                            });
                            _self.$router.push('/need');
                        } else {
                            _self.$router.push('/need');
                        }
                    })
                }, () => {});
            },
            getNeed() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'queryBegBuyList',
                    biz_param: {
                        sort: {
                            "offer": "0",
                            "duedate": "0",
                            "shelve_time": "0"
                        },
                        location: '',
                        keyWord: '',
                        pn: 1,
                        pSize: 5
                    }
                }).then(function(suc) {
                    _self.list[0].list = suc.biz_result.list;
                    _self.$store.dispatch('needList', _self.list[0].list);
                }).catch(function(err) {})
            },
            getResource() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'querySupplyList',
                    biz_param: {
                        sort: {
                            "shelve_time": "0",
                            "price": "0"
                        },
                        location: [],
                        sampling: -1,
                        pn: 1,
                        pSize: 15
                    }
                }).then(function(suc) {
                    _self.list[1].list = suc.biz_result.list;
                    _self.$store.dispatch('resourceList', _self.list[1].list);
                }).catch(function(err) {

                })
            },
            //输入框关键字跳转到资源专区
            search() {
                let httpParam = {
                    sort: {
                        "offer": "0",
                        "duedate": "0",
                        "shelve_time": "0"
                    },
                    location: [],
                    keyWord: this.breedName,
                    pn: 1,
                    pSize: 10,
                    spec: ''
                };
                debugger;
                let _self = this;
                this.fullscreenLoading = true;
                let url = common.urlCommon + common.apiUrl.most;
                if (common.SID) url = common.addSID(url);
                this.$store.dispatch('getNeedAllList', {
                    body: {
                        biz_module: 'intentionService',
                        biz_method: 'queryBegBuyList',
                        biz_param: httpParam
                    },
                    path: url
                }).then(() => {
                    this.$store.dispatch('setSearchValue', {
                        type: 1,
                        value: this.breedName
                    })
                    _self.fullscreenLoading = false;
                    this.$router.push('/need');
                }, () => {
                    _self.fullscreenLoading = false;
                });
            },
            handleSelect(val) {
                this.search();
            },
            querySearchAsync(queryString, cb) {
                let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
                if (!pattern.test(queryString)) {
                    cb([{
                        value: '请输入关键字',
                        keyWord: ''
                    }]);
                    return;
                };
                let _self = this;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    common.commonPost(common.urlCommon + common.apiUrl.most, {
                        biz_module: 'searchKeywordService',
                        biz_method: 'querySearchKeywordBreed',
                        biz_param: {
                            keyWord: queryString,
                            pn: 1,
                            pSize: 20
                        }
                    }).then(function(suc) {
                        let src = suc.biz_result.list;
                        for (var i = 0; i < src.length; i++) {
                            let obj = src[i];
                            obj.value = obj.breedName;
                            cb(suc.biz_result.list);
                        };
                    }).catch(function(err) {
                        cb([{
                            value: '请输入关键字',
                            keyWord: ''
                        }]);
                    });
                }, 300);
            },

        },
        mounted() {
            if (this.$store.state.search.needList.length === 0) {
                this.getNeed()
            } else {
                this.list[0].list = this.$store.state.search.needList;
            };
            if (this.$store.state.search.resourceList.length === 0) {
                this.getResource();
            } else {
                this.list[1].list = this.$store.state.search.resourceList;
            };
        }
}
</script>
