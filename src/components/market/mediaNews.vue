<style lang="less" scoped>
.media_arrondi_compent {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 20px;
    .need_table {
        flex: 0 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .table {
            width: 90%;
            flex-direction: column;
            align-items: center;
            .head_img {
                display: flex;
                flex-direction:row;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                min-width: 100%;
                max-width: 100%;
                height: 200px;
                img {
                    width:100%;
                    min-height:200px;
                }
            }
            .head_title {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                color: #888888;
            }
            .head_line {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                border: 1px dashed #e5e5e5;
                border-style: none none dashed none;
                width: 100%;
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
                .title_left_tanger {
                    color: #fa8435;
                }
                .content_title {
                    font-size: 14px;
                    color: #7F7F7F;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-width: 78px;
                    .circle {
                        margin-right: 26px;
                        width: 10px;
                        height: 10px;
                        min-width: 10px;
                        border-radius: 50%;
                        background-color: #fa8435;
                        position: relative;
                    }
                    .block_circle {
                        margin-right: 26px;
                        width: 10px;
                        height: 10px;
                        min-width: 10px;
                        border-radius: 50%;
                        background-color: #e5e5e5;
                        position: relative;
                    }
                    .line {
                        border: 1px dashed #e5e5e5;
                        height: 29px;
                        position: absolute;
                        left: 4px;
                        top: 9px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="media_arrondi_compent">
        <div class="need_table">
            <div class="table">
                <div class="head_img" @click="selectClick(media[0])"><img :src="media[0].imgUrl"></div>
                <div class="head_title" @click="selectClick(media[0])">{{media[0].title}}</div>
                <div class="head_line"></div>
                <div class="content" v-on:mouseenter="tangerColor(index)" v-for="(item,index) in media" :key="index" v-if="index > 0" @click="selectClick(item)">
                    <div class="content_title ">
                        <div :class="[index === colorIndex ? 'circle' : 'block_circle']">
                            <div class="line" v-if="index!=media.length-1"></div>
                        </div>
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                            <span class="title_left" :class="{'title_left_tanger':index === colorIndex }">{{item.title}}</span>
                        </el-tooltip>
                    </div>
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
                colorIndex: 0,
            }
        },
        mounted() {

            this.getMedia();

        },
        methods: {
            tangerColor(index) {
                this.colorIndex = index;
            },
            selectClick(item) {
                //console.log(item);
                let newWin = window.open();
                newWin.location.href = item.linkUrl;
                this.$emit("result", item);
            },
            getMedia() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'pushService',
                    biz_method: 'queryCompanyNewsList',
                    biz_param: {
                        type: -1,
                        title: "",
                        pn: 1,
                        pSize: 15
                    }
                }).then(function(suc) {
                    _self.media = suc.biz_result.list;
                    console.log(_self.media)
                }).catch(function(err) {

                })
            },

        }
}
</script>
