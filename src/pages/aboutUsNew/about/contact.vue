<style lang="less" scoped>
.contact {
    width: 1200px;
    margin: auto;
    .content {
        display: flex;
        flex-direction: column;
        justifu-content: flex-start;
        margin-top: 32px;
        .top_wrap {
            display: flex;
            flex-direction: column;
            margin-bottom: 50px;
            .title {
                font-size: 25px;
                color: #033333;
                margin-bottom: 26px;
            }
            .info {
                flex: 1;
                display: flex;
                padding-right: 20px;
                flex-direction: row;
                justify-content: space-between;
                align-items: strecth;
                color: #666666;
                .color {
                    color: #FE7E28;
                }
                .left_wrap {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .right_wrap {
                    width: 568px;
                    height: 271px;
                    background: url('../../../static/icon/contact.png') no-repeat center;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                }
            }
        }
        .title_wrap {
            font-size: 24px;
            color: #252525;
            line-height: 58px;
            background-color: #f6f6f6;
            text-align: center;
        }
        .map_wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 0;
            position: relative;
            .addres_wrap {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: row;
                position: absolute;
                span {
                    flex: 0 1 auto;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    padding: 3px 12px;
                    border: 1px solid #EF4949;
                    color: #ef4949;
                    font-size: 15px;
                    margin: 0 5px;
                    background-color: #fff;
                    border-radius: 14px;
                    box-shadow: 3px 3px 5px rgba(4, 0, 0, .34);
                }
            }
            .addres_wrap:hover {
                cursor: pointer;
                span {
                    box-shadow: 6px 6px 10px rgba(4, 0, 0, .6);
                }
            }
            .right {
                flex-direction: row-reverse;
            }
        }
        .list_wrap {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            border-top: 1px solid #ebebeb;
            .item {
                padding-top: 42px;
                padding-bottom: 64px;
                border-bottom: 1px solid #ebebeb;
                flex: 0 0 530px;
                .title {
                    font-size: 20px;
                    color: #666666;
                    margin-bottom: 46px;
                }
                .detail {
                    margin-bottom: 15px;
                    font-size: 16px;
                    color: #666666;
                }
            }
            .last {
                border: 0 none;
            }
        }
    }
}
</style>
<template>
    <div class="contact">
        <titleView :title="title"></titleView>
        <div class="content">
            <div class="top_wrap">
                <div class="title">
                    <span>公司总部：</span>
                    <span>上海冕冠电子商务有限公司</span>
                </div>
                <div class="info">
                    <div class="left_wrap">
                        <div class="detail_wrap">
                            <span class="tit">电话：</span>
                            <span class="cont">021-55502736</span>
                        </div>
                        <div class="detail_wrap">
                            <span class="tit">邮箱：</span>
                            <span class="cont">200437</span>
                        </div>
                        <div class="detail_wrap">
                            <span class="tit">地址：</span>
                            <span class="cont">上海市虹口区逸仙路158号宝龙一方大厦9F</span>
                        </div>
                        <div class="detail_wrap">
                            <span class="tit">邮箱：</span>
                            <span class="cont color">SERVICE@YAOCAIMAIMAI.COM</span>
                        </div>
                       <!--  <div class="detail_wrap">
                            <span class="tit">企业QQ：</span>
                            <span class="cont">123456789</span>
                        </div>
                        <div class="detail_wrap">
                            <span class="tit">企业微信：</span>
                            <span class="cont color">YAOCAIMAIMAI</span>
                        </div> -->
                    </div>
                    <div class="right_wrap">
                        <img src="../../../static/icon/contact2.png" height="258" width="556">
                    </div>
                </div>
            </div>
            <div class="title_wrap">
                五大子公司
            </div>
            <div class="map_wrap">
                <div class="map_img">
                    <img src="../../../static/icon/map.png" height="544" width="632">
                </div>
                <div class="addres_wrap" :class="{'right': item.type === 2}" :style="{'left': item.pageX, 'top': item.pageY}" v-for="item in place">
                    <img src="../../../static/icon/place.png" height="38" width="26">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="list_wrap">
                <div class="item" v-for="(item, index) in place" :class="{'last': index === place.length - 1}">
                    <div class="title">
                        {{item.name}}
                    </div>
                    <div class="detail">
                        <span class="tit">电话：</span>
                        <span class="info">{{item.phone}}</span>
                    </div>
                    <div class="detail">
                        <span class="tit">地址：</span>
                        <span class="info">{{item.address}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import titleView from '../../../components/about/title.vue'
let place = [{
    name: '亳州子公司',
    phone: '0558-5558157',
    address: '亳州谯城区康美中药城E7栋132铺。（位置在康美中药城东南角）',
    type: 1,
    pageX: '758px',
    pageY: '287px'
}, {
    name: '甘肃定西子公司',
    phone: '0932-6636789',
    address: '定西市陇西县首阳镇药材市场8号楼19-20',
    type: 2,
    pageX: '459px',
    pageY: '260px'
}, {
    name: '广西玉林子公司',
    phone: '0775-2820086',
    address: '广西省玉林市中药港12#A11',
    type: 1,
    pageX: '661px',
    pageY: '435px'
}, {
    name: '河北安国子公司',
    phone: '0321-3510209',
    address: '河北省安国市保衡北大街87号',
    type: 1,
    pageX: '741px',
    pageY: '229px'
}, {
    name: '四川成都子公司',
    phone: '028-64206689',
    address: '四川省成都市金牛区天回镇木龙湾社区四季天街第三幢239号',
    type: 1,
    pageX: '582px',
    pageY: '332px'
}]
export default {
    data() {
            return {
                place: place,
                title: {
                    enTitle: 'CONTACT US',
                    zhTitle: '联系我们'
                },
            }
        },
        components: {
            titleView
        }
}
</script>
