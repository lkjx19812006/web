<style lang="less" scoped>
.initiator {
    width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 100px;
    .content_wrap {
        margin-top: 42px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background-color: #F9F9F9;
        border: 1px solid #F9F9F9;
        padding: 30px 40px;
        align-items: center;
        .item {
        	padding-left: 40px;
            .name_wrap {
                padding-left: 20px;
            }
            .name {
                font-size: 25px;
                color: #000;
                margin-right: 24px;
            }
            .position {
                font-size: 18px;
                color: #666;
            }
            ul {
                li {
                    line-height: 34px;
                    font-size: 16px;
                    color: #666;
                }
                .other_info {
                    margin-top: 30px;
                }
            }
        }
    }
    .content_wrap:hover {
        border-color: #fa8435;
    }
}
</style>
<template>
    <div class="initiator">
        <titleView :title="title"></titleView>
        <div class="content_wrap">
            <div class="img_wrap">
                <img src="../../../static/icon/initiator1.png" height="246" width="246">
            </div>
            <div class="item">
                <div class="name_wrap">
                    <span class="name">郭冕</span>
                    <span class="position">创始人</span>
                </div>
                <ul>
                    <li>14年营销及管理经验</li>
                    <li>上海钢联最年轻高管带300人团队（副总）</li>
                    <li>找钢网年轻高管，负责交易中心工作（副总）</li>
                    <li>南京医药旗下电商交易平台运营高管</li>
                    <li class="other_info">大宗商品电商领域付费专家</li>
                    <li>凯盛、BCC一、二级市场DD首席专家</li>
                </ul>
            </div>
        </div>
        <div class="content_wrap">
            <div class="img_wrap">
                <img src="../../../static/icon/initiator2.png" height="246" width="246">
            </div>
            <div class="item">
                <div class="name_wrap">
                    <span class="name">于莎莎</span>
                    <span class="position">联合创始人</span>
                </div>
                <ul>
                    <li>12年国内国际市场销售经验</li>
                    <li>5年大宗商品上游供应链经验</li>
                    <li>淡水河谷、力拓、FMG铁矿石国内代理</li>
                    <li>5年食品、原材料进出口经验</li>
                    <li>水果电商平台供应链合伙人</li>
                    <li class="other_info">英语母语水平</li>
                    <li>外籍团队跨多国管理</li>
                </ul>
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
                    enTitle: 'LEADERSHIP',
                    zhTitle: '创始团队'
                }
            }
        },
        components: {
            titleView,
        }
}
</script>
