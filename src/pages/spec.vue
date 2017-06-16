<style lang="less" scoped>
.spec_body {
    ul,
    li {
        list-style: none;
    }
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    li {
        padding: 0;
        margin: 0;
    }
    .nav {
        background-color: #FBFBF6;
        margin-bottom: 35px;
        .nav_wrap {
            width: 1200px;
            margin: auto;
            height: 60px;
            overflow: hidden;
            li {
                float: left;
                margin-right: 40px;
                font-size: 16px;
                color: #666666;
                line-height: 58px;
                border-bottom: 2px solid #fff;
                cursor: pointer;
            }
            .nav_active {
                border-bottom-color: #F98535;
                color: #F98535;
            }
        }
    }
    .content_item {
        width: 1200px;
        margin: auto;
        margin-top: 40px;
        .banner_left {
            height: 366px;
            width: 788px;
            overflow: hidden;
            text-align: center;
            line-height: 366px;
            img {
                vertical-align: middle;
            }
            float: left;
        }
        .banner_right {
            float: left;
            margin-left: 46px;
            .title {
                font-size: 20px;
                color: #000;
                margin-bottom: 24px;
            }
            .content {
                height: 115px;
                width: 366px;
                .img_wrap {
                    height: 115px;
                    width: 152px;
                    overflow: hidden;
                    text-align: center;
                    line-height: 115px;
                    img {
                        vertical-align: middle;
                    }
                    float: left;
                }
                .txt_wrap {
                    padding-top: 18px;
                    padding-left: 168px;
                    .title {
                        font-size: 20px;
                        color: #000;
                    }
                    p {
                        font-size: 14px;
                        color: #999999;
                    }
                }
            }
        }
    }
    .info_title {
        padding-top: 45px;
        .title {
            h2 {
                font-size: 32px;
                color: #000;
                font-weight: 400;
            }
            .content {
                width: 788px;
                font-size: 20px;
                color: #999999;
                padding: 15px 0;
                border-bottom: 1px solid #e9e6e7;
            }
        }
    }
    .info_content {
        width: 788px;
        margin-bottom: 60px;
        .info_item {
            margin-top: 30px;
            padding-bottom: 20px;
            h3 {
                font-size: 30px;
                color: #000000;
            }
            p {
                line-height: 40px;
                font-size: 20px;
                color: #333333;
            }
        }
    }
}
</style>
<template>
    <div class="spec_body">
        <headerView tab="0"></headerView>
        <div class="content_item">
            <div class="banner">
                <div class="banner_left">
                    <img src="../static/icon/pic.png">
                </div>
                <div class="banner_right" @click="linkTo">
                    <div class="title">
                        同类推荐
                    </div>
                    <div class="content">
                        <div class="img_wrap">
                            <img src="../static/icon/picBig.png">
                        </div>
                        <div class="txt_wrap">
                            <div class="title">
                                五大药市子公司，盛大开业
                            </div>
                            <p>发布时间：2017-05-18</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; height: 0; clear: both">
                </div>
            </div>
            <div class="info_title">
                <div class="title">
                    <h2>平台四大优势，追求共赢</h2>
                    <!--  <div class="content">
                        <span>发布者：</span><span style="color: #fda865">药材买卖网</span>&nbsp;|
                        <span>发布时间：2017-05-20</span>&nbsp;|
                        <span>阅读次数：72</span>
                    </div> -->
                </div>
            </div>
            <ul class="info_content">
                <li class="info_item" v-for="item in items">
                    <h3>{{item.title}}</h3>
                    <p>{{item.info}}</p>
                </li>
            </ul>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
let items = [{
    title: '快',
    info: '药材买卖网力图打掉中间商，直接对接买方卖方，减少中间环节，大幅提升行业流转效率',
}, {
    title: '全',
    info: '打通国内外药材市场，提供丰富的品类选择权，解决下游采购品种多但单一供应商无法提供的需求',
}, {
    title: '好',
    info: '药材买卖网通过产地资源优势，结合第三方质检，严格把控药材质量，建立行业标准，解决品质问题',
}, {
    title: '省',
    info: '药材每一层流通均会加价5-10%，药材买卖网直接打通药材上下游，真正让供应商和需求方获利',
}]
export default {
    name: 'info-view',
    data() {
        return {
            items: items
        }
    },
    components: {
        headerView,
        footerView
    },
    methods: {
        linkTo() {
            this.$router.push('/filiale');
        }
    }
}
</script>
