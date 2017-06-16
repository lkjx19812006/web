<style lang="less" scoped>
.info_body {
    ul,
    li {
        list-style: none;
    }
    .content_item {
        .banner {
            min-height: 473px;
            margin: auto;
            overflow: hidden;
            img {
                display: block;
                margin: auto;
                height: 100%;
                vertical-align: middle;
            }
        }
        .items {
            width: 1200px;
            margin: 0 auto;
            padding-bottom: 30px;
            .item {
                height: 360px;
                overflow: hidden;
                border-bottom: 1px solid #dbdbdb;
                .img_info {
                    width: 395px;
                    height: 360px;
                    line-height: 360px;
                    text-align: center;
                    img {
                        vertical-align: middle;
                    }
                }
                .text_content {
                    width: 805px;
                    overflow: hidden;
                }
                .text_wrap {
                    float: right;
                    width: 676px;
                    padding-top: 140px;
                    h3 {
                        font-family: '微软雅黑';
                        color: #E83437;
                        font-size: 35px;
                        font-weight: 400;
                        font-style: italic;
                        margin: 0;
                        padding: 0;
                        margin-bottom: 12px;
                    }
                    p {
                        font-size: 25px;
                        line-height: 30px;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }
                }
                .index_img {
                    float: left;
                    width: 129px;
                    height: 360px;
                    line-height: 360px;
                    img {
                        vertical-align: middle;
                    }
                }
            }
            .item_no_border {
                border: 0 none;
            }
            .odd {
                .img_info {
                    float: left;
                }
                .text_content {
                    float: right;
                    width: 745px;
                    padding-right: 60px;
                    .text_wrap {
                        width: 613px;
                    }
                }
            }
            .even {
                .img_info {
                    float: right;
                }
                .text_content {
                    padding: 0 60px;
                    width: 685px;
                    float: left;
                    .text_wrap {
                        width: 553px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="info_body">
        <headerView title="全新改版"></headerView>
        <div class="content_item">
            <div class="banner">
                <img src="../assets/images/infoBanner.png">
            </div>
            <ul class="items">
                <li class="item" :class="{'odd':(index+1)%2 != 0,'even':(index+1)%2 == 0, 'item_no_border': index === items.length - 1}" v-for="(item, index) in items">
                    <div class="img_info">
                        <img :src="item.img">
                    </div>
                    <div class="text_content">
                        <div class="index_img">
                            <img :src="item.indexImg">
                        </div>
                        <div class="text_wrap">
                            <h3>{{item.title}}</h3>
                            <p>{{item.info}}</p>
                        </div>
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
    title: '资源搜索更快捷',
    info: '更精准的搜索条件，帮您快速搜索到想要的资源',
    img: require('../assets/images/1.png'),
    indexImg: require('../assets/images/001.png')
}, {
    title: '药厂求购推不停',
    info: '快速发布药厂的求购信息，帮助快速匹配你手上的资源',
    img: require('../assets/images/2.png'),
    indexImg: require('../assets/images/002.png')
}, {
    title: '国际资源来抢购',
    info: '药材买卖网资源丰富，丰富的国际资源等你来抢购',
    img: require('../assets/images/3.png'),
    indexImg: require('../assets/images/003.png')
}, {
    title: '药材行情快狠准',
    info: '我们针对不同的类别，不同的药市做了精准的分类',
    img: require('../assets/images/4.png'),
    indexImg: require('../assets/images/004.png')
}, {
    title: '药材百科超专业',
    info: '我们有超全的药材百科，你想了解的药材信息，我们这里都有',
    img: require('../assets/images/5.png'),
    indexImg: require('../assets/images/005.png')
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
    }
}
</script>
