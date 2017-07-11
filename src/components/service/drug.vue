<style lang="less" scoped>
.service_drug_compent {
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
            flex-direction: row;
            flex-wrap: wrap;
            width: 300px;
            justify-content: flex-start;
            span {
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
    <div class="service_drug_compent">
        <div class="input_search">
            <search v-model="breedName" placeholder="请输入查询的药材名称" v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></search>
            <el-button icon="search" size="middle" class="orange_button search_button" v-on:click="linkTo"></el-button>
        </div>
        <div class="breed_table">
            <router-link :to="drugs.link">
                <p>{{drugs.title}}</p>
            </router-link>
            <div class="bread_detail">
                <span v-for="subItem in drugs.list" @click="linkToBreed(subItem.name)">                  
                    {{subItem.name}}                                
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import search from '../../components/search.vue'
export default {
    name: 'service_drug_view',
    data() {
        return {
            breedName: '',
            drugs: {
                title: '药材百科',
                link: '/drugsEncy',
                infoLink: '/drugsEncyDetail',
                list: []
            },
        }
    },
    computed: {

    },
    components: {
        search
    },
    methods: {
        getDrug() {
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'breedService',
                biz_method: 'webHerbDetail',
                biz_param: {
                    pn: 1,
                    pSize: 1
                }
            }).then(function(suc) {
                _self.bread = suc.biz_result.list[0];
                _self.$store.dispatch('drugList', _self.bread);
                console.log(_self.bread)
            }).catch(function(err) {

            })
        },
        getHot() {
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'breedService',
                biz_method: 'hotDrugPropertiesInfo',
                biz_param: {
                    pn: 1,
                    pSize: 20
                }
            }).then(function(suc) {
                _self.drugs.list = suc.biz_result.list;
                _self.$store.dispatch('HotList', _self._self.drugs.list);
            }).catch(function(err) {

            })
        },
        linkTo() {
            if (this.breedName) {
                this.$store.dispatch('sch_clearDrugsEnycInfo');
                this.getHotInfo(this.breedName);
            }
        },
        linkToBreed(params) {
            this.$store.dispatch('sch_clearDrugsEnycInfo');
            this.getHotInfo(params);
        },
        handleSelect(val) {
            this.$store.dispatch('sch_clearDrugsEnycInfo');
            this.getHotInfo(val.breedName);
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
        getHotInfo(params) {
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'breedService',
                biz_method: 'queryDrugPropertiesInfo',
                biz_param: {
                    herbName: params
                }
            }).then(function(suc) {
                _self.$store.dispatch('sch_getDrugsEnycInfo', suc.biz_result).then(() => {
                    _self.$router.push('/drugsEncyDetail/' + params);
                })
            }).catch(function(err) {

            })
        },
    },
    mounted() {
        if (this.$store.state.search.drugList.length === 0) {
            this.getDrug();
        } else {
            this.bread = this.$store.state.search.drugList;
        };
        if (this.$store.state.search.HotList.length === 0) {
            this.getHot();
        } else {
            this.drugs.list = this.$store.state.search.HotList;
        };

    }
}
</script>
