<style lang="less" scoped>
.honor {
    width: 1200px;
    margin: auto;
    .items {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 50px;
        margin-bottom: 50px;
        .item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 40px;
            .left_border {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-left: 1px solid #e3e3e3;
            }
            .right_content {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding-left: 24px;
                align-items: flex-start;
                span {
                    font-size: 25px;
                    color: #033333;
                    line-height: 40px;
                    margin-bottom: 15px;
                }
                img {
                    flex: 0 0 auto;
                }
            }
        }
    }
}
</style>
<template>
    <div class="honor">
        <titleView :title="title"></titleView>
        <div class="items">
            <div class="item">
                <div class="left_border">
                    <img src="../../../static/icon/6-1.png" width="38">
                </div>
                <div class="right_content">
                    <span>药材买卖网荣登2017年中国大宗商品电商百强企业</span>
                    <img src="../../../static/icon/img6-1.png" height="300" width="1114">
                </div>
            </div>
            <div class="item">
                <div class="left_border">
                    <img src="../../../static/icon/6-1.png" width="38">
                </div>
                <div class="right_content">
                    <span>药材买卖网创始人兼CEO郭冕当选“2016-2017创新领军者 创新风云人物”</span>
                    <img src="../../../static/icon/img6-2.png" height="300">
                </div>
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
                    enTitle: 'ENTERPRISE HONOR',
                    zhTitle: '企业荣誉'
                },
            }
        },
        components: {
            titleView
        }
}
</script>
