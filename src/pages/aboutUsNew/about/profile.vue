<style scoped lang="less">
.profile {
    width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;   
    p {
        text-indent: 2em;
        font-size: 16px;
        color: #666;
        padding: 0;
        margin: 0;
        line-height: 32px;
    }
    .imgIn_left {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 38px;
        margin-top: 30px;
        img {
            flex: 0 0 auto;
        }
        .txt_content {
            flex: 1;
            padding-left: 15px;
        }
    }
    .imgIn_right {
        img {
            float: right;
            padding-left: 15px;
        }
        padding-bottom: 65px;
    }
}
</style>
<template>
    <div class="profile">
        <titleView :title="title"></titleView>
        <div class="imgIn_left">
            <img src="../../../static/icon/about_profile1.png" height="356" width="423">
            <div class="txt_content">
                <p>药材买卖网2015年7月于上海成立，隶属于上海冕冠电子商务有限公司。是一家专门做中药材交易的电商平台，成立之初获得了知名天使投资人王刚（曾投资滴滴打车）近千万元人民币的投资。于2017年3月获得由上海健康医疗产业基金的2000万元人民币A轮融资。</p>
                <p>药材买卖网通过Saas和仓储物流体系，省去中间环节，为药材产业链中的客户提供一站式交易。在B2B的基础上，首推F2F模式，让农民和药商通过云端指尖把产品卖到全世界，旨在打造全球专业互联网药材交易平台，为产业链中的客户提供真实有效的一站式交易,是一个从农民到终端厂家的国内L型和国际L型双重结构的交易平台。</p>
                <p>目前药材买卖网平台上线了包括全草类、花类、果实籽仁类、根茎类等多个类目的近900种中药材，聚集了来自云南、广西、甘肃、贵州、四川、湖北、湖南、河南、安徽、山东、内蒙以及东北等多个地区的药农和合作社。 平台已经建立了一个专业的数据库，包含药材的图片、类别、等级、产地、学名、别名、英文名、拉丁语名等。</p>
            </div>
        </div>
        <div class="imgIn_right">
            <img src="../../../static/icon/about_profile2.png" height="284" width="591">
            <div class="txt_content">
                <p>而平台的采购方主要是国内的批发商和国外的饮片厂、药厂、中医院、食品饮料厂以及批发商，甚至亚马逊等电商平台的卖家。目前其合作的海外企业有来自美国、加拿大、哥伦比亚、迪拜、日本、韩国、法国、荷兰、比利时等40多个国家的上百家企业。</p>
                <p>通过一年多运营的时间里，平台已经汇集了近30万客户，交易量已达行业产量3%，药材买卖网已经成长为中药材电商行业中的翘楚。每天在药材买卖网平台上有数万家有库存的客户发布现货信息，约15000个买家群体经常使用药材买卖网平台搜寻现货或委托药材买卖网找货。药材买卖网已覆盖种植户9000+，合作社18000+，与142家药厂展开合作，客户涉及110多个地区，已成立亳州、安国、甘肃、成都、云南、广西六家分支机构，正在逐步形成覆盖全中国的中药材分销网络。目前平台已基本垄断了所有的信息入口，下一步则要垄断的是采购订单入口，两者形成交互。整个行业大概1200种常用药材，平台上交易过的就有超900种药材，覆盖了70%左右的药材，业务分布全国各地区。</p>
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
                    enTitle: 'OVERVIEW',
                    zhTitle: '企业简介'
                }
            }
        },
        components: {
            titleView,
        }
}
</script>
