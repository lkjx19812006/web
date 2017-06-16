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
        margin-bottom: 90px;
        .info_item {
            padding-top: 30px;
            padding-bottom: 30px;
            border-bottom: 1px solid #e9e6e7;
            h3 {
                font-size: 25px;
                line-height: 55px;
                color: #e74000;
                font-weight: 400;
            }
            p {
                line-height: 45px;
                font-size: 20px;
                color: #666666;
            }
            div {
                height: 44px;
                line-height: 44px;
                padding-left: 40px;
                position: relative;
                font-size: 20px;
                color: #000;
                img {
                    vertical-align: middle;
                    position: absolute;
                    top: 7px;
                    left: 0;
                }
                .phone {
                    top: 8px;
                }
            }
        }
        .lastItem {
            padding-bottom: 0;
            border: 0 none;
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
                    <img src="../static/icon/piSon.png">
                </div>
                <div class="banner_right" @click="linkTo">
                    <div class="title">
                        相关推荐
                    </div>
                    <div class="content">
                        <div class="img_wrap">
                            <img src="../static/icon/pic2.png">
                        </div>
                        <div class="txt_wrap">
                            <div class="title">
                                平台四大优势，追求共赢
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
                    <h2>五大药市子公司，盛大开业</h2>
                    <!--  <div class="content">
                        <span>发布者：</span><span style="color: #fda865">药材买卖网</span>&nbsp;|
                        <span>发布时间：2017-05-20</span>&nbsp;|
                        <span>阅读次数：72</span>
                    </div> -->
                </div>
            </div>
            <ul class="info_content">
                <li class="info_item" v-for="(item, index) in items" :class="{'lastItem':index === items.length - 1}">
                    <h3>{{item.title}}</h3>
                    <p>{{item.info}}</p>
                    <div>
                        <img src="../static/icon/address.png">
                        <span>公司地址：</span>
                        <span>{{item.address}}</span>
                    </div>
                    <div>
                        <img class="phone" src="../static/icon/phone2.png">
                        <span>联系电话：</span>
                        <span>{{item.phone}}</span>
                    </div>
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
    title: '安国市东璧中药材经营有限公司',
    info: ' 药材买卖网总部全国化战略部署子公司之一在安国，其重要考虑是安国市场覆盖了内蒙、东北三省和河北的大部分药材品种，并且靠近北京、天津，是重要的销地。这样有利于我们更好的掌握一手资讯及优质药材，服务于客户。',
    address: '河北省安国市保衡北大街87号',
    phone: '0321-3510209'
}, {
    title: '玉林东璧中药材有限公司',
    info: ' 综合考虑，药材买卖网总部全国化战略部署子公司之一在玉林的原因是为了依靠专业市场 紧抓产地资源和进口香料货源。为了更好更快速的帮助企业找货、卖货。',
    address: '广西省玉林市中药港12#A11',
    phone: '0775-2820086'
}, {
    title: '成都市东璧本草中药材有限责任公司',
    info: '药材买卖网总部全国化战略部署子公司之一在成都，是看中了成都市场的药材品种繁多，需求量大两大优势，其目的也是在把控药材质量的前提下有效地客户多元化的需求。',
    address: '四川省成都市金牛区天回镇木龙湾社区四季天街第三幢239号',
    phone: '028-64206689'
}, {
    title: '定西市东璧本草中药材有限公司',
    info: '药材买卖网总部全国化战略部署子公司之一在甘肃首阳，其主要特点是该市场存在的三个优势即1品种具有代表性 2 资源相对集中  3种植面积成规模.',
    address: '定西市陇西县首阳镇药材市场8号楼19-20',
    phone: '0932-6636798'
}, {
    title: '药材买卖网毫州子公司',
    info: '',
    address: '公司位于谯城区，康美中药城东门E7栋132铺，',
    phone: '0558-5558150'
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
            this.$router.push('/spec');
        }
    }
}
</script>
