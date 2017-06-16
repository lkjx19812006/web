<style lang="less" scoped>
.foot_content {
    display: flex;
    flex-direction: column;
    min-height: 130px;
    background-color: #FBFAF6;
    border-top: 1px solid #eee;
    padding-top: 20px;
    div {
        flex: 1 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            font-size: 12px;
            color: #666;
        }
        .point_span {
            cursor: pointer;
        }
        .center_span {
            margin: 0 5px;
        }
        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            margin: 0;
        }
        ul li {
            margin: 0 5px;
        }
    }
}
</style>
<template>
    <div class="foot_content">
        <div>
            <span class="point_span" @click="jump('/aboutUsNew/about')">关于我们</span>
            <span class="center_span">|</span>
            <span class="point_span" @click="jump('/aboutUsNew/law/statement')">法律声明</span>
            <!-- <span class="center_span">|</span> -->
            <!-- <span class="point_span" @click="jump()">诚聘英才</span> -->
            <span class="center_span">|</span>
            <span class="point_span" @click="jump('/aboutUsNew/media/reports')">媒体报道</span>
            <!-- <span class="center_span">|</span> -->
            <!-- <span class="point_span" @click="jump()">友情链接</span> -->
            <span class="center_span">|</span>
            <span class="point_span" @click="jump('/aboutUsNew/help/helpRegister')">帮助中心</span>
        </div>
        <div>
            <span>COPYRIGHT © 药材买卖网 www.yaocaimaimai.com  沪ICP备15033212号-1</span>
        </div>
        <div>
            <ul>
                <li>
                    <a href="http://xinyong.360.cn/detail/yaocaimaimai.com" target="_blank"><img height=40 width=110 src="../assets/images/credit_platform.png" /></a>
                </li>
                <li>
                    <a target="_blank" href="http://si.trustutn.org/info?sn=700150814016500232166">
                        <img height=40 width=110 src="../assets/images/verified.png" />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="http://webscan.360.cn/index/checkwebsite/url/yaocaimaimai.com"><img height=40 width=110 src="../assets/images/safety_test.png" /></a>
                </li>
                <li>
                    <a target="_blank" href="http://www.12377.cn/"><img height=40 width=110 src="../assets/images/reporting_center.jpg" /></a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'foot-view',
    data() {
        return {
            isShowUserInfo: false
        }
    },
    methods: {
        jump(path) {
            // let _self = this;
            // switch (path) {
            //     case 'about':
            //         _self.$store.dispatch('getNewsIndex','1');
            //         _self.$store.dispatch('changeIndex',0)
            //         break;
            //     case 'law':
            //         _self.$store.dispatch('changeIndex',1);
            //         break;
            //     case 'contact':
            //         _self.$store.dispatch('changeIndex',2);
            //         break;
            //     case 'help':
            //         _self.$store.dispatch('changeIndex',3);
            //         break;
            // }
            //var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            // document.body.scrollTop = 0;  
            if (document.documentElement.scrollTop) document.documentElement.scrollTop = 0;
            if (window.pageYOffset) window.pageYOffset = 0;
            if (document.body.scrollTop) document.body.scrollTop = 0;
            this.$router.push(path);
        }
    }
}
</script>
