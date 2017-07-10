<style lang="less" scoped>
a {
    text-decoration: none;
}

.recommon_pre {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
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
            box-sizing: border-box;
            border: 1px solid #ececec;
            width: 216px;
            padding: 10px 0 0 0;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            .content {
                flex: 1 0 auto;
                .img_content {
                    height: 150px;
                    margin: 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                    .black {
                        width: 100%;
                        height: 150px;
                        position: absolute;
                        background-color: #fff;
                        opacity: 0.8;
                        z-index: 200;
                        top: 0;
                    }
                    .sale {
                        position: absolute;
                        z-index: 201;
                    }
                    .big_img {
                        min-height: 150px;
                        width: 100%;
                        cursor: pointer;
                    }
                    .icon {
                        position: absolute;
                        left: 0;
                        top: 0;
                        max-width: 24px;
                        border: 0 none;
                    }
                }
                .name {
                    margin-top: 15px;
                    padding: 0 10px;
                    font-size: 18px;
                    color: #343434;
                }
                .detail {
                    margin: 12px 0 0 0;
                    padding: 0 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #676767;
                }
            }
            .detail_button {
                flex: 0 0 auto;
                min-height: 40px;
                display: flex;
                flex-direction: row;
                border: 1px solid #67af88;
                align-items: center;
                .price {
                    flex: 1 0 auto;
                    font-size: 14px;
                    color: #67af88;
                    padding-left: 10px;
                }
                .green_button {
                    flex: 0 0 auto;
                    background-color: #67af88;
                    color: #fff;
                    font-size: 14px;
                    border: none;
                    border-radius: 0;
                    height: 40px;
                    a {
                        color: #FFF;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="recommon_pre">
        <div class="swiper">
            <el-carousel indicator-position="none" height="300px" :interval="5000">
                <el-carousel-item v-for="(item, index) in presellList" :key="index">
                    <div class="good_content">
                        <div v-for="(subItem,index) in item" :key="index" :class="[index%2==1 ? 'marginClass' : '', 'good_detail']">
                            <div class="content">
                                <div class="img_content">
                                    <img class="big_img" :src="subItem.image[0]" @click='jump(subItem.id)'>
                                    <img class="icon" :src="subItem.cFlagsPath" v-if="subItem.cFlagsPath">
                                    <div class='black' v-show='subItem.restNumber <= 0'></div>
                                    <img src="../../static/icon/sale.png" class="sale" v-show='subItem.restNumber <= 0'>
                                </div>
                                <div class="name" style="cursor: pointer" v-if='subItem.restNumber > 0' @click="jump(subItem.id)">{{subItem.breedName}}</div>
                                <div class="name" style="cursor: default" v-if='subItem.restNumber <= 0'>{{subItem.breedName}}</div>
                                <div class="detail">
                                    <div>规格：{{subItem.spec, 8 | filterTxt}}</div>
                                    <div>产地：{{subItem.location, 8 | filterTxt}}</div>
                                </div>
                            </div>
                            <div class="detail_button">
                                <div class="price">￥<span>{{subItem.price + '元/' + subItem.unit , 10 | filterTxt}}</span></div>
                                <el-button size="small" class="green_button" type="primary" @click="jump(subItem.id)" v-show='subItem.restNumber > 0'>立即抢购</el-button>
                                <el-button size="small" class="green_button" style="cursor: default;" type="primary" v-show='subItem.restNumber <= 0'>立即抢购</el-button>
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
                let n = i % 5;
                var arr = this.getSwperList(n, this.presellArr);
                let _self = this;
                arr.forEach(function(item) {
                    _self.presellArr.push(item);
                })
                goodsArr.push(this.presellArr.slice(0, 5));
                if (this.presellArr.length > 5) {
                    goodsArr.push(this.presellArr.slice(5, 10))
                }
                return goodsArr
            }
        },

        methods: {
            getSwperList(n, arr) {
                //如果是 6个 剪去前面5个直接push 如果是1个 后面重复添加这一个
                let goodsArr = [];
                for (var i = 0; i < 5 - n; i++) {
                    switch (n) {
                        case 1:
                            if (arr.length > 5) {
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
                            break;
                        case 3:
                            goodsArr.push(arr[i]);
                            break;
                        case 4:
                            goodsArr.push(arr[i]);
                            break;
                    }
                }
                return goodsArr
            },
            getHttp() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'recommendPreList',
                    biz_param: {
                        pn: 1,
                        pSize: 10
                    }
                }).then(function(suc) {
                    // var arr = []
                    // for (var i = 0; i < 7; i++) {
                    //     arr.push(suc.biz_result.list[i]);
                    // }
                    //  // _self.presellArr = arr;
                    _self.presellArr = suc.biz_result.list;
                }).catch(function(err) {

                })
            },
            jump(id) {
                // window.location.target = '_blank';
                // window.location.href = '/presellDetail/' + id;
                // let newWin = window.open();
                // newWin.location.href = '/presellDetail/' + id;
                this.$router.push('/presellDetail/' + id)
            },
            // linkToInfo(id) {
            //     let newWin = window.open();
            //     newWin.location.href = '/presellDetail/' + id;
            //     // this.$router.push('/presellDetail/' + id)
            // }
        }
}
</script>
