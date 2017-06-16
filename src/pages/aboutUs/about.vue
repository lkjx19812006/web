<style  scoped>
.about {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    float: left;
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
}

.about .left {
    float: left;
    width: 180px;
}

.about .right {
    float: left;
    flex: 1;
    padding-left: 36px;
    box-sizing: border-box;
    margin-bottom: 130px;
}

.about .right .title_box {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin-top: 45px;
}

.about .right .title {
    float: left;
    height: 47px;
    border-bottom: 1px solid #FA8435;
    font-size: 20px;
    color: #676767;
}

.about .top {
    width: 100%;
    float: left;
    margin-top: 35px;
    margin-bottom: 20px;
}

.about .top img {
    width: 100%;
}

.about .right .list {
    width: 984px;
    margin-top: 26px;
    float: left;
}

.about .right .list .item {
    width: 32%;
    margin-right: 2%;
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px 10px;
    margin-bottom: 26px;
}

.about .right .list .active {
    margin-right: 0%;
}

.about .right .list .item .img {
    width: 100%;
    height: 210px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.about .right .list .item .img img {
    width:100%;
    min-height: 210px;
}


.about .right .list .item .name {
    font-size: 15px;
    line-height: 20px;
    height: 40px;
    cursor: pointer;
}
.about .right .list .item .tname:hover {
    color: #F98435;
}

.about .right .list .item .tname {
    height: 20px;
}

.about .right .list .item .time {
    margin-top: 5px;
    font-size: 14px;
    line-height: 14px;
    color: #666;
}

.about .right .list .item .look_detail {
    float: right;
    font-size: 14px;
    color: #FFD886;
    margin-top: 10px;
    cursor: pointer;
}

.block {
    float: right;
    width: 100%;
    text-align: center;
    margin-top: 30px;
}
</style>
<template>
    <div class="about">
        <div class="left">
            <myNav v-on:selectIt="selectIt" :param="param"></myNav>
        </div>
        <div class="right" v-show="show == 1">
            <div class="title_box">
                <div class="title">关于药材买卖网</div>
            </div>
            <div class="top">
                <img src="../../static/icon/abouts.jpg">
            </div>
            <div class="bottom">
                <div>
                    <p>药材买卖网（yaocaimaimai.com）”隶属于上海冕冠电子商务有限公司，是由知名VC、天使投资人投资千万人民币，旨在打造全球最大的药材交易平台，创始人曾在互联网上市公司“上海钢联”（股票代码300226）带领全国各地地推团队近300人，有丰富的行业积累和管理经验；曾在美金架构创投公司（找钢网）担任高管，短短3年时间，现在估值10亿美金；十年互联网从业经验，2015年6月从心出发，带领一群有梦想有激情的创业团队一起做一件颠覆整个行业的事。</p>
                    <p>2015电商风起云涌，但真正能存活下来的不多，商业模式大同小异，但真正能杀出来的寥寥无几，仅凭一个想法、一个创意、一个思维是不行的，我们需要的是像游戏中打boss一样，各路英豪群聚，互相配合并相互补位才能赢得最后的胜利，一同感受创业梦想实现的那一刻光辉，一起分享上市敲锤的那一刻喜悦！</p>
                    <p>如果你是强者，有创业的梦想却缺乏一个舞台；</p>
                    <p>如果你是智者，有跳跃的思维却缺乏一个空间；</p>
                    <p>如果你是勇士，有斗志昂扬的执行力却缺乏一个引路人；</p>
                    <p>------这里，舞台、空间、方向全部都给你，只等你来，只为等你！ 给我一个一起奋斗成长的3年，还你一个精彩无限的30年！</p>
                </div>
            </div>
        </div>
        <div class="right" v-show="show == 2">
            <div class="title_box">
                <div class="title">媒体视角</div>
            </div>
            <div class="list">
                <div class="item" v-for="(todo,index) in newsList" v-bind:class="{active:(index+1)%3==0}">
                    <div class="name tname" @click="lookDetail(todo.linkUrl)">{{todo.title,14 | filterTxt}}</div>
                    <div class="time">{{todo.ctime | formatBirth}}</div>
                    <div class="img" @click="lookDetail(todo.linkUrl)"><img :src="todo.imgUrl" id="img"></div>
                    <div class="name">{{todo.intro,33 | filterTxt}}</div>
                    <div class="look_detail" @click="lookDetail(todo.linkUrl)">
                        查看详情&nbsp;>
                    </div>
                </div>
            </div>
            <div class="block">
                <el-pagination :total="total" :current-page="currentPage3" layout="total,prev, pager, next, jumper" :page-size="12" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import myNav from '../../components/common/myNav.vue';
import common from '../../common/httpService.js'

let params = {
    type: -1,
    pn: 1,
    pSize: 12,
}
export default {
    name: 'about-view',
    data() {
        return {
            param: {
                title: '关于我们',
                first_item: '药材买卖网简介',
                second_item: '媒体视角'
            },
            imgType: true,
            httpParam: params,
            currentPage3: 1,

        }
    },
    components: {
        myNav
    },
    computed: {
        newsList() {
            return this.$store.state.news.newsList;
        },
        total() {
            return Number(this.$store.state.news.total);
        },
        show() {
            return this.$store.state.news.newIndex;
        }
    },
    created() {
        
    },
    mounted() {
        /*let img = document.getElementById('img');
        let width = img.style.width;
        let height = img.style.height;
        console.log(1,width)*/
        this.getHttp();
    },
    methods: {
        selectIt(index) {
            let _self = this;
            _self.$store.dispatch('getNewsIndex', index);
        },
        imgLink(link) {
            let newWin = window.open();
            newWin.location.href = link;
        },
        lookDetail(link) {
            let newWin = window.open();
            newWin.location.href = link;
        },
        handleCurrentChange(val) {
            this.httpParam.pn = val;
            this.getHttp();
        },
        getHttp() {
            let _self = this;
            this.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'pushService',
                biz_method: 'queryCompanyNewsList',
                biz_param: _self.httpParam
            };
            url = common.addSID(url);
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
