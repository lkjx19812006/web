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
                    <li class="item active">资源发布</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <offerPub></offerPub>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import headerView from '../../components/header.vue'
import footerView from '../../components/foot.vue'
import offerPub from '../../components/resourcePub/offerPub.vue'
export default {
    name: 'resourcePub-view',
    data() {
        return {
            myResource: true
        }
    },
    components: {
        headerView,
        footerView,
        offerPub
    },
    computed: {
        user() {
            return this.$store.state.user.user
        }
    },
    methods: {}
}
</script>
