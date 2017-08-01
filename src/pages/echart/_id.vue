<style lang="less" scoped>
.echart {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    width: 100%;
    position: relative;
    .box {
        min-height: 900px;
        .head {
            width: 1200px;
            margin: 45px auto;
            border: 1px solid #E6E6E6;
            border-bottom: none;
            .list {
                height: 50px;
                line-height: 50px;
                display: flex;
                flex-direction: row;
                align-items: center;
                border-bottom: 1px solid #E6E6E6;
                .title {
                    width: 75px;
                    height: 50px;
                    color: #fff;
                    background-color: #FFC945;
                    text-align: center;
                    margin-right: 18px;
                }
                .content {
                    width: 1123px;
                    display: flex;
                    flex-direction: row;
                    .drug_market {
                        height: 30px;
                        padding: 0 12px;
                        margin-right: 8px;
                        line-height: 30px;
                        border-radius: 3px;
                        font-size: 15px;
                        color: #6E6E6E;
                        cursor: pointer;
                    }
                    .item {
                        height: 30px;
                        padding: 0 12px;
                        margin-right: 8px;
                        line-height: 30px;
                        border-radius: 3px;
                        font-size: 15px;
                        background-color: #79C69C;
                        color: #fff;
                        cursor: pointer;
                    }
                }
            }
        }
        .main {
            width: 1200px;
            margin: 40px auto;
            margin-bottom: 50px;
            .top {
                height: 80px;
                width: 1200px;
                border: 1px solid #E6E6E6;
                border-bottom: none;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                position: relative;
                .left {
                    width: 460px;
                    .now_price {
                        float: right;
                        font-size: 17px;
                        color: #FF4341;
                        margin-right: 50px;
                    }
                }
                .center {
                    width: 460px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    .word {
                        width: 40px;
                        font-size: 15px;
                        text-align: center;
                    }
                    .start,
                    .end {
                        width: 160px;
                    }
                }
                .right {
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    .week {
                        width: 90px;
                        height: 36px;
                        background-color: #79C69C;
                        color: #fff;
                        border-radius: 3px;
                        line-height: 36px;
                        font-size: 15px;
                        text-align: center;
                        margin-left: 30px;
                        cursor: pointer;
                    }
                    .month {
                        background-color: #FFC945;
                    }
                }
                .white {
                    position: absolute;
                    width: 600px;
                    background: #fff;
                    opacity: 0;
                    height: 30px;
                    bottom: -60px;
                    z-index: 1000000;
                }
            }
            #myChart {
                border: 1px solid #E6E6E6;
                padding: 35px 20px;
            }
        }
    }
}
</style>
<template>
    <div class="echart">
        <headerView tab="13"></headerView>
        <div class="box">
            <div class="head">
                <div class="list">
                    <div class="title">品名</div>
                    <div class="content">
                        <div class='item'>{{name}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">规格</div>
                    <div class="content">
                        <div class='item'>{{formData.spec}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">产地</div>
                    <div class="content">
                        <div class='item'>{{formData.location}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">药市</div>
                    <div class="content">
                        <div v-for="todo in arr" class='drug_market' v-bind:class="{item:todo.show}" @click="selectMarket(todo)">{{todo.name}}</div>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="top">
                    <div class="left">
                        <div class="now_price">当前价格：{{unitprice}}元/公斤</div>
                    </div>
                    <div class="center">
                        <div class="word">从</div>
                        <div class="start">
                            <el-date-picker v-model="start" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                            </el-date-picker>
                        </div>
                        <div class="word">到</div>
                        <div class="end">
                            <el-date-picker v-model="end" :change="change()" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="right">
                        <div class="week" @click="thisWeek">周走势</div>
                        <div class="week month" @click="thisMonth">月走势</div>
                    </div>
                    <div class="white"></div>
                </div>
                <div id="myChart" :style="{width:'1160px',height:'415px'}">
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

export default {
    name: 'echart-view',
    data() {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            start: '',
            end: '',
            arr: [{
                name: '亳州药市',
                type: '亳州',
                show: false
            }, {
                name: '成都荷花池',
                type: '荷花池',
                show: false
            }, {
                name: '安国药市',
                type: '安国',
                show: false
            }, {
                name: '玉林药市',
                type: '玉林',
                show: false
            }],
            active: false,
            loading: false,
            formData: {
                breedId: '',
                spec: '',
                areaList: [],
                location: '',
                endTime: '',
                startTime: ''
            },
            area: '',
            name: '',
            unitprice: '',
            option: {
                title: {
                    text: '元/公斤',
                    textStyle: {
                        color: '#4D4D4D',
                        fontSize: '18'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['亳州药市', '成都荷花池药市', '安国药市', '玉林药市']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    right: 20,
                    feature: {
                        saveAsImage: {
                            title:'保存'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    //show: true,   //default true
                    showDelay: 0, //显示延时，添加显示延时可以避免频繁切换
                    hideDelay: 50, //隐藏延时
                    transitionDuration: 0, //动画变换时长
                    backgroundColor: '#000', //背景颜色（此时为默认色）
                    borderRadius: 8, //边框圆角
                    padding: 10, // [5, 10, 15, 20] 内边距
                    position: function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] + 10, p[1] - 10];
                    },
                },
                series: [],
                color: ['#7BC69B', '#FA8535', '#F54C9F', '#00A0E8']
            },
            start_index: '',
            series: [{
                name: '亳州药市',
                type: 'line',
                stack: '总量1',
                data: [1, 1, 1, 1, 2]
            }, {
                name: '成都荷花池药市',
                type: 'line',
                stack: '总量2',
                data: [2, 2, 2, 2, 3]
            }, {
                name: '安国药市',
                type: 'line',
                stack: '总量3',
                data: [3, 3, 3, 3, 4]
            }, {
                name: '玉林药市',
                type: 'line',
                stack: '总量4',
                data: [4, 4, 4, 4, 5]
            }],
            xData: []

        }
    },
    components: {
        headerView,
        footerView
    },
    computed: {

    },
    created() {
        let _self = this;
        let id = this.$route.params.id;
        let arr = id.split(';');
        for (var item in arr) {
            _self.name = arr[0].split('=')[1];
            _self.formData.breedId = arr[1].split('=')[1];
            _self.formData.spec = arr[2].split('=')[1];
            _self.area = arr[3].split('=')[1];
            _self.formData.location = arr[4].split('=')[1];
            _self.unitprice = arr[5].split('=')[1];
        }
        switch (_self.area) {
            case '亳州':
                _self.arr[0].show = true;
                _self.start_index = 0;
                break;
            case '荷花池':
                _self.arr[1].show = true;
                _self.start_index = 1;
                break;
            case '安国':
                _self.arr[2].show = true;
                _self.start_index = 2;
                break;
            case '玉林':
                _self.arr[3].show = true;
                _self.start_index = 3;
                break;
        }
        _self.formData.areaList = [];
        _self.formData.areaList.push(_self.area);
        this.getMarket();

    },
    mounted() {
        let _self = this;
        this.option.series.push(this.series[_self.start_index]);
        this.getEchart();
    },
    methods: {
        getMarket() {
            let _self = this;
            this.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            //let url = "http://apps.yaocaimaimai.com/front"
            let body = {
                biz_module: 'breedService',
                biz_method: 'breedPriceChat',
                biz_param: _self.formData
            };
            //url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body).then(function(suc) {
                let data = suc.biz_result.list;
                _self.xData = [];
                _self.series[0].data = [];
                _self.series[1].data = [];
                _self.series[2].data = [];
                _self.series[3].data = [];
                //有的药市有 有的药市没有 这种情况下 凑数据 否则 线条长度不一致
                for (var i = 0; i < data.length; i++) {
                    _self.xData.unshift(data[i].pricaDate);
                    for (var j = 0; j < data[i].showDate.length; j++) {
                        switch (data[i].showDate[j].area) {
                            case '亳州':
                                //判断其他3个药市有没有数据
                                _self.series[0].data.unshift(data[i].showDate[j].unitprice);
                                break;
                            case '荷花池':
                                _self.series[1].data.unshift(data[i].showDate[j].unitprice);
                                break;
                            case '安国':
                                _self.series[2].data.unshift(data[i].showDate[j].unitprice);
                                break;
                            case '玉林':
                                _self.series[3].data.unshift(data[i].showDate[j].unitprice);
                                break;
                        }

                    }

                }
                _self.option.xAxis.data = _self.xData;
                _self.option.series = _self.series
                _self.getEchart();
            }).catch(function(err) {

            })
        },
        selectMarket(todo) {
            let _self = this;
            todo.show = !todo.show;
            this.option.series = [];
            this.formData.areaList = [];
            for (var item in _self.arr) {
                if (_self.arr[item].show) {
                    _self.formData.areaList.push(_self.arr[item].type);
                }
            }
            // console.log(221, _self.formData.areaList)
            _self.getMarket();
            this.getEchart();
        },
        getEchart() {
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption(this.option);
        },
        change() {
            let start = this.userBirthday(this.start);
            let end = this.userBirthday(this.end);
            if (start && end) {
                this.formData.startTime = start;
                this.formData.endTime = end;
                this.getMarket();
            }
        },
        thisWeek() {
            let now = new Date();
            let time = now.getTime() - 604800000;
            let nowTime = this.userBirthday(now);
            //console.log(now)
            let beforeWeek = this.userBirthday(time);
            this.formData.startTime = beforeWeek;
            this.formData.endTime = nowTime;
            this.start = this.backBirthday(time);
            this.end = this.backBirthday(now);
            this.getMarket();
        },
        thisMonth() {
            let now = new Date();
            let time = now.getTime() - 2592000000;
            let nowTime = this.userBirthday(now);
            console.log(12121, now)
            let beforeMonth = this.userBirthday(time);
            this.formData.startTime = beforeMonth;
            this.formData.endTime = nowTime;
            this.start = this.backBirthday(time);
            this.end = this.backBirthday(now);
            this.getMarket();
        },
        userBirthday(time) {
            if (!time || time === '' || time == 0) {
                return '';
            } else {
                let date = new Date(time);
                let y = date.getFullYear();
                let M = date.getMonth() + 1;
                let d = date.getDate();
                let h = date.getHours();
                let m = date.getMinutes();
                let s = date.getSeconds();
                M = M < 10 ? '0' + M : M;
                d = d < 10 ? '0' + d : d;
                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                return y + M + d;
            }
        },
        backBirthday(time) {
            if (!time || time === '' || time == 0) {
                return '';
            } else {
                let date = new Date(time);
                let y = date.getFullYear();
                let M = date.getMonth() + 1;
                let d = date.getDate();
                let h = date.getHours();
                let m = date.getMinutes();
                let s = date.getSeconds();
                M = M < 10 ? '0' + M : M;
                d = d < 10 ? '0' + d : d;
                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                return y + '-' + M + '-' + d;
            }
        }
    }
}
</script>
