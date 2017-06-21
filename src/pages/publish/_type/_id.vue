<style lang="less" scoped>
@width : 1200px;
.publish {
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
    .top_nav {
        width: 100%;
        background-color: #FBFAF6;
        height: 60px;
        .nav_wrap {
            width: @width;
            margin: 0 auto;
            ul,
            li {
                margin: 0;
                padding: 0;
                list-style: none;
            }
            .items {}
            .item {
                float: left;
                font-size: 16px;
                line-height: 16px;
                padding: 21px 5px;
                color: #696768;
                border-bottom: 2px solid #FBFAF6;
                margin-right: 50px;
                cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #FA8234;
                color: #FA8234;
            }
        }
    }
    .content {
        width: @width;
        margin: 0 auto;
        margin-top: 40px;
    }
}
</style>
<template>
    <div class="publish">
        <headerView tab="0"></headerView>
        <div class="top_nav">
            <div class="nav_wrap">
                <ul class="items">
                    <li @click="linkTo(item.type)" class="item" :class="{'active':item.type === type}" v-for=" item in navs">{{item.title}}</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <offerResource v-on:showLoad="showLoad" v-if="type === 'resource'"></offerResource>
            <offerNeedNew v-on:showLoad="showLoad" v-if="type === 'need'"></offerNeedNew>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../../../common/httpService.js'
import headerView from '../../../components/header.vue'
import footerView from '../../../components/foot.vue'
import offerResource from '../../../components/publish/offerResource.vue'
import offerNeedNew from '../../../components/publish/offerNeedNew.vue'
let navs = [{
    title: '资源发布',
    type: 'resource'
}, {
    title: '求购发布',
    type: 'need'
}]
export default {
    name: 'resource-view',
    data() {
        return {
            navs: navs
        }
    },
    components: {
        headerView,
        footerView,
        offerResource,
        offerNeedNew
    },
    computed: {
        type() {
            return this.$route.params.type;
        },
        user() {
            return this.$store.state.user.user
        }
    },
    mounted() {
        if (this.$route.params.type === 'need' && this.$store.state.search.cityList.length === 0) {
            this.getCity();
        }
    },
    methods: {
        linkTo(type) {
            this.$router.push('/publish/' + type)
        },
        showLoad(params) {
            console.log(params);
        },
        getCity() {
            function sortArr(item) {
                item.label = item.cname;
                // item.value = item.cname;
                item.value = item.id;
                if (item.childList.length > 0) item.children = item.childList;
                if (item.childList.length > 0) item.children.forEach(function(childItem) {
                    sortArr(childItem);
                })
            }
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'locationService',
                biz_method: 'queryLocationList',
                biz_param: {}
            }).then(function(suc) {
                suc.biz_result.list.forEach(function(item) {
                    sortArr(item);
                });
                _self.$store.dispatch('sch_getCityList', suc.biz_result.list);
            }).catch(function(err) {
                _self.$store.dispatch('sch_getCityList', []);
            })
        },
    }
}
</script>
