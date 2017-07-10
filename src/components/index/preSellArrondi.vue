<style lang="less" scoped>
.presell_arrondi_compent {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    .title {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        width: 100%;
        border-bottom: 3px solid #F98435;
        padding-bottom: 16px;
        .title_name {
            font-size: 22px;
            color: #676767;
            flex: 0 0 auto;
        }
        .title_more {
            font-size: 16px;
            color: #8F8F8F;
            flex: 0 0 auto;
            cursor: pointer;
        }
    }
    .swiper {
        margin-top: 20px;
        .good_content {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .marginClass {
            margin: 0 27px;
        }
        .good_detail {
            position: relative;
            border: 1px solid #ececec;
            width: 380px;
            padding: 10px 0 0 0;
            height: 443px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .content {
                flex: 1 0 auto;
                .img_content {
                    height: 230px;
                    margin: 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                    .black {
                        width: 100%;
                        height: 230px;
                        position: absolute;
                        background-color: #fff;
                        opacity: 0.8;
                        z-index: 20;
                        top: 0;
                    }
                    .sale {
                        position: absolute;
                        z-index: 21;
                    }
                    .big_img {
                        width: 100%;
                        min-height: 230px;
                    }
                    .icon {
                        max-width: 48px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        border: 0 none;
                    }
                }
                .name {
                    margin-top: 10px;
                    padding: 0 10px;
                    font-size: 22px;
                    color: #343434;
                }
                .detail {
                    margin: 15px 0 0 0;
                    padding: 0 10px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 16px;
                    color: #676767;
                    div {
                        flex: 1;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .left {
                        text-align: left;
                    }
                    .right {
                        span {
                            color: #67af88;
                        }
                        text-align: right;
                    }
                }
                .countTime_bg {
                    display: inline-block;
                    width: 28px;
                    height: 40px;
                    line-height: 35px;
                    vertical-align: middle;
                    margin-right: 5px;
                    text-align: center;
                    font-size: 24px;
                    color: #E83437;
                    background: url('../../static/icon/timebg.png') no-repeat center;
                }
            }
            .detail_button {
                flex: 0 0 auto;
                min-height: 40px;
                display: flex;
                flex-direction: row;
                border: 1px solid #F98435;
                align-items: center;
                .price {
                    flex: 1 0 auto;
                    font-size: 16px;
                    color: #F98435;
                    padding-left: 10px;
                }
                .green_button {
                    flex: 0 0 auto;
                    background-color: #F98435;
                    color: #FEFEFE;
                    font-size: 14px;
                    border: none;
                    border-radius: 0;
                    height: 40px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="presell_arrondi_compent">
        <div class="title">
            <div class="title_name">预售专区</div>
            <div class="title_more" v-on:click="linkTo">更多 >></div>
        </div>
        <div class="swiper">
            <el-carousel indicator-position="none" height="465px" :interval="5000">
                <el-carousel-item v-for="(item, idx) in presellList" :key="idx">
                    <div class="good_content">
                        <div v-for="(subItem,index) in item" :key="index" :class="[index%3==1 ? 'marginClass' : '', 'good_detail']">
                            <div class="content">
                                <div class="img_content">
                                    <img class="big_img" style="cursor: pointer" :src="subItem.image[0]" v-on:click="offer(subItem.id)" v-if='subItem.restNumber > 0'>
                                    <img class="big_img" :src="subItem.image[0]" v-if='subItem.restNumber <= 0'>
                                    <img class="icon" :src="subItem.cFlagsPath" v-if="subItem.cFlagsPath">
                                    <div class='black' v-show='subItem.restNumber <= 0'></div>
                                    <img src="../../static/icon/sale.png" class="sale" v-show='subItem.restNumber <= 0'>
                                </div>
                                <div class="name" style="cursor: pointer" v-if='subItem.restNumber > 0' v-on:click="offer(subItem.id)">{{subItem.breedName}}</div>
                                <div class="name" style="cursor: default" v-if='subItem.restNumber <= 0'>{{subItem.breedName}}</div>
                                <div class="detail">
                                    <div class='left'>规格：{{subItem.spec}}</div>
                                    <div class='right'>剩余数量：<span style="color: #F98435; font-size: 18px;">{{subItem.restNumber}}{{subItem.unit}}</span></div>
                                </div>
                                <div class="detail">
                                    <div class='left'>航班号：{{subItem.transportNo}}</div>
                                    <div class='right'>出口国：{{subItem.country}}</div>
                                </div>
                                <div class="detail">
                                    <div v-if="countTime(subItem.arriveTime)">
                                        预计到港时间：
                                        <span style="color: #F98435;font-size: 20px;">
                                            {{timePresell(subItem.arriveTime)}}                               
                                        </span>
                                    </div>
                                    <div v-if="!countTime(subItem.arriveTime)">
                                        <span style="line-height: 35px; height: 40px; margin-right: 5px; ">还有</span>
                                        <span class="countTime_bg">    
                                        {{timePresell(subItem.arriveTime)[0]}}                            
                                    </span>
                                        <span class="countTime_bg">   
                                        {{timePresell(subItem.arriveTime)[1]}}                             
                                    </span>
                                        <span style="line-height: 35px; height: 40px; margin-right: 5px; ">天到港</span>
                                    </div>
                                </div>
                            </div>
                            <div class="detail_button">
                                <div class="price">￥<span>{{subItem.price}}&nbsp;元</span>/{{subItem.unit}}</div>
                                <el-button size="small" class="green_button" type="primary" v-on:click="offer(subItem.id)" v-if='subItem.restNumber > 0'>立即抢购</el-button>
                                <el-button size="small" class="green_button" style="cursor: default" type="primary" v-if='subItem.restNumber <= 0'>立即抢购</el-button>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    data() {
            return {
                presellArr: []
            }
        },
        created() {
            this.getHttp();
        },
        computed: {
            presellList() {
                let goodsArr = [];
                if (this.presellArr.length === 0) {
                    return goodsArr;
                }
                let i = this.presellArr.length;
                let n = i % 3;
                var arr = this.getSwperList(n, this.presellArr);
                let _self = this;
                arr.forEach(function(item) {
                    _self.presellArr.push(item);
                })
                goodsArr.push(this.presellArr.slice(0, 3));
                if (this.presellArr.length > 3) {
                    goodsArr.push(this.presellArr.slice(3, 6));
                    if (this.presellArr.length > 6) {
                        goodsArr.push(this.presellArr.slice(6, 9));
                    }
                }
                console.log(goodsArr);
                return goodsArr
            }
            // presellList() {
            //     let goodsArr = [];
            //     let i = Math.ceil(this.presellArr.length / 3);
            //     for (let m = 0; m < i; m++) {
            //         let arr = [];
            //         let n = m * 3 + 0;
            //         arr.push(this.presellArr[n])
            //         if (this.presellArr[n + 1]) {
            //             arr.push(this.presellArr[n + 1])
            //         } else {
            //             if (this.presellArr.length % 3 === 1) {
            //                 arr.push(this.presellArr[0])
            //             }
            //         };
            //         if (this.presellArr[n + 2]) {
            //             arr.push(this.presellArr[n + 2])
            //         } else {
            //             if (this.presellArr.length % 3 === 1) {
            //                 arr.push(this.presellArr[1])

            //             } else if (this.presellArr.length % 3 === 2) {
            //                 arr.push(this.presellArr[0])
            //             }
            //         };
            //         goodsArr.push(arr);
            //     }
            //     return goodsArr
            // }
        },
        methods: {
            getSwperList(n, arr) {
                //如果是 7个 剪去前面3, 6个直接push 如果是1个 后面重复添加这一个
                let goodsArr = [];
                for (var i = 0; i < 3 - n; i++) {
                    switch (n) {
                        case 1:
                            if (arr.length > 3) {
                                goodsArr.push(arr[i]);
                            } else {
                                goodsArr.push(arr[n - 1]);
                            }
                            break;
                        case 2:
                            if (arr[i]) {
                                goodsArr.push(arr[i]);
                            } else {
                                goodsArr.push(arr[0]);
                            }
                            break; // case 3:
                            //     goodsArr.push(arr[i]);
                            //     break;
                            // case 4:
                            //     goodsArr.push(arr[i]);
                            //     break;

                    }
                }
                return goodsArr
            },
            getHttp() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'preSellList',
                    biz_param: {
                        pn: 1,
                        pSize: 9
                    }
                }).then(function(suc) {
                    // 测试数量
                    // let arr = [];
                    // for (var i = 0; i < 4; i++) {
                    //     arr.push(suc.biz_result.list[i])
                    // }
                    _self.presellArr = suc.biz_result.list;
                }).catch(function(err) {

                })
            },
            linkTo() {
                this.$router.push('/presell');
            },
            offer(paramsId) {
                // let newWin = window.open();
                // newWin.location.href = '/presellDetail/' + paramsId;
                this.$router.push("/presellDetail/" + paramsId);
            },
            countTime(due) {
                let days;
                if (due) {
                    due = due.split('.')[0];
                    let date = due.split(' ')[0];
                    var arr = due.split(/[- : \/]/);
                    var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
                    var pubdateDate = new Date();
                    var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                    days = Math.ceil(dateValue / (24 * 3600 * 1000));
                    if (days <= 0 || days > 30) {
                        return true;
                    } else {
                        return false;
                    }
                }

            },
            timePresell(due) {
                let days;
                if (due) {
                    due = due.split('.')[0];
                    let date = due.split(' ')[0];
                    var arr = due.split(/[- : \/]/);
                    var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
                    var pubdateDate = new Date();
                    var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                    days = Math.ceil(dateValue / (24 * 3600 * 1000));
                    if (days <= 0) {
                        days = "已到港";
                    } else if (days > 0 && days <= 30) {
                        if (days < 10) {
                            days = [0, days];
                        } else {
                            days = days + '';
                            days = days.split('');
                        }
                    } else if (days > 30) {
                        days = date;
                    }

                } else {
                    //days = "已到港";
                }
                return days;
            }
        }
}
</script>
