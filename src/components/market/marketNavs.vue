<style lang="less" scoped>
.marketnav {
    display: flex;
    width: 100%;
    border: 1px solid #F2F2F2;
    flex-direction: row;
    border-style: solid solid none none;
}

.marketnav .title {
    flex: 0 0 100px;
    align-items: center;
    font-size: 15px;
    background-color: #FFC852;
    line-height: 50px;
    color: white;
    text-align: center;
}

.marketnav .select {
    display: flex;
    flex-direction: row;
    flex: 1;
    color: #4C4C4C;
    font-size: 15px;
    flex-wrap: wrap;
}

.marketnav .select .item {
    flex: none;
    padding-left: 15px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}

.marketnav .select .item:hover {
    color: #fa6705;
}

.marketnav .select .active {
    color: #fa6705;
}

.market .main .left .search {
    display: flex;
    height: 50px;
    width: 100%;
    border: 1px solid #F2F2F2;
    flex-direction: row;
    border-style: solid solid solid none;
}

.market .main .left .search .search_title {
    height: 50px;
    width: 100px;
    font-size: 15px;
    background-color: #FEC852;
    line-height: 50px;
    color: white;
    text-align: center;
}

.market .main .left .search .search_content {
    margin-left: 20px;
    height: 50px;
    width: 300px;
    margin-top: 7px;
}

.search {
    .search_content {
        position: relative;
        width: 240px!important;
    }
    .btn_wrap {
        position: absolute;
        padding: 0 10px;
        right: 0px;
        top: 1px;
        color: #ccc;
    }
}
</style>
<template>
    <div>
        <div class="marketnav" v-for="title in titles">
            <div class="title">
                {{title.titleName}}
            </div>
            <div class="select">
                <div class="item" v-bind:class="{active:item.show && !isSearch}" v-for="(item,index) in title.titleList" :key="index" @click="selectClick(item,title)">{{item.name}}</div>
            </div>
        </div>
        <div class="search">
            <div class="search_title">
                按品名:
            </div>
            <div class="search_content">
                <search v-model="breedName" style="width: 100%" placeholder="请输入您需要的产品名称" v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></search>
                <div class="btn_wrap" @click="searchBreed">
                    <el-button type="text" icon="search"></el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import search from '../../components/search.vue'
export default {
    data() {
            return {
                breedName: '',
                isSearch: false,
                titles: [],
                cateGorys: []
            }
        },
        components: {
            search
        },
        props: {
            httpParam: {
                default: null
            }
        },
        mounted() {
            this.getTitle();
            this.getcategoryHttp();
        },
        methods: {
            searchBreed() {
                if (this.breedName == '') {
                    this.$message({
                        message: '请输入关键字',
                        type: 'info'
                    });
                    return;
                }
                this.isSearch = true;
                this.httpParam.letter = '';
                this.httpParam.area = '';
                this.httpParam.categoryId = '';
                this.httpParam.name = this.breedName;
                this.$emit("result", this.httpParam);
            },
            selectClick(item, title) {
                this.breedName = '';
                this.httpParam.name = '';
                this.isSearch = false;
                for (var i = 0; i < title.titleList.length; i++) {
                    title.titleList[i].show = false;
                }
                item.show = true;
                if (title.titleName == "按药市:") {
                    this.httpParam.area = item.id;
                }
                if (title.titleName == "按字母:") {
                    this.httpParam.letter = item.id;
                }
                if (title.titleName == "按类别:") {
                    this.httpParam.categoryId = item.id;
                }
                this.$emit("result", this.httpParam);
            },
            getcategoryHttp() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'herbCategory',
                    biz_param: {

                    }
                }).then(function(suc) {
                    var cateAry = [];
                    for (var i = 0; i < suc.biz_result.list.length; i++) {
                        cateAry.push({
                            id: suc.biz_result.list[i].id,
                            name: suc.biz_result.list[i].name,
                            show: false
                        });
                    }
                    _self.cateGorys = cateAry;
                    _self.getTitle();
                    console.log(_self.cateGorys);

                }).catch(function(err) {

                })
            },
            getTitle() {
                var letAry = [];
                letAry.push({
                    id: "",
                    name: "全部",
                    show: false
                });
                for (var i = 1; i < 27; i++) {
                    let num = String.fromCharCode((65 + i - 1));
                    let numUp = num.toUpperCase()
                    letAry.push({
                        id: numUp,
                        name: numUp,
                        show: false
                    });
                }
                console.log("letters" + letAry);
                var areaAry = ["亳州药市", "成都荷花池药市", "安国药市", "玉林药市"];
                var arAry = ["亳州", "荷花池", "安国", "玉林"];
                var areaResultAry = [];
                areaResultAry.push({
                    id: "",
                    name: "全部",
                    show: false
                });
                for (var i = 0; i < areaAry.length; i++) {
                    areaResultAry.push({
                        id: arAry[i],
                        name: areaAry[i],
                        show: false
                    });
                }
                console.log("areas" + areaResultAry);

                var resultAry = [];
                var titAry = ["按字母:", "按类别:", "按药市:"];

                resultAry.push({
                    titleName: titAry[0],
                    titleList: letAry
                });
                resultAry.push({
                    titleName: titAry[1],
                    titleList: this.cateGorys
                });
                resultAry.push({
                    titleName: titAry[2],
                    titleList: areaResultAry
                });
                console.log("titles" + resultAry);
                this.titles = resultAry;

            },
            handleSelect(val) {
                this.isSearch = true;
                this.httpParam.letter = '';
                this.httpParam.area = '';
                this.httpParam.categoryId = '';
                this.httpParam.name = this.breedName;
                this.$emit("result", this.httpParam);
            },
            querySearchAsync(queryString, cb) {
                let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
                if (!pattern.test(queryString)) {
                    cb([{
                        value: '请输入关键字',
                        keyWord: ''
                    }]);
                    return;
                };
                let _self = this;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    common.commonPost(common.urlCommon + common.apiUrl.most, {
                        biz_module: 'searchKeywordService',
                        biz_method: 'querySearchKeywordBreed',
                        biz_param: {
                            keyWord: queryString,
                            pn: 1,
                            pSize: 20
                        }
                    }).then(function(suc) {
                        let src = suc.biz_result.list;
                        for (var i = 0; i < src.length; i++) {
                            let obj = src[i];
                            obj.value = obj.breedName;
                            cb(suc.biz_result.list);
                        };
                    }).catch(function(err) {
                        cb([{
                            value: '请输入关键字',
                            keyWord: ''
                        }]);
                    });
                }, 300);
            },
        }
}
</script>
