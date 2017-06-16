<style lang="less">
.presell_item {
    width: 100%;
    .good_content {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
    .marginClass {
        margin: 0 27px;
    }
    .good_detail {
        position: relative;
        border: 1px solid #ececec;
        width: 380px;
        margin-bottom: 30px;
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
                    min-height: 230px;
                    width: 100%;
                    cursor: pointer;
                }
                .icon {
                    flex: 0;
                    min-height: 0px;
                    max-width: 48px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    border: 0 none;
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
            .name {
                margin-top: 10px;
                padding: 0 10px;
                font-size: 22px;
                color: #343434;
                cursor: pointer;
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
                    text-align: right;
                }
            }
        }
        .detail_button {
            flex: 0 0 auto;
            min-height: 40px;
            display: flex;
            flex-direction: row;
            border: 1px solid #FA8435;
            align-items: center;
            .price {
                flex: 1 0 auto;
                font-size: 16px;
                padding-left: 10px;
                color: #FA8435;
            }
            .orange_button {
                flex: 0 0 auto;
                font-size: 14px;
                border: none;
                border-radius: 0;
                height: 40px;
            }
        }
    }
}
</style>
<template>
    <div class="presell_item">
        <div class="good_content">
            <div v-for="(subItem,index) in item" :key="index" :class="[index%3==1 ? 'marginClass' : '', 'good_detail']">
                <div class="content">
                    <div class="img_content">
                        <img class="icon" :src="subItem.cFlagsPath" v-if="subItem.cFlagsPath">
                        <img class="big_img" :src="subItem.image[0]" @click="jump(subItem.id)">
                        <div class="black" v-show='subItem.restNumber <= 0'></div>
                        <img src="../../static/icon/sale.png" class="sale" v-show='subItem.restNumber <= 0'>
                    </div>
                    <div class="name" v-if='subItem.restNumber > 0' @click="jump(subItem.id)"> {{subItem.breedName}}</div>
                    <div class="name" v-if='subItem.restNumber <= 0'>{{subItem.breedName}}</div>
                    <div class="detail">
                        <div>规格：{{subItem.spec, 12 | filterTxt}}</div>
                        <div>剩余数量：<span class="orange_span">{{subItem.restNumber+subItem.unit, 8 | filterTxt}}</span></div>
                    </div>
                    <div class="detail">
                        <div>航班号：{{subItem.transportNo}}</div>
                        <div>出口国：{{subItem.country}}</div>
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
                    <div class="price orange_span">￥<span>{{subItem.price}}&nbsp;元/{{subItem.unit}}</span></div>
                    <el-button size="small" class="orange_button" type="primary" @click="jump(subItem.id)" v-show='subItem.restNumber > 0'>立即抢购</el-button>
                    <el-button size="small" class="orange_button" type="primary" v-show='subItem.restNumber <= 0'>立即抢购</el-button>
                </div>
                <!-- <div class='black' v-show='subItem.restNumber <= 0'></div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                name: '',
                spec: ''
            }
        },
        props: {
            httpParam: {},
            item: {}
        },
        mounted() {
            console.log(this.item);
        },
        methods: {
            jump(id) {
                this.$router.push("/presellDetail/" + id)
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
