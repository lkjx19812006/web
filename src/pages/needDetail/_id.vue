<style lang="less" scoped>
.need_detail {
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
    .need_detail_content {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1 0 auto;
        .intention_detail {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 1200px;
            .need_title {
                width: 100%;
                font-size: 20px;
                color: #666;
                border-bottom: 1px solid #eee;
                padding: 20px 0;
                margin-bottom: 20px;
                .title_bottom_span {
                    border-bottom: 2px solid #FA8435;
                    padding-bottom: 20px;
                }
            }
            .detail {
                flex: 1 0 auto;
                width: 100%;
                .need_detail_left {
                    flex: 1 1 auto;
                    display: flex;
                    flex-direction: column;
                    margin-right: 40px;
                    .title {
                        font-size: 20px;
                        color: #343434;
                        padding: 20px 0;
                        .dis_span {
                            font-size: 16px;
                            color: #666;
                            margin-left: 30px;
                        }
                    }
                    .detail {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        font-size: 16px;
                        color: #666;
                        div {
                            padding: 20px 40px 20px 0;
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
                    .special {
                        display: flex;
                        flex-direction: row;
                        width: 80%;
                        div {
                            padding: 15px 0;
                        }
                        .item {
                            flex: 1;
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="need_detail" v-loading.fullscreen.lock="fullscreenLoading">
        <headerView tab="2"></headerView>
        <div class="need_detail_content">
            <div class="intention_detail">
                <div class="need_title"><span class="title_bottom_span">采购需求</span></div>
                <div class="detail">
                    <div class="need_detail_left">
                        <div class="title">
                            <span>{{intention.breedName}}{{intention.number}}{{intention.unit}}</span>
                            <span class="dis_span">已报价人数:<span class="orange_span">{{intention.offer}}</span>人</span>
                        </div>
                        <div class="detail special">
                            <div v-show='intention.pubdate' class='item'>发布时间：{{intention.pubdate | formatBirth}}</div>
                            <div class='item'>规格：{{intention.spec}}</div>
                            <div class='item'>产地：{{intention.location}}</div>
                            <!-- <div>交货地：{{intention.address}}</div> -->
                        </div>
                        <div class='detail special'>
                            <div>品质要求：{{intention.quality}}</div>
                        </div>
                        <div class='detail special'>
                            <div class="image">
                                <div>专属交易员：{{intention.employeeName}}</div>
                                <div class="distance">|</div>
                                <img src="../../assets/images/phone-green.png">
                                <div>{{intention.employeeMobil}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="intention_detail">
                <div class="need_title"><span class="title_bottom_span">我要报价</span></div>
                <offerView :breed="intention" :unitInfo="unitInfo" v-on:showLoad="showLoad" :placeOptions="placeOptions" :specOptions="specOptions"></offerView>
            </div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import headerView from '../../components/header.vue'
import footerView from '../../components/foot.vue'
import offerView from '../../components/offer.vue'
export default {
    data() {
            return {
                intention: {

                },
                unitInfo: {
                    id: '',
                    list: []
                },
                placeOptions: [],
                specOptions: [],
                fullscreenLoading: false
            }
        },
        watch: {
            '$route' (newVal, oldVal) {
                console.log(newVal);
                this.gethttp(this.$route.params.id);
            }
        },
        computed: {
            user() {
                return this.$store.state.user.user
            }
        },
        components: {
            headerView,
            footerView,
            offerView,
        },
        methods: {
            showLoad(val) {
                this.fullscreenLoading = val;
            },
            gethttp(id) {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',
                    biz_param: {
                        id: id
                    }
                }).then(function(suc) {
                    if (suc.biz_result.id) {
                        _self.intention = suc.biz_result;
                        _self.getLocalSpecList(_self.intention.breedId);
                        _self.getUnit();
                    } else {
                        _self.$router.push("/need");
                    }
                }).catch(function(err) {})
            },
            getLocalSpecList(breedId) {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'queryLocalSpecList',
                    biz_param: {
                        breedId: breedId,
                        name: ''
                    }
                }).then(function(suc) {
                    _self.placeOptions = suc.biz_result.localList;
                    _self.specOptions = suc.biz_result.specList;
                }).catch(function(err) {})
            },
            getUnit() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'enumService',
                    biz_method: 'queryEnumList',
                    biz_param: {
                        type: 'MU'
                    }
                }).then(function(suc) {
                    for (var i = 0; i < suc.biz_result.list.length; i++) {
                        let obj = suc.biz_result.list[i];
                        obj.value = obj.id;
                        obj.itemName = '元/' + obj.name;
                        if (obj.name == _self.intention.unit) {
                            _self.unitInfo.id = obj.id;
                            break;
                        }
                    }
                    _self.unitInfo.list = suc.biz_result.list;
                    if (!_self.unitInfo.id) {
                        _self.unitInfo.id = _self.unitInfo.list[2].id;
                    }
                }).catch(function(err) {})
            },
        },
        created() {
            this.gethttp(this.$route.params.id);
        },
}
</script>
