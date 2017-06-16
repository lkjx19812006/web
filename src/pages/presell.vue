<style lang="less" scoped>
@width : 1200px;
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
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .body_content {
            width: 1200px;
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            .presell_body {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 20px 0;
            }
            .page {
                padding: 20px 0;
                text-align: center;
            }
        }
    }
}
</style>
<template>
    <div class="content_body" v-loading.fullscreen.lock="fullscreenLoading">
        <headerView tab="4"></headerView>
        <div class="content">
            <div class="body_content">
                <needTextCondition :httpParam="httpParam" v-on:getData="getHttp"></needTextCondition>
                <div class="presell_body">
                    <presellItem :item="presellList"></presellItem>
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
import needTextCondition from '../components/presell/presellTextCondition.vue'
import presellItem from '../components/presell/presellItem.vue'
let httpParam = {
    pn: 1,
    pSize: 15,
    country: '',
    breedName: '',
    spec: '',
    arriveTime: 0
}
export default {
    name: 'presell-view',
    data() {
        return {
            httpParam: httpParam,
            fullscreenLoading: false
        }
    },
    components: {
        headerView,
        footerView,
        needTextCondition,
        presellItem
    },
    computed: {
        presellList() {
            console.log(this.$store.state.preSale.presellList.list);
            return this.$store.state.preSale.presellList.list
        },
        total() {
            return this.$store.state.preSale.presellList.total
        }
    },
    mounted() {
        httpParam.country = '';
        httpParam.breedName = '';
        httpParam.spec = '';
        httpParam.arriveTime = 0
        if (this.$store.state.preSale.presellList.list.length == 0) {
            this.getHttp();
        }
        this.httpParam.pn = 1;
        if (this.$store.state.search.countryList.length === 0) {
            this.getCountryList()
        }
    },
    methods: {
        getHttp(params) {
            if (params && params.type === 'presell') {
                this.httpParam.pn = params.pn;
            };
            let _self = this;
            this.fullscreenLoading = true;
            this.$store.dispatch('getPresellList', {
                body: {
                    biz_module: 'intentionService',
                    biz_method: 'preSellList',
                    biz_param: _self.httpParam
                },
                path: common.urlCommon + common.apiUrl.most
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
        getCountryList() {
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'locationService',
                biz_method: 'queryLocationCountry',
                biz_param: {}
            }).then(function(suc) {
                _self.$store.dispatch('sch_getCountryList', suc.biz_result.list);
            }).catch(function(err) {

            });
        }
    }
}
</script>
