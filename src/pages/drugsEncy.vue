<style lang="less" scoped>
@width : 1200px;
.drugsEncy {
    overflow-y: scroll;
    height: 100%;
    .drugsEncy_body {
        height: 710px;
        width: 732px;
        margin: 0 auto;
        .img_wrap {
            width: 732px;
            padding-top: 60px;
            padding-bottom: 22px;
            text-align: center;            
            img {
                border: 0 none;
                margin: 0 auto;
            }
        }
        .search_wrap {
            position: relative;
            i {
                font-size: 18px;
                position: absolute;
                left: 15px;
                top: 15px;
                color: #97A8BE;
            }
            .el-input__inner {
                height: 46px;
            }
        }
        .content_wrap {
            margin-top: 60px;
            height: 380px;
            width: 702px;
            border: 1px solid #ebebeb;
            padding: 15px;
            .items_wrap {
                float: left;
                height: 380px;
                width: 350px;
                position: relative;
                .content_item {
                    height: 380px;
                    width: 350px;
                }
                .icon_wrap {
                    a {
                        text-decoration: none;
                    }
                    width: 350px;
                    height: 380px;
                    overflow: hidden;
                    position: relative;
                    img {
                        width: 350px;
                        height: 270px;
                        border: 0 none;
                        vertical-align: middle;
                    }
                }
                .txt_wrap {
                    width: 100%;
                    postion: absolute;
                    left: 0;
                    bottom: 0;
                    h2 {
                        margin: 0;
                        font: 18px '微软雅黑';
                        font-weight: 700;
                        line-height: 18px;
                        padding: 6px 5px;
                        color: #000000;
                    }
                    p {
                        margin: 0;
                        font: 14px '微软雅黑';
                        color: #666666;
                        font-weight: 400;
                        padding: 6px 5px;
                    }
                }
            }
            .hot_drugs {
                width: 330px;
                float: right;
                h3 {
                    font: 16px '微软雅黑';
                    color: #fa8435;
                    margin: 0;
                    padding: 12px 5px;
                    border-bottom: 1px solid #d1d1d1;
                }
                .hot_txt {
                    .items {
                        padding: 0;
                        list-style-type: none;
                        overflow: hidden;
                    }
                    .item {
                        float: left;
                        font: 15px #666666;
                        border: 1px solid #ebebeb;
                        padding: 5px 10px;
                        margin-right: 22px;
                        margin-bottom: 24px;
                        color: #666666;
                        cursor: pointer;
                    }
                    .item:hover {
                        color: #fa8435;
                        border-color: #fa8435;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="drugsEncy">
        <headerView tab='6'></headerView>
        <div class="drugsEncy_body">
            <div class="img_wrap">
                <img src="../static/icon/yaocaibaik.png">
            </div>
            <div class="search_wrap">
                <el-autocomplete style="width: 100%;" v-model:value="breedName" :fetch-suggestions="querySearchAsync" placeholder="请输入你想要了解的药材" @select="handleSelect">
                    <template slot="append">
                        <div v-on:click="search">搜索</div>
                    </template>
                </el-autocomplete>
                <i class="el-icon-search"></i>
            </div>
            <div class="content_wrap">
                <div class="items_wrap">
                    <el-carousel indicator-position="none">
                        <el-carousel-item v-for="item in hotList" v-if="item.icon" :key="item">
                            <template scope="scope">
                                <div class="content_item">
                                    <div class="icon_wrap" @click="linkToBreed(item.name)">
                                        <img style="cursor: pointer;" :src="item.icon">
                                        <div class="txt_wrap">
                                            <h2>{{item.name}}</h2>
                                            <p class="english_text">英文名&nbsp;{{item.eName}}</p>
                                            <p class="latin_text">拉丁名&nbsp;{{item.lName}}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="hot_drugs">
                    <h3>热搜药材</h3>
                    <div class="hot_txt">
                        <ul class="items">
                            <li class="item" v-for="item in hotList" :key="item.name" @click="linkToBreed(item.name)">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <footerView></footerView>
        </div>
    </div>
</template>
<script>
import common from '../common/httpService.js'
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
export default {
    name: 'drugsEncy_view',
    data() {
        return {
            timeout: '',
            breedName: '',
            hotList: [],
        }
    },
    created() {

    },
    computed: {

    },
    components: {
        headerView,
        footerView,
    },
    methods: {
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
                _self.hotList = suc.biz_result.list;
            }).catch(function(err) {

            })
        },
        search() {
            if (this.breedName == '') {
                this.$message({
                    message: '请输入药材名称',
                    type: 'info'
                });
                return;
            }
            this.$store.dispatch('sch_clearDrugsEnycInfo');
            this.getHotInfo(this.breedName);
        },
        linkToBreed(params) {
            this.$store.dispatch('sch_clearDrugsEnycInfo');
            this.getHotInfo(params);
        },
        handleSelect(val) {
            this.$store.dispatch('sch_clearDrugsEnycInfo');
            this.getHotInfo(val.breedName);
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
                    cb([]);
                });
            }, 300);
        },
    },
    beforeMount() {
        this.getHot();
    }

}
</script>
