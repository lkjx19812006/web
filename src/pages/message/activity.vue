<style lang="less" scoped>
.activity {
    .top_checkBox {
        height: 38px;
        background-color: #F8F8F8;
        border-top: 1px solid #E0E0E0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        .btn_wrap {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            div {
                padding: 3px 15px;
                color: #fff;
                border-radius: 5px;
                font-size: 12px;
                margin: 0 10px;
                cursor: pointer;
            }
            .btn_read {
                border: 1px solid #EDB200;
                background-color: #FBBD00;
            }
            .btn_del {
                border: 1px solid #EB7F00;
                background-color: #FB8800;
            }
        }
    }
    .items {
        padding: 24px 10px;
        padding-right: 0;
        .item {
            height: 250px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .checkBox_wrap {
                flex: 0 0 auto;
                margin-top: 35px;
                width: 50px;
            }
            .content {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                background-color: #FBFBFB;
                height: 100%;
                .time_wrap {
                    display: flex;
                    flex-direction: column;
                    margin-top: 35px;
                    align-items: center;
                    flex: 0 0 auto;
                    width: 116px;
                    .ymd {
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 5px;
                    }
                    .hm {
                        font-size: 14px;
                        color: #999;
                    }
                }
                .cont_txt {
                    flex: 1;
                    padding: 25px 0;
                    .cont_wrap {
                        height: 100%;
                        padding: 0 30px;
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        border-left: 1px solid #E3E3E3;
                        font-size: 14px;
                        .state {
                            margin-top: 5px;
                            flex: 0 0 auto;
                            margin-right: 20px;
                            .pre_read {
                            	line-height: 24px;
                                color: #F08200;
                                font-weight: 700;
                            }
                        }
                        .info_cont {
                            margin-top: 5px;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            flex: 1;
                            .info {
                                color: #4D4D4D;
                                margin-right: 10px;
                                line-height: 24px;
                                .linkTo {
                                    color: #27A961;
                                    cursor: pointer;
                                    text-decoration: underline;
                                }
                            }
                            .img_wrap {
                                height: 135px;
                                width: 352px;
                                border: 1px solid #fff;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                align-items: center;
                                margin-top: 10px;
                                img {
                                    min-height: 135px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="activity">
        <div class="top_checkBox">
            <el-checkbox v-model="checked">
                <span style="font-size: 12px; color: #666">全选</span>
            </el-checkbox>
            <div class="btn_wrap">
                <div class="btn_read">
                    标为已读
                </div>
                <div class="btn_del">
                    删除
                </div>
            </div>
        </div>
        <div class="items">
            <div class="item">
                <div class="checkBox_wrap">
                    <el-checkbox v-model="checked">
                    </el-checkbox>
                </div>
                <div class="content">
                    <div class="time_wrap">
                        <div class="ymd">
                            2017-6-30
                        </div>
                        <div class="hm">
                            15:40
                        </div>
                    </div>
                    <div class="cont_txt">
                        <div class="cont_wrap">
                            <div class="state">
                                <span class="pre_read">[未读]</span>
                            </div>
                            <div class="info_cont">
                                <div class="info">
                                    <span>【抽奖活动】包图是正版商业图库，多有包图是正版商业图库，多有包图是正版商业图库，多有包图是正版商业图库，多有包图是正版商业图库，多有包图是正版商业图库，多有！</span>
                                    <span class="linkTo">点击查看详情</span>
                                </div>
                                <div class="img_wrap">
                                    <img src="../../../static/icon/activityimg.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked: false
        }
    }
}
</script>
