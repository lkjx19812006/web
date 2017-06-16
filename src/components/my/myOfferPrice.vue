<style lang="less" scoped>
// 我的报价
.myOfferPrice_item {
    .myOfferPrice {
        padding: 25px;
        width: 960px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border: 1px solid #E6E6E6;
        margin-bottom: 30px;
        .top_info_wrap {
            border-bottom: 1px solid #E6E6E6;
            display: flex;
            flex-direction: row;
            padding-bottom: 25px;
            .slide_img {
                width: 160px;
                height: 140px;
                .img_wrap {
                    width: 160px;
                    height: 140px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    img {
                        max-height: 160px;
                    }
                }
            }
            .txt_info {
                width: 560px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 25px;
                .title_wrap {
                    .name {
                        font-size: 22px;
                        color: #666666;
                    }
                    .number {
                        font-size: 18px;
                        margin: 0 10px;
                        color: #666666;
                    }
                    .time {
                        font-size: 16px;
                        color: #999999;
                    }
                    span {
                        color: #666666;
                        font-size: 16px;
                    }
                }
            }
            .state_wrap {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                .top_tit {
                    margin-bottom: 20px;
                }
            }
        }
        .bot_info_des {
            padding-top: 15px;
            flex: 1;
            display: flex;
            flex-direction: column;
            .des_wrap {
                flex: 1;
                .product_info {
                    margin-bottom: 15px;
                    display: flex;
                    flex-direction: row;
                    .product_info_tit {
                        flex: 0 1 auto;
                    }
                    .product_info_cot {
                        flex: 1;
                    }
                }
            }
            .btn_wrap {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                font-size: 16px;
                .phone {
                    color: #58BC85;
                }
                .contact_info {
                    margin-right: 10px;
                }
                .btn_cont {
                    color: #58BC85;
                    padding: 5px 20px;
                    border-radius: 2px;
                    border: 1px solid #58BC85;
                    cursor: pointer;
                }
                .btn_cont:hover {
                    color: #fff;
                    background-color: #58BC85;
                }
                .erm_wrap_content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    width: 120px;
                    padding: 5px;
                    padding-top: 12px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
                    border: 1px solid #d1dbe5;
                    margin-bottom: 10px;
                    span {
                        padding: 2px 0;
                    }
                }
            }
        }
    }
    .btn_wrap_showList {
        padding: 10px 0;
        text-align: center;
        span {
            padding: 10px 20px;
            border: 1px solid #FAB735;
            background-color: #FAB735;
            color: #fff;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}
</style>
<template>
    <div class="myOfferPrice_item">
        <div class="myOfferPrice" v-for="(item, index) in detailObj.list" :key="index" v-show="index <= showIndex">
            <div class="top_info_wrap">
                <div class="slide_img">
                    <el-carousel trigger="click" indicator-position="none" height="140px">
                        <el-carousel-item v-for="(img, index) in item.image" :key="index">
                            <div class="img_wrap">
                                <img :src="img">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="txt_info">
                    <div class="title_wrap">
                        <span class="name">{{item.breedName}}</span>
                        <span class="number">(&nbsp;{{item.number + item.unit}}&nbsp;)</span>
                        <span class="time">报价时间：{{item.otime | formatBirth}}</span>
                    </div>
                    <div class="spec">
                        <span class="detail_tit">规格：</span>
                        <span class="detail_info">{{item.spec}}</span>
                    </div>
                    <div class="location">
                        <span class="detail_tit">产地：</span>
                        <span class="detail_info">{{item.spec}}</span>
                    </div>
                    <div class="price">
                        <span class="detail_tit">价格：</span>
                        <span class="detail_info">{{item.price + '元/' + item.unit}}</span>
                    </div>
                </div>
                <div class="state_wrap">
                    <div class="top_tit">
                        <span>报价状态：</span>
                        <span v-if="item.accept === 0">待处理</span>
                        <span style="color: #D65B5B" v-if="item.accept === 1">已采用</span>
                        <span style="color: #909090" v-if="item.accept === 2">未采用</span>
                        <span style="color: #75AA53" v-if="item.accept === 3">待采用</span>
                    </div>
                    <div class="img_wrap">
                        <img v-if="item.accept === 1" src="../../static/icon/caiyong.png" height="93" width="101">
                    </div>
                </div>
            </div>
            <div class="bot_info_des">
                <div class="des_wrap">
                    <div class="product_info">
                        <span class="product_info_tit">产品信息：</span>
                        <span class="product_info_cot">{{item.quality}}</span>
                    </div>
                    <div class="product_info">
                        <span class="product_info_tit">价格说明：</span>
                        <span class="product_info_cot">{{item.priceDescription}}</span>
                    </div>
                </div>
                <div class="btn_wrap">
                    <div class="contact_info" v-show="showConcate === index">
                        <!-- {{item.employeeName}} -->
                        <span class="name">测试姓名：</span>
                        <!-- {{item.employeeMobil}} -->
                        <span class="phone">18686868686</span>
                    </div>
                    <div class="btn_cont" v-if="item.accept != 0 && item.accept != 2 " v-on:mouseenter="showConcate = index" v-on:mouseleave="showConcate = -1">
                        联系专属交易员
                    </div>                
                    <div class="erm_wrap_content" v-if="item.accept == 2">
                        <qrcode type="image"  level="H" :size="100" :value="getEWMUrl(item)"></qrcode>
                        <span>扫码再次报价</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_wrap_showList" v-if="detailObj.list.length > 1">
            <span class="showList" v-if="!showList" @click="showIndex = 999; showList = true">查看历史报价</span>
            <span class="hideList" v-if="showList" @click="showIndex = 0; showList = false">收起</span>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import qrcode from 'v-qrcode'
export default {
    data() {
            return {
                showConcate: -1,
                showIndex: 0,
                showList: false,

            }
        },
        props: {
            detailObj: ''
        },
        components: {
            qrcode
        },
        methods: {
            getEWMUrl(row) {
                return common.commonGetEWMURL(row.breedName, row.intentionId);
            }
        }

}
</script>
