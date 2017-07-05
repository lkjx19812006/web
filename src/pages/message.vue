<style lang="less" scoped>
.message {
    .content {
        min-height: 650px;
        width: 1200px;
        margin: auto;
        background-color: #fff;
        margin-top: 46px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .left_slide {
            margin-right: 32px;
        }
        .right_content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
<template>
    <div class="message">
        <headerView :title="title"></headerView>
        <div class="content">
            <div class="left_slide">
                <slideNav :navData="navs"></slideNav>
            </div>
            <div class="right_content">
                <div class="top_slide">
                    <topSlide :navData="navs"></topSlide>
                </div>
                <div class="list_content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
import slideNav from '../components/message/slideNav.vue'
import topSlide from '../components/message/topSlide.vue'
import httpService from '../common/httpService.js'
let navs = [{
    title: '意向消息',
    link: '/message/intention',
    index: 0,
    total: 0,
    type: 1
}, {
    title: '报价消息',
    link: '/message/offer',
    index: 1,
    total: 0,
    type: 4
}, {
    title: '订单消息',
    link: '/message/order',
    index: 2,
    total: 0,
    type: 3
}, {
    title: '活动消息',
    link: '/message/activity',
    index: 3,
    total: 0,
    type: 2
}]
export default {
    data() {
            return {
                title: '消息中心',
                navs: navs
            }
        },
        components: {
            headerView,
            footerView,
            slideNav,
            topSlide
        },
        created() {
            this.getMessageType();
        },
        methods: {
            //获取消息类型 列表
            getMessageType() {
                let url = httpService.urlCommon + httpService.apiUrl.most
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'pushMessageList'
                }
                url = httpService.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getMessageType', {
                    body: body,
                    path: url
                }).then(() => {}, () => {})
            }
        }
}
</script>
