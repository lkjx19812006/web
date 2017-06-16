<style lang="less" scoped>
.market {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    float: left;
    height: 100%;
    width: 100%;
    overflow: scroll;
    position: relative;
}

.gray {
    background-color: #F5F5F5;
}

.market .main {
    width: 1200px;
    margin: 40px auto;
    min-height: 850px;
    margin-bottom: 50px;
}

.market .main .bottom {
    text-align: center;
    margin-top: 10px;
}

.market {
    .main {
        .back {
            cursor: pointer;
            float: right;
            display: flex;
            margin-bottom: 15px;
            flex-directtion: row;
            font-size: 16px;
            color: #FC8535;
            img {
                margin-right: 10px;
            }
        }
        .list {
            width: 100%;
            display: flex;
            flex-direction: column;
            .item {
                margin-bottom: 30px;
                width: 100%;
                box-sizing: border-box;
                padding: 35px 0;
                display: flex;
                flex-direction: row;
                background-color: #fff;
                .left {
                    height: 90px;
                    width: 150px;
                    border-right: 1px solid #D2D2D2;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    color: #656565;
                    padding: 11px 0 15px 0;
                    box-sizing: border-box;
                    .date_top {
                        width: 100%;
                        font-size: 38px;
                        line-height: 38px;
                        margin-bottom: 10px;
                    }
                    .date_bottom {
                        width: 100%;
                        font-size: 16px;
                        line-height: 16px;
                    }
                }
                .right {
                    flex: 1;
                    box-sizing: border-box;
                    padding: 0 45px 0 65px;
                    .right_top {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                    .right_bottom {
                        span {
                            color: #34B052;
                            cursor: pointer;
                        }
                        font-size:15px;
                        color:#656565;
                        line-height:25px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="market">
        <headerView tab='11'></headerView>
        <div class='main' v-show='more'>
            <div class='list'>
                <div class='item' v-for='todo in newsList'>
                    <div class='left'>
                        <div class='date_top'>{{todo.ctime | day}}</div>
                        <div class='date_bottom'>{{todo.ctime | yearAndMonth}}</div>
                    </div>
                    <div class='right'>
                        <div class='right_top'>
                            {{todo.title}}
                        </div>
                        <div class='right_bottom'>
                            {{todo.intro,90 | filterTxt}}<span @click='linkTo(todo.linkUrl)'>【详情】</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <el-pagination @current-change="changeVal" :page-size="10" layout=" prev, pager, next,total, jumper" :total="newsTotal">
                    </el-pagination>
                </div>
            </div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import headerView from '../../components/header.vue'
import footerView from '../../components/foot.vue'
import mediaNew from '../../components/market/mediaNews.vue'
import marketNav from '../../components/market/marketNavs.vue'
import breed from '../../components/publish/breed.vue'
export default {
    data() {
            return {
                money: "元",
                percent: true,
                input: '',
                httpParam: {
                    area: "",
                    letter: "",
                    categoryId: '-1',
                    name: "",
                    pn: 1,
                    pSize: 10
                },
                more: true,
                newsParam: {
                    type: -1,
                    title: "",
                    pn: 1,
                    pSize: 10

                }
            }

        },
        created() {
            let _self = this;
            if (this.$store.state.news.newsList.length == 0) {
                this.getnewsHttp();
            }
            if (this.$store.state.marketlist.name) {
                this.httpParam.name = this.$store.state.marketlist.name;
            }
        },
        computed: {
            newsList() {
                return this.$store.state.news.newsList
            },
            newsTotal() {
                return Number(this.$store.state.news.total);
            },
            tableData() {
                return this.$store.state.marketlist.marketList
            },
            totalNum() {
                return Number(this.$store.state.marketlist.marketTotalNum);
            }
        },
        components: {
            headerView,
            footerView,
            marketNav,
            mediaNew,
            breed
        },
        methods: {
            gesturesClick(name) {
                console.log(name);
            },
            getMore() {
                let _self = this;
                _self.more = true;
            },
            back() {
                this.more = false;
            },
            getBreedId(params) {
                console.log(params);
                this.input = params.breedName;
                this.handleIconClick();
            },
            linkTo(path) {
                let newWin = window.open();
                newWin.location.href = path;
            },
            changeVal(val) {
                let _self = this;
                _self.newsParam.pn = val;
                _self.getnewsHttp();
            },
            handleCommand(command) {
                if (command == "元") {
                    this.percent = true;
                } else {
                    this.percent = false;
                }
                this.money = command;
                //console.log(command, this.percent);
            },
            handleCurrentChange(val) {
                if (this.$store.state.marketlist.name && this.$store.state.marketlist.name != '') {
                    this.httpParam.name = this.$store.state.marketlist.name;
                }
                this.httpParam.pn = val;
                this.getHttp();
            },
            handleIconClick(ev) {
                this.httpParam.name = this.input;
                this.getHttp();
            },
            getnewsHttp() {
                let _self = this;
                this.loading = true;
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'queryCompanyNewsList',
                    biz_param: _self.newsParam
                };
                // url = common.addSID(url);
                body.version = 1;
                let localTime = new Date().getTime();
                body.time = localTime + common.difTime;
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getNewsList', {
                    body: body,
                    path: url
                }).then(() => {
                    _self.loading = false
                }, () => {
                    _self.loading = false
                });
            }
        }
}
</script>
