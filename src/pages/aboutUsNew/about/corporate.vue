<style lang="less" scoped>
.corporate {
    width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .items {
        margin: 40px 0;
        margin-bottom: 60px;
        .item {
            margin-bottom: 40px;
            background: url('../../../static/icon/bgc5-1.png') no-repeat center;
            width: 1200px;
            height: 287px;
            position: relative;
            .content {
                font-size: 18px;
                color: #555;
                position: absolute;
                left: 340px;
                top: 205px;
            }
            .content_right {
            	left: 225px;
            }
        }
        .item_2 {
            background: url('../../../static/icon/bgc5-2.png')
        }
        .item_3 {
            background: url('../../../static/icon/bgc5-3.png')
        }
    }
}
</style>
<template>
    <div class="corporate">
        <titleView :title="title"></titleView>
        <div class="items">
            <div class="item">
                <span class="content">把自己心灵里的一切清空, 把已经拥有的一切剥除, 一切归于零</span>
            </div>
            <div class="item item_2">
                <span class="content content_right">聚焦工作重点，而前提在于明确工作重点，知道什么是核心工作，应该向哪个方向用力</span>
            </div>
            <div class="item item_3">
                <span class="content">不断在工作的过程经历各种洗礼和磨练，总结收获，自己就会获得全方位的提升，像凤凰一样涅槃重生</span>
            </div>
        </div>
    </div>
</template>
<script>
import titleView from '../../../components/about/title.vue'
export default {
    data() {
            return {
                title: {
                    enTitle: 'CORPORATE CULTURE',
                    zhTitle: '企业文化'
                },
            }

        },
        components: {
            titleView
        }
}
</script>
