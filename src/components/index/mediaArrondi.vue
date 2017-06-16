<style lang="less" scoped>
.media_arrondi_compent {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 20px;
    padding-bottom: 50px;
    .need_table {
        flex: 0 0 auto;
        width: 49%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .title {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
            width: 100%;
            border-bottom: 2px solid #FB8335;
            padding-bottom: 14px;
            margin-bottom: 22px;
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
        .table {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .head_img {
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                min-width: 100%;
                max-width: 100%;
                height: 320px;
                img {
                    width: 100%;
                }
                margin-bottom:25px;
            }
            .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 10px 0;
                flex-direction: row;
                cursor: pointer;
                .title_left {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-right: 20px;
                    -o-text-overflow: ellipsis;
                }
                .content_title {
                    font-size: 14px;
                    color: #676767;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-width: 80px;
                    .circle {
                        margin-right: 26px;
                        width: 10px;
                        height: 10px;
                        min-width: 10px;
                        border-radius: 50%;
                        background-color: #e5e5e5;
                        position: relative;
                    }
                    .line {
                        border: 1px solid #e5e5e5;
                        height: 29px;
                        position: absolute;
                        left: 4px;
                        top: 9px;
                    }
                }
            }
            .content:hover {
                .content_title {
                    color: #fa8435;
                    .circle {
                        background-color: #fa8435;
                    }
                    .title_left {
                        color: #fa8435;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="media_arrondi_compent">
        <div class="need_table right_margin">
            <div class="title">
                <div class="title_name">行业资讯</div>
                <div class="title_more" v-on:click="jumpMarket">更多 >></div>
            </div>
            <div class="table">
                <div class="head_img"><img :src="trade[0].imgUrl"></div>
                <div class="content" v-for="(item,index) in trade" @click="newWindow(item)" :key="index">
                    <div class="content_title ">
                        <div class="circle">
                            <div class="line" v-if="index!=trade.length-1"></div>
                        </div>
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                            <span class="title_left">{{item.title,30 | filterTxt}}</span>
                        </el-tooltip>
                    </div>
                    <div class="content_title">{{item.ctime|formatBirth}}</div>
                </div>
            </div>
        </div>
        <div class="need_table left_margin">
            <div class="title">
                <div class="title_name">媒体视角</div>
                <div class="title_more" v-on:click="lintTo">更多 >></div>
            </div>
            <div class="table">
                <div class="head_img"><img :src="media[0].imgUrl"></div>
                <div class="content" v-for="(item,index) in media" @click="newWindow(item)" :key="index">
                    <div class="content_title ">
                        <div class="circle">
                            <div class="line" v-if="index!=media.length-1"></div>
                        </div>
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                            <span class="title_left">{{item.title,30 | filterTxt}}</span>
                        </el-tooltip>
                    </div>
                    <div class="content_title">{{item.ctime|formatBirth}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    data() {
            return {
                media: [{
                    imgUrl: ''
                }],
                trade: [{
                    imgUrl: ''
                }]
            }
        },
        mounted() {
            this.getMedia();
            this.getTrade();
        },
        methods: {
            newWindow(item) {
                console.log(item);
                window.open(item.linkUrl);
            },
            getMedia() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'pushService',
                    biz_method: 'queryCompanyNewsList',
                    biz_param: {
                        type: 1,
                        title: '',
                        pn: 1,
                        pSize: 10
                    }
                }).then(function(suc) {
                    _self.media = suc.biz_result.list;
                    console.log(_self.media)
                }).catch(function(err) {

                })
            },
            getTrade() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'pushService',
                    biz_method: 'queryCompanyNewsList',
                    biz_param: {
                        type: 0,
                        title: '',
                        pn: 1,
                        pSize: 10
                    }
                }).then(function(suc) {
                    _self.trade = suc.biz_result.list;
                    //console.log(_self.trade)
                }).catch(function(err) {

                })
            },
            lintTo() {
                if(document.documentElement.scrollTop)document.documentElement.scrollTop = 0;
                if(window.pageYOffset)window.pageYOffset = 0;
                if(document.body.scrollTop)document.body.scrollTop = 0;
                // var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                // this.$store.dispatch('getNewsIndex', '2');
                // scrollTop = 0;
                this.$router.push('/aboutUsNew/media/reports');
            },
            jumpMarket() {
                this.$router.push('/industry/1');
            }
        }
}
</script>
