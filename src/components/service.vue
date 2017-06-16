<style lang="less" scoped>
.service_components {
    .service_tab {
        border-top: 2px solid #FA8435;
        position: relative;
        .tab_content {
            position: absolute;
            right: 0;
            top: 0;
            margin-right: -400px;
            background-color: #FCFAF7;
            height: 100%;
            width: 400px;
            cursor: auto;
            overflow: hidden;
        }
    }
    .item {
        color: #fff;
        min-height: 99px;
        line-height: 99px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid #7E7269;
        .item_left {
            display: flex;
            align-items: center;
            div {
                margin-left: 5px;
            }
        }
    }
    .item_orange {
        background-color: #FA8435;
    }
}
</style>
<template>
    <div class="service_components" v-on:mouseenter="serviceShow()">
        <div class="service_tab">
            <div v-for="(item,index) in tabs" v-bind:class="[itemCss,{item_orange:index===tabIndex}]" v-on:mouseenter="show(index)">
                <div class="item_left">
                    <img :src="item.url">
                    <div>{{item.title}}</div>
                </div>
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="tab_content">
                <resourceView v-show="tabIndex===0"></resourceView>
                <needView v-show="tabIndex===1"></needView>
                <marketView v-show="tabIndex===2"></marketView>
                <drugView v-show="tabIndex===3"></drugView>
            </div>
        </div>
    </div>
</template>
<script>
import resourceView from './service/resource.vue'
import marketView from './service/market.vue'
import needView from './service/need.vue'
import drugView from './service/drug.vue'
export default {
    name: 'service_view',
    data() {
        return {
            itemCss: 'item',
            tabIndex: 0,
            tabs: [{
                title: '买药材',
                url: '/static/icon/buy-herbs.png'
            }, {
                title: '卖药材',
                url: '/static/icon/Selling-herbs.png'
            }, {
                title: '看行情',
                url: '/static/icon/Look-at-the-market.png'
            }, {
                title: '药材百科',
                url: '/static/icon/Check-the-drug--search.png'
            }]
        }
    },
    components: {
        drugView,
        marketView,
        needView,
        resourceView
    },
    methods: {
        serviceShow() {
            this.$emit('show');
        },
        show(index) {
            this.tabIndex = index;
        }
    }
}
</script>
