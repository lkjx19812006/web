<style lang="less" scoped>
.myOfferResDetail {
    .detail {
        width: 960px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid #F0F0F0;
        position: relative;
        .detail_left {
            width: 650px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 50px;
            padding-left: 55px;
            padding-bottom: 15px;
            div {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                line-height: 36px;
                color: #666666;
            }
            .title_name {
                margin-bottom: 10px;
                .hName {
                    font-size: 26px;
                    color: #333333;
                    margin-right: 5px;
                }
                .number {
                    font-size: 18px;
                    color: #333333;
                }
            }
            .spec_wrap {
                .spec {
                    font-size: 16px;
                    color: #fff;
                    padding: 3px 8px;
                    background-color: #FFC71A;
                }
            }
            .location_wrap {
                .location {
                    font-size: 16px;
                    color: #fff;
                    padding: 3px 8px;
                    background-color: #FA8435;
                    margin: 0 10px;
                }
            }
            .detail_tit {
                flex: 0 1 auto;
            }
            .detail_info {
                flex: 1;
            }
        }
        .detail_right {
            padding: 25px 0;
            flex: 1 1 300px;
            display: flex;
            flex-direction: row;
            .detail_date_wrap {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .date_icon_wrap {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    height: 22px;
                    margin-bottom: 15px;
                    img {
                        margin-right: 10px;
                    }
                    span {
                        font-size: 18px;
                        color: #FA8435;
                    }
                }
                .date_txt_wrap {
                    font-size: 16px;
                    color: #999999;
                    margin-bottom: 5px;
                }
                .num_txt_wrap {
                    font-size: 16px;
                    color: #333;
                }
            }
            .detail_date_line {
                flex: 0 1 1px;
                background: url('../../static/icon/spaceLine.png') no-repeat center;
            }
        }
        .yaochang_img_wrap {
            position: absolute;
            top: -1px;
            left: -1px;
        }
    }
}
</style>
<template>
    <div class='myOfferResDetail'>
        <div class='detail'>
            <div class="detail_left">
                <div class="title_name">
                    <span class="hName">{{detailObj.breedName}}</span>
                    <span class="number">(&nbsp;{{detailObj.number + '  '+ detailObj.unit}}&nbsp;)</span>
                </div>
                <div class="spec_wrap">
                    <span class="detail_tit">规格：</span>
                    <span class="detail_info">{{detailObj.spec}}</span>
                </div>
                <div class="location_wrap">
                    <span class="detail_tit">产地：</span>
                    <span class="detail_info">{{detailObj.location}}</span>
                </div>
                <div class="detail_wrap">
                    <span class="detail_tit">质量要求：</span>
                    <span class="detail_info">{{detailObj.quality}}</span>
                </div>
                <div class="detail_wrap">
                    <span class="detail_tit">交货地点：</span>
                    <span class="detail_info">{{detailObj.address}}</span>
                </div>
                <div class="detail_wrap" v-if="false">
                    <span class="detail_tit">付款方式：</span>
                    <span class="detail_info">{{detailObj.paymentWay}}</span>
                </div>
                <div class="detail_wrap">
                    <span class="detail_tit" v-if="detailObj.indentType === 0">药厂备注：</span>
                    <span class="detail_tit" v-if="detailObj.indentType != 0">备注信息：</span>
                    <span class="detail_info">{{detailObj.description}}</span>
                </div>
            </div>
            <div class="detail_right">
                <div class="detail_date_line">
                </div>
                <div class="detail_date_wrap">
                    <div class="date_icon_wrap">
                        <img src="../../static/icon/dateIcon.png" height="22" width="22">
                        <span>剩余{{detailObj.duedate | timeDateNum}}天</span>
                    </div>
                    <div class="date_txt_wrap">
                        <span>上架时间：</span>
                        <span v-if="detailObj.shelveTime != ''">{{detailObj.shelveTime | formatBirth}}</span>
                        <span v-if="detailObj.shelveTime == ''">暂未上架</span>
                    </div>
                    <div class="num_txt_wrap">
                        <span>已有</span>
                        <span style="color: #FA8435">{{detailObj.offer}}</span>
                        <span>人报价</span>
                    </div>
                </div>
            </div>
            <div class="yaochang_img_wrap" v-if="detailObj.indentType === 0">
                <img src="../../static/icon/yaochangneed.png" height="65" width="89">
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'

export default {
    data() {
            return {
                textarea: '',
                loading: false,
            }
        },
        props: {
            detailObj: ''
        },
        methods: {
            resive(id) {
                if (!this.need) this.$router.push('/publish/resource/' + id);
                if (this.need) this.$router.push('/publish/need/' + id);
            }

        }
}
</script>
