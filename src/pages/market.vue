<style lang="less" scoped>
.market {
    font-size: 15px;
    width: 100%;
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

.market .main .left {
    float: left;
    width: 70%;
}

.market .main .right {
    float: right;
    width: 27.5%;
}

.market .main .margin {
    height: 30px;
}

.market .foot {
    margin-top: 100px;
}

.market .main .bottom {
    text-align: center;
    margin-top: 10px;
}

.market .main .left .left_head {
    height: 50px;
    display: flex;
    flex-direction: row;
    border: 1px solid #FFC852;
}

.market .main .left .left_head>p {
    flex: 1;
    text-align: center;
    color: #676767;
}

.market .main .left .left_head>div {
    flex: 1;
    text-align: center;
    line-height: 50px;
}

.market .main .left .left_content {
    border: 1px solid #E9E2D9;
    border-style: none solid solid solid;
}

.market .main .left .left_content>ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.market .main .left .left_content>ul li {
    display: flex;
    flex-direction: row;
    border: 1px solid #FBFAF6;
    border-style: none none solid none;
}

.market .main .left .left_content>ul li p {
    flex: 1;
    text-align: center;
    color: #4C4C4C;
}

.market .main .left .left_content>ul li p img {
    height: 14px;
}

.market .main .left .left_content>ul li div {
    flex: 1;
    text-align: center;
    line-height: 50px;
}

.market .main .right .right_head {
    height: 60px;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.market .main .right .right_head>p {
    font-size: 23px;
    padding: 0;
    margin: 0;
    color: #676767;
    flex-basis: 100px;
}

.market .main .right .right_head>img {
    flex: 1;
    height: 8px;
    margin-top: 12px;
    box-sizing: border-box;
    flex-shrink: 1;
}

.market .main .right .right_content {
    border: 1px solid #E9E2D9;
    min-height: 790px;
}

.market .main .right .right_content>ul {
    list-style-type: none;
    padding: 0;
    margin-left: 10px;
    margin-right: 10px;
}

.market .main .right .right_content .right_content.head {
    margin-left: 10px;
    margin-right: 10px;
}

.market .main .right .right_content .right_content.head>img {
    width: 100%
}

.market .el-button--primary {
    background-color: #F98340;
    border: none;
}

.market .el-button {
    padding: 6px 6px;
}

.market .main .right .right_head .more {
    font-size: 16px;
    color: #8F8F8F;
    cursor: pointer;
    margin-top: 6px;
    text-align: right;
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

.echarts {
    width: 100%;
    height: 600px;
}
</style>
<template>
    <div class="market">
        <headerView tab='5'></headerView>
        <div class="main">
            <div class="left">
                <marketNav :httpParam="httpParam" v-on:result='getValue'></marketNav>
                <div class="margin"></div>
                <div class="left_head">
                    <p>品种</p>
                    <p>规格</p>
                    <p>产地</p>
                    <p>价格(元/公斤)</p>
                    <p>市场</p>
                    <div>涨跌幅度
                        <el-dropdown @command="handleCommand">
                            <el-button type="primary">
                                {{money}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="元">元</el-dropdown-item>
                                <el-dropdown-item command="%">百分比</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p>走势图</p>
                </div>
                <div class="left_content">
                    <ul>
                        <li v-for="market in tableData">
                            <p>{{market.name}}</p>
                            <p>{{market.spec}}</p>
                            <p>{{market.location}}</p>
                            <p>{{market.unitprice}}</p>
                            <p>{{market.area}}</p>
                            <p>
                                <span v-show="percent">{{market.dayMoney | floatType}}</span>
                                <span v-show="!percent">{{market.dayDowns | percentType}}</span>&nbsp;
                                <img src="/static/icon/up.png" v-show="market.dayMoney > 0">
                                <img src="/static/icon/down.png" v-show="market.dayMoney < 0">
                            </p>
                            <p @click="gesturesClick(market)"><img src="../static/icon/trend.png"></p>
                        </li>
                    </ul>
                </div>
                <div class="bottom">
                    <el-pagination @current-change="handleCurrentChange" :page-size="10" layout=" prev, pager, next,total, jumper" :total="totalNum">
                    </el-pagination>
                </div>
            </div>
            <div class="right">
                <div class="right_head">
                    <p>行业动态</p>
                    <p class='more' @click='getMore'>更多 >></p>
                </div>
                <div class="right_content">
                    <mediaNew></mediaNew>
                </div>
            </div>
            <div style="width: 100%; height:0px; clear: both "></div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import common from '../common/httpService.js'
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
import mediaNew from '../components/market/mediaNews.vue'
import marketNav from '../components/market/marketNavs.vue'
export default {
    name: 'market_view',
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
                breedId: '',
                pn: 1,
                pSize: 10
            },
            more: false,
            newsParam: {
                type: -1,
                title: "",
                pn: 1,
                pSize: 10

            },
        }

    },
    created() {
        let _self = this;
        this.getHttp();
        if (this.$store.state.news.newsList.length === 0) {
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

    },
    methods: {
        gesturesClick(market) {
            let name = market.name;
            let breedId = market.breedId;
            let spec = market.spec;
            let area = market.area;
            let location = market.location;
            let unitprice = market.unitprice;
            var id = "name=" + name + ";breedId=" + breedId + ";spec=" + spec + ";area=" + area + ";location=" + location + ";unitprice=" + unitprice;
            this.$router.push('/echart/' + id);
        },
        getMore() {
            let _self = this;
            this.$router.push('/industry/1');
        },
        back() {
            this.more = false;
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
        getValue(params) {
            this.$store.dispatch('clearsMarketName');
            this.httpParam = params
            this.getHttp();
        },
        getHttp() {
            let _self = this;
            this.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'breedService',
                biz_method: 'queryWebBreedPrice',
                biz_param: _self.httpParam
            };
            //url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getMarketList', {
                body: body,
                path: url
            }).then(() => {
                _self.loading = false
            }, () => {
                _self.loading = false
            });
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
        },

    },
    mounted() {}
}
</script>
