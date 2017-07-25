<style scoped lang="less">
.presell_detail {}

.presell_detail .main {
    min-height: 900px;
    width: 1200px;
    margin: 45px auto;
}

.presell_detail .top {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
}

.presell_detail .top_left {
    flex: 54;
    box-sizing: border-box;
    height: 425px;
    display: flex;
    flex-direction: row;
    position: relative;
}

.presell_detail .top_left .icon {
    max-width: 48px;
    position: absolute;
    left: 60px;
    top: 0;
    z-index: 9;
    border: 0 none;
}

.presell_detail .top_left .left_tab {
    box-sizing: border-box;
    flex: 6;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.presell_detail .top_left .left_tab .tab_item {
    flex: 1;
    font-size: 20px;
    padding: 50px 19px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    color: #6e6e6e;
    border-right: none;
    cursor: pointer;
}

.presell_detail .top_left .left_tab .active {
    border-color: #FB985F;
    color: #FB985F;
}

.presell_detail .top_left .swiper_box {
    box-sizing: border-box;
    flex: 48;
    height: 100%;
    border: 1px solid #FB985F;
    overflow: hidden;
}

.presell_detail .top_left .swiper_box img {
    width: 100%;
    min-height: 100%;
}

.presell_detail .top_right {
    flex: 66;
    height: 425px;
    padding-left: 60px;
    display: flex;
    flex-direction: column;
}

.presell_detail .top_right .right_title {
    flex: 90;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.presell_detail .top_right .right_title .breed_name,
.date {
    height: 100%;
    box-sizing: border-box;
}

.presell_detail .top_right .right_title .breed_name {
    padding-top: 5px;
    font-size: 24px;
    color: #FC8235;
}

.presell_detail .top_right .right_title .date {
    padding-top: 8px;
    font-size: 22px;
    color: #4D4D4D;
    margin-left: 80px;
    color: #FB985F;
}

.presell_detail .top_right .right_bottom {
    flex: 185;
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    line-height: 16px;
}

.presell_detail .top_right .right_bottom .right_bottom_left {
    flex: 3;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.presell_detail .top_right .right_bottom .right_bottom_right {
    flex: 2;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.presell_detail .top_right .right_bottom .bcontent {
    margin-bottom: 15px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
        cursor: pointer;
    }
}

.presell_detail .top_right .right_bottom .bcontent .ori {
    color: #FC8235;
    width: 100%;
}

.presell_detail .other {
    font-size: 16px;
}

.presell_detail .other .sell_point {
    margin-bottom: 15px;
    width: 600px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    span {
        cursor: pointer;
    }
}

.presell_detail .other .moq {
    margin-bottom: 15px;
    .orange {
        color: #F98530;
        font-size: 15px;
    }
}

.presell_detail .other .contact {
    line-height: 20px;
    display: flex;
    flex-direction: row;
}

.presell_detail .other .contact img {
    height: 20px;
    margin-left: 15px;
    padding: 0;
    cursor: pointer;
}

.presell_detail .other .contact_type {
    flex: 1;
}

.presell_detail .other .confirm {
    height: 50px;
    box-sizing: border-box;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
    background-color: #F98435;
    border: 1px solid #F98435;
    border-radius: 3px;
    width: 130px;
    text-align: center;
    margin-top: 40px;
    cursor: pointer;
}

.presell_detail .recommend {}

.presell_detail .recommend .my_title {
    font-size: 20px;
    padding-left: 15px;
    border-left: 2px solid #F98435;
    color: #4D4D4D;
    margin-top: 45px;
}

.presell_detail .fill_infor {
    margin: auto;
}

.presell_detail .fill_infor .box {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0 50px 0 20px;
    margin-top: 15px;
}

.presell_detail .fill_infor .ttbox {
    width: 100%;
}

.presell_detail .fill_infor .ttbox .confirm {
    margin: 40px auto 10px auto;
}

.presell_detail .fill_infor .box .name {
    flex: 1;
    text-align: right;
    line-height: 36px;
    margin-right: 20px;
    font-size: 14px;
    color: #000;
}

.presell_detail .fill_infor .box .fill_box {
    flex: 3;
    display: flex;
    flex-direction: row;
    margin: auto;
}

.presell_detail .fill_infor .box .fill_box .left_fill_box {
    flex: 1;
}

.presell_detail .fill_infor .box .fill_box .right_fill_box {
    width: 100px;
}

.presell_detail .fill_infor .confirm {
    height: 40px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    background-color: #F98435;
    border: 1px solid #F98435;
    border-radius: 3px;
    width: 130px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
}

.presell_detail {
    .intention_row {
        // div {
        //     margin-top: 10px;
        // }
        span {
            width: 100px;
        }
        .number_width {
            margin-left: 20px;
            width: 200px;
        }
    }
    .img {
        width: 100%;
        heigth: 100%;
    }
}
</style>
<template>
    <div class="presell_detail">
        <headerView tab="4"></headerView>
        <div class="main">
            <div class='top'>
                <div class='top_left'>
                    <img class="icon" :src="intention.cFlagsPath" v-if="intention.cFlagsPath">
                    <div class='left_tab'>
                        <div class='tab_item' v-for='(todo,index) in tab' :key="index" v-on:mouseenter='handleTap(todo,index)' v-bind:class='{active:todo.show}'>
                            {{todo.name}}
                        </div>
                    </div>
                    <div class='swiper_box'>
                        <el-carousel height="425px">
                            <el-carousel-item v-for="(item, index) in images" :key="index">
                                <img :src="item" @click='popBigImg(item)'>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class='top_right'>
                    <div class='right_title'>
                        <div class='breed_name'>{{intention.breedName}}</div>
                        <div class='date'><span>{{intention.price}}元/{{intention.unit}}</span></div>
                    </div>
                    <div class='right_bottom'>
                        <div class='right_bottom_left'>
                            <div class='bcontent'>规格：
                                <el-tooltip class="item" effect="dark" :content="intention.spec" placement="top-start"><span>{{intention.spec}}</span></el-tooltip>
                            </div>
                            <div class='bcontent'>产地：
                                <el-tooltip class="item" effect="dark" :content="intention.location" placement="top-start"><span>{{intention.location}}</span></el-tooltip>
                            </div>
                            <div class='bcontent'>出口国：
                                <el-tooltip class="item" effect="dark" :content="intention.country" placement="top-start"><span>{{intention.country}}</span></el-tooltip>
                            </div>
                            <div class='bcontent'>库存地：
                                <el-tooltip class="item" effect="dark" :content="intention.address" placement="top-start"><span>{{intention.address}}</span></el-tooltip>
                            </div>
                        </div>
                        <div class='right_bottom_right'>
                            <div class='bcontent'>预到货日期：<span style="font-size: 20px; color: #F98435">{{intention.arriveTime | timePreData}}</span></span>
                            </div>
                            <div class='bcontent'>已售数量：<span class='ori'>{{intention.soldNumber}}{{intention.unit}}</span></div>
                            <div class='bcontent'>剩余数量：{{intention.restNumber}}{{intention.unit}}</div>
                            <div class='bcontent'>包装：{{intention.pack}}</div>
                        </div>
                    </div>
                    <div class='other'>
                        <div class="moq" v-show="intention.moq < intention.restNumber">起订量：<span class="orange">≥ {{intention.moq}}{{intention.unit}}</span></div>
                        <div class="moq" v-show="intention.moq >= intention.restNumber">起订量：<span class="orange">≥ {{intention.restNumber}}{{intention.unit}}</span></div>
                        <div class='sell_point'>
                            产品卖点：
                            <el-tooltip class="item" effect="dark" :content="intention.quality" placement="top-start"><span>{{intention.quality}}</span></el-tooltip>
                        </div>
                        <!--  <div class='contact'>
                            <div>联系我们：</div>
                            <div class='contact_type'>
                                <el-tooltip class="item" effect="dark" :content="intention.preMobile" placement="top-start">
                                    <img src="/static/icon/phone.png">
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :content="intention.preWechat" placement="top-start">
                                    <img src="/static/icon/WeChat.png">
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :content="intention.preQQ" placement="top-start">
                                    <img src="/static/icon/qq.png">
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :content="intention.preSkype" placement="top-start">
                                    <img src="/static/icon/skype.png">
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :content="intention.preEmail" placement="top-start">
                                    <img src="/static/icon/e-mail.png">
                                </el-tooltip>
                            </div>
                        </div> -->
                        <div class="intention_row">
                            <div>
                                <span>订购数量:</span>
                                <el-input v-model="number" type="number" :min="intention.moq" :max="intention.restNumber" :maxlength="10" class="number_width">
                                    <el-button slot="prepend" icon="minus" @click="minus()"></el-button>
                                    <el-button slot="append" icon="plus" @click="add()"></el-button>
                                </el-input>
                            </div>
                        </div>
                        <div class='confirm' @click='popUp'>立即抢购</div>
                    </div>
                </div>
            </div>
            <div class='recommend'>
                <div class='my_title'>推荐预售</div>
                <recommonPreSell></recommonPreSell>
            </div>
        </div>
        <el-dialog v-model="edit" size="small">
            <img :src="img" class='img'>
        </el-dialog>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import validation from '../../validation/validation.js'
import headerView from '../../components/header.vue'
import footerView from '../../components/foot.vue'
import recommonPreSell from '../../components/presell/recommonPreSell.vue'
export default {
    data() {
            return {
                tab: [{
                        name: '产品图片',
                        show: true
                    }, {
                        name: '进口资质',
                        show: false
                    }
                    /*, {
                                        name: '检测报告',
                                        show: false
                                    }*/
                ],
                intention: '',
                images: [],
                img: '',
                id: '',
                edit: false,
                formDate: {
                    number: '',
                    fullname: '',
                    phone: '',
                    request: ''
                },
                number: 1,
            }
        },
        watch: {
            '$route' (newVal, oldVal) {
                this.gethttp(this.$route.params.id);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                window.pageYOffset = 0;
            }
        },
        components: {
            headerView,
            footerView,
            recommonPreSell
        },
        computed: {
            unitList() {
                return this.$store.state.release.units;
            },
            user() {
                return this.$store.state.user.user;
            }
        },
        methods: {
            minus() {
                if (this.intention.moq < this.intention.restNumber) {
                    if (this.number > this.intention.moq) {
                        this.number--;
                    } else {
                        this.number = this.intention.moq;
                    }
                } else {
                    if (this.number > this.intention.restNumber) {
                        this.number--;
                    } else {
                        this.number = this.intention.restNumber;
                    }
                }

            },
            add() {
                if (this.number < this.intention.restNumber) {
                    this.number++;
                } else {
                    this.number = this.intention.restNumber;
                }
            },
            popBigImg(item) {
                let _self = this;
                _self.img = item;
                _self.edit = true;
            },
            popUp() {
                if (!this.user.id) {
                    this.$store.dispatch('setUrl', "/presellDetail/" + this.intention.id).then(() => {
                        this.$router.push('/login');
                    });
                    return;
                };
                if (!common.validateUserInfo(this.user, () => {})) {
                    this.$alert('您还未完善个人信息,请立即去完善', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/register');
                        }
                    });
                    return;
                }
                let checkNum = validation.checkSoleNum(this.number);
                if (checkNum) {
                    return this.$message({
                        showClose: true,
                        message: '订购数量不能为小数，请重新输入！',
                        type: 'error'
                    });
                }
                if (this.intention.moq < this.intention.restNumber) {
                    if (this.number < this.intention.moq) {
                        return this.$message({
                            showClose: true,
                            message: '订购数量不能小于起订量，请重新输入！',
                            type: 'error'
                        });
                    };
                } else {
                    if (this.number < this.intention.restNumber) {
                        return this.$message({
                            showClose: true,
                            message: '订购数量不能小于起订量，请重新输入！',
                            type: 'error'
                        });
                    };
                }

                if (this.number > this.intention.restNumber) {
                    return this.$message({
                        showClose: true,
                        message: '采购数量大于剩余数量,请重新输入！',
                        type: 'error'
                    });
                }
                this.intention.preBuyNumber = this.number;
                window.localStorage.preCart = JSON.stringify(this.intention);
                this.$router.push('/presellConfirm');
            },
            gethttp(id) {
                let _self = this;
                _self.id = id;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',
                    biz_param: {
                        id: id
                    }
                }).then(function(suc) {
                    if (suc.biz_result.id) {
                        _self.intention = suc.biz_result;
                        if (_self.intention.moq < _self.intention.restNumber) _self.number = _self.intention.moq;
                        if (_self.intention.restNumber < _self.intention.moq) _self.number = _self.intention.restNumber;
                        _self.images = suc.biz_result.image;
                    } else {
                        _self.$router.push("/presell");
                    }
                }).catch(function(err) {})
            },
            handleTap(todo, index) {
                let _self = this;
                for (var i = 0; i < _self.tab.length; i++) {
                    _self.tab[i].show = false;
                }
                todo.show = true;
                switch (index) {
                    case 0:
                        _self.gethttp(_self.id);
                        break;
                    case 1:
                        _self.getImg({
                            id: _self.id,
                            type: 'intention_import_quality'
                        });
                        break;
                    case 2:
                        _self.getImg({
                            id: _self.$route.params.id,
                            type: 'intention_test_report'
                        })
                        break;
                }
            },
            getImg(params) {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'filesService',
                    biz_method: 'queryFilesList',
                    biz_param: {
                        bizId: params.id,
                        bizType: params.type
                    }
                }).then(function(suc) {
                    console.log(suc.biz_result)
                    if (suc.code == '1c01') {
                        let data = suc.biz_result.list;
                        let imgs = [];
                        for (var i = 0; i < data.length; i++) {
                            imgs.push(data[i].path);
                        }
                        _self.images = imgs;
                    } else {
                        _self.$router.push("/presell");
                    }
                }).catch(function(err) {})
            }

        },
        created() {
            let _self = this;
            this.gethttp(this.$route.params.id);
            this.id = this.$route.params.id;
        }
}
</script>
