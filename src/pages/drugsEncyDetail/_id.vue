<style lang="less" scoped>
@width : 1200px;
.drugsEncy {
    .drugsEncy_body {
        min-height: 650px;
        margin: 0 auto;
        padding-top: 40px;
        padding-bottom: 36px;
        width: @width;
        .text_content {
            width: 833px;
            float: left;
            heigth: 100px;
            border: 1px solid #dcdcdc;
            .tab {
                border-bottom: 1px solid #dcdcdc;
                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    height: 50px;
                    line-height: 50px;
                }
                li {
                    float: left;
                    height: 50px;
                    padding: 0 20px;
                    font: 16px '微软雅黑';
                    color: #333333;
                    line-height: 50px;
                    cursor: pointer;
                }
                .active {
                    background-color: #fabb35;
                    color: #fff;
                }
            }
            .content {
                padding: 0 25px;
                margin-bottom: 50px;
                .title {
                    margin-bottom: 30px;
                    h2 {
                        margin: 0;
                        font: 30px '微软雅黑';
                        font-weight: 700;
                        line-height: 30px;
                        padding: 30px 5px;
                        color: #000000;
                    }
                    p,
                    .tit_P,
                    .alias_p {
                        margin: 0;
                        font: 14px '微软雅黑';
                        line-height: 40px;
                        color: #666666;
                        font-weight: 400;
                        padding: 10px 5px;
                        border-bottom: 1px dashed #dcdcdc;
                    }
                    .txt_p {
                        line-height: 18px;
                    }
                }
                .content_txt {
                    .items {
                        h3 {
                            padding: 15px 0;
                            margin: 0;
                            position: relative;
                            span {
                                position: absolute;
                                left: 0;
                                top: 16px;
                                height: 22px;
                                display: inline-block;
                                border-left: 7px solid #fa8435;
                            }
                            font: 22px '微软雅黑';
                            line-height: 22px;
                            text-indent: 15px;
                            border-bottom: 1px solid #DCDCDC;
                        }                      
                        .top_txt,
                        p {
                            font: 14px '微软雅黑';
                            color: #333333;
                            line-height: 35px;
                        }
                    }
                }
            }
        }
        .img_wrap {
            width: 330px;
            float: right;
            border: 1px solid #c7c7c7;
            img {
                margin: 0;
                width: 100%;
                border: none;
                vertical-align: middle;
            }
        }
    }
}
</style>
<template>
    <div class="drugsEncy">
        <headerView tab='6'></headerView>
        <div class="drugsEncy_body">
            <div class="text_content">
                <div class="tab">
                    <ul>
                        <li v-for="(item, index) in tab" v-on:click="trgger(index)" :class="{'active': showTab === index}">{{item.title}}</li>
                    </ul>
                </div>
                <div class="content">
                    <div class="title">
                        <h2>{{hotInfo.herbName}}</h2>
                        <p class="latin_text">
                            <span>英文名称:&nbsp;{{hotInfo.eName}}</span>
                            </br>
                            <span>拼音:&nbsp;{{hotInfo.pinyin}}</span>
                        </p>
                        <div class="alias_p">
                            <div class="txt_p" v-html="hotInfo.alias"></div>
                        </div>
                    </div>
                    <div class="content_txt">
                        <div class="items" v-show="showTab === 0">
                            <div class="item">
                                <div class="top_tit">
                                    <h3><span></span>概述</h3>
                                    <div class="top_txt" v-html="hotInfo.summary"></div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="top_tit">
                                    <h3><span></span>产地分布</h3>
                                    <div class="top_txt" v-html="hotInfo.producingArea"></div>
                                </div>
                            </div>
                        </div>
                        <div class="items" v-show="showTab === 1">
                            <div class="item">
                                <div class="top_tit">
                                    <h3><span></span>药材特性</h3>
                                    <div class="top_txt" v-html="hotInfo.morphology"></div>
                                </div>
                            </div>
                        </div>
                        <div class="items" v-show="showTab === 2">
                            <div class="item">
                                <div class="top_tit">
                                    <h3><span></span>鉴别真伪</h3>
                                    <div class="top_txt" v-html="hotInfo.identify"></div>
                                </div>
                            </div>
                        </div>
                        <div class="items" v-show="showTab === 3">
                            <div class="item">
                                <div class="top_tit">
                                    <h3><span></span>药典标准</h3>
                                    <div class="top_txt" v-html="hotInfo.standard"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="img_wrap" v-show="hotInfo.icon">
                <img :src="hotInfo.icon">
            </div>
            <div style="width: 100%; clear: both"></div>
        </div>
        <div class="foot">
            <footerView></footerView>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import headerView from '../../components/header.vue'
import footerView from '../../components/foot.vue'
let tab = [{
    title: '基本信息',
}, {
    title: '药材特性',
}, {
    title: '真伪辨别',
}, {
    title: '药典标准',
}]

export default {
    data() {
            return {
                breedName: '',
                tab: tab,
                showTab: 0,
                hotInfo: {
                    default: null
                }
            }
        },
        watch: {
            '$route' (newVal, oldVal) {
                this.getHotInfo(this.$route.params.id);
            }
        },
        components: {
            headerView,
            footerView,
        },
        methods: {
            trgger(index) {
                this.showTab = index;
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
                    console.log(suc.biz_result);
                    _self.hotInfo = suc.biz_result;
                }).catch(function(err) {

                })
            },
        },
        mounted() {
            if (this.$store.state.search.drugsEnyc.id == undefined) {
                this.getHotInfo(this.$route.params.id);
            } else {
                this.hotInfo = this.$store.state.search.drugsEnyc;
            }
        }
}
</script>
