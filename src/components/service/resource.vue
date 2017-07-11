<style lang="less" scoped>
.service_resource_compent {
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
        padding-bottom: 20px;
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
            flex: 0 0 auto;
            width: 300px;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            span {
                flex: 0 0 auto;
                text-decoration: none;
                font-size: 14px;
                padding: 5px 10px 0 0;
                cursor: pointer;
                color: #7F7F7F;
            }
            span:hover {
                color: #FA8435;
                cursor: pointer;
            }
        }
    }
    .breed_table_bottom {
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>
<template>
    <div class="service_resource_compent">
        <div class="input_search">
            <search v-model="breedName" placeholder="请输入查询的药材名称" v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></search>
            <!-- <el-input v-model="breedName" placeholder="请输入查询的药材名称"></el-input> -->
            <el-button v-on:click="search" icon="search" size="middle" class="orange_button search_button"></el-button>
        </div>
        <div :class="[breedClass,{breed_table_bottom:index!=2}]" v-for="(item,index) in list">
            <router-link :to="item.link">
                <p>{{item.title}}</p>
            </router-link>
            <div class="bread_detail">
                <span v-for="subItem in item.list" @click="jump(item.infoLink + subItem.id)">
                    {{subItem.herbName}}{{subItem.breedName}} 
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import search from '../../components/search.vue'
export default {
    name: 'service_resource_view',
    data() {
        let _self = this;
        return {
            breedClass: 'breed_table',
            breedName: '',
            list: [{
                title: '立即采购',
                link: '/resource',
                infoLink: '/resourceDetail/',
                list: []
            }, {
                title: '预售专区',
                infoLink: '/presellDetail/',
                link: '/presell',
                list: []
            }]
        }
    },
    components: {
        search
    },
    mounted() {
        if (this.$store.state.search.resourceList.length === 0) {
            this.getResource();
        } else {
            this.list[0].list = this.$store.state.search.resourceList
        };
        if (this.$store.state.search.preSellList.length === 0) {
            this.getPreRes();
        } else {
            this.list[1].list = this.$store.state.search.preSellList
        };

    },
    methods: {
        jump(link) {
            if (link) this.$router.push(link);
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
                _self.list[0].list = suc.biz_result.list;
                _self.$store.dispatch('resourceList', _self.list[0].list);
            }).catch(function(err) {

            })
        },
        getPreRes() {
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'intentionService',
                biz_method: 'preSellList',
                biz_param: {
                    pn: 1,
                    pSize: 9
                }
            }).then(function(suc) {
                _self.list[1].list = suc.biz_result.list;
                _self.$store.dispatch('preSellList', _self.list[1].list);
            }).catch(function(err) {

            })
        },
        //输入框关键字跳转到资源专区
        search() {
            let httpParam = {
                sort: {
                    "shelve_time": "0",
                    "price": "0"
                },
                location: [],
                sampling: '-1',
                pn: 1,
                pSize: 10,
                spec: '',
                keyWord: this.breedName
            };
            let _self = this;
            let url = common.urlCommon + common.apiUrl.most;
            if (common.SID) url = common.addSID(url);
            this.fullscreenLoading = true;
            this.$store.dispatch('getResourceAllList', {
                body: {
                    biz_module: 'intentionService',
                    biz_method: 'querySupplyList',
                    biz_param: httpParam
                },
                path: url
            }).then(() => {
                this.$store.dispatch('setSearchValue', {
                    type: 0,
                    value: this.breedName
                })
                _self.fullscreenLoading = false;
                this.$router.push('/resource');
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

}
</script>
