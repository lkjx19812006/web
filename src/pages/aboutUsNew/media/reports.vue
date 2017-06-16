<style lang="less" scoped>
.reports {
    width: 1200px;
    margin: auto;
    margin-bottom: 100px;
    .items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
            flex: 0 0 560px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            height: 93px;
            padding: 40px 0;
            border-bottom: 1px solid #ebebeb;
            overflow: hidden;
            .time_wrap {
                flex: 0 0 auto;
                background-color: #F6F6F6;
                height: 93px;
                width: 93px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-right: 28px;
                .year {
                    margin-bottom: 10px;
                    color: #CBCBCB;
                    font-size: 18px;
                }
                .md {
                    font-size: 20px;
                    color: #DF1212;
                }
            }
            .info_wrap {
                flex: 1;
                width: 0;
                .title {
                    padding-right: 10px;
                    box-sizing: border-box;
                    height: 25px;
                    line-height: 25px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    font-size: 20px;
                    color: #333333;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .introduction {
                    padding-right: 10px;
                    box-sizing: border-box;
                    line-height: 28px;
                    height: 56px;
                    font-size: 16px;
                    color: #777777;
                    overflow: hidden;
                }
            }
        }
        .item:hover {
            box-shadow: 2px 2px 5px #333;
            cursor: pointer;
        }
    }
    .block {
        margin-top: 30px;
        margin-bottom: 50px;
        text-align: center;
    }
}
</style>
<template>
    <div class="reports">
        <titleView :title="title"></titleView>
        <div class="content">
            <div class="items">
                <div class="item" v-for="item in newsList" @click="linkTo(item.linkUrl)">
                    <div class="time_wrap">
                        <span class="year">{{item.year}}</span>
                        <span class="md">{{item.md}}</span>
                    </div>
                    <div class="info_wrap">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="introduction">
                            {{item.intro, 50 | filterTxt}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block">
            <el-pagination :total="total" layout="total, prev, pager, next" :page-size="12" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import titleView from '../../../components/about/title.vue'
import common from '../../../common/httpService.js'
export default {
    data() {
            return {
                httpParam: {
                    pSize: 10,
                    pn: 1,
                    type: -1
                },
                total: 0,
                title: {
                    enTitle: 'MEDIA REPORTS',
                    zhTitle: '媒体报道'
                },
                newsList: [],
            }
        },
        components: {
            titleView
        },
        mounted() {
            this.getHttp();
        },
        methods: {
            handleCurrentChange(val) {
                this.httpParam.pn = val;
                this.getHttp();
            },
            linkTo(url){
                let newWin = window.open();
                newWin.location.href = url;
            },
            getHttp() {
                let _self = this;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'queryCompanyNewsList',
                    biz_param: _self.httpParam
                };
                common.commonPost(url, body).then(function(res) {
                    let arr = res.biz_result.list;
                    arr.forEach(function(item) {
                        item.year = _self.getYear(item.ctime);
                        item.md = _self.getMD(item.ctime);
                    })                    
                    _self.total = res.biz_result.total;
                    _self.newsList = arr;
                }, function(err) {})
            },
            getYear(time) {
                let date = new Date(time);
                return date.getFullYear();
            },
            getMD(time) {
                let date = new Date(time);
                let M = date.getMonth() + 1;
                let d = date.getDate();
                M = M < 10 ? '0' + M : M;
                d = d < 10 ? '0' + d : d;
                return M + '-' + d
            },

        }
}
</script>
