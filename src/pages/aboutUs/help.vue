<style scoped>
.help {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    float: left;
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
}

.help .left {
    float: left;
    width: 180px;
}

.help .right {
    float: left;
    flex: 1;
    padding-left: 36px;
    box-sizing: border-box;
    margin-bottom: 175px;
}

.help .right .title_box {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin-top: 45px;
}

.help .right .title {
    float: left;
    height: 47px;
    border-bottom: 1px solid #FA8435;
    font-size: 20px;
    color: #676767;
}

.help .right .step {
    float: left;
    font-size: 16px;
    color: #666;
    width: 100%;
}

.help .right .step .img {
    float: left;
    width: 100%;
}

.help .right .step .img img {
    width: 100%;
}
</style>
<template>
    <div class="help">
        <div class="left">
            <myNav v-on:selectIt="selectIt" :param="param"></myNav>
        </div>
        <div class="right" v-show="show == 1">
            <div class="title_box">
                <div class="title">注册流程</div>
            </div>
            <div class="step">
                <p>步骤一:打开药材买卖网网页，点击左上方免费注册</p>
                <div class="img">
                    <img src="../../static/icon/register.png">
                </div>
            </div>
            <div class="step">
                <p>步骤二:提交正确的信息，提交完成注册</p>
                <div class="img">
                    <img src="../../assets/images/zhuce2.jpg" height="800" width="980">
                </div>
            </div>
        </div>
        <div class="right" v-show="show == 2">
            <div class="title_box">
                <div class="title">如何找货</div>
            </div>
            <div class="step">
                <p>步骤一:打开药材买卖网网页，找到右手边的找货助手，填写需求委托药材买卖网帮你找货</p>
                <div class="img">
                    <img src="../../static/icon/find1.png">
                </div>
            </div>
            <div class="step">
                <p>步骤二:打开药材买卖网网页，找到LOGO右边的搜索栏或者热门服务里的卖药材搜索，输入您所需要的产品，点击搜索自主找货</p>
                <div class="img">
                   <img src="../../static/icon/find2.png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myNav from '../../components/common/myNav.vue';
export default {
    data() {
            return {
                arr: [{
                    title: '我们的地址',
                    content: '上海市虹口区宝隆一方大厦910室'
                }, {
                    title: '邮编',
                    content: '200437'
                }, {
                    title: '传真',
                    content: '021-33194522'
                }, {
                    title: '邮箱',
                    content: 'service@yaocaimaimai.com'
                }],
                param: {
                    title: '帮助中心',
                    first_item: '注册流程',
                    second_item: '如何找货'
                }
            }
        },
        computed: {
            show() {
                return this.$store.state.news.newIndex;
            }
        },
        components: {
            myNav
        },
        created() {
            let _self = this;
            _self.$store.dispatch('getNewsIndex', '1');
        },
        methods: {
            selectIt(index) {
                let _self = this;
                console.log('aa', index)
                _self.$store.dispatch('getNewsIndex', index);
            }
        }
}
</script>
