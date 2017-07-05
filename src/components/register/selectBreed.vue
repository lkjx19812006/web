<style lang="less" scoped>
.selectBreed {
    width: 1200px;
    margin: auto;
    .title {
        display: flex;
        flex-direction: column;
        justify-conten: flex-start;
        align-items: center;
        .big_tit {
            font-size: 18px;
            color: #3A3A3A;
            margin-bottom: 20px;
        }
        .small_tit {
            font-size: 14px;
            color: #999999;
        }
    }
    .content_wrap {
        width: 730px;
        margin: auto;
        margin-top: 38px;
        .search_wrap {
            position: relative;
            i {
                font-size: 18px;
                position: absolute;
                left: 15px;
                top: 15px;
                color: #97A8BE;
            }
            .el-input__inner {
                height: 46px;
            }
        }
        .selected_wrap {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-top: 30px;
            height: 96px;
            .item_wrap {
                flex: 0 0 auto;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 20px;
                margin-right: 35px;
                position: relative;
                .name {
                    height: 28px;
                    padding: 0 20px;
                    color: #fff;
                    background-color: #F4AF08;
                    line-height: 28px;
                }
                .close {
                    position: absolute;
                    right: -10px;
                    top: -6px;
                    cursor: pointer;
                }
            }
            .select_none {
                height: 96px;
                line-height: 96px;
                color: #999;
                text-align: center;
                width: 100%;
            }
        }
        .hotBreed_wrap {
            margin-top: 20px;
            border: 1px solid #EBEBEB;
            .title_wrap {
                padding: 0 25px;
                .hot_itle {
                    height: 50px;
                    line-height: 50px;
                    font-size: 16px;
                    color: #FA8435;
                    border-bottom: 1px solid #D1D1D1;
                    text-align: left;
                }
            }
            .hot_items {
                padding: 18px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .item {
                    color: #666666;
                    font-size: 16px;
                    padding: 6px 18px;
                    border: 1px solid #E6E6E6;
                    cursor: pointer;
                    margin: 0 10px;
                    margin-bottom: 17px;
                }
                .item:hover {
                    color: #F4AF08;
                    border-color: #F4AF08;
                }
                .item_active {
                    color: #F4AF08;
                    border-color: #F4AF08;
                }
            }
        }
    }
    .btn_wrap {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 45px 0;
        span {
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            height: 38px;
            line-height: 38px;
            padding: 0 50px;
            text-align: center;
            border-radius: 4px;
        }
        .back_btn {
            background-color: #fff;
            color: #FF8A00;
            border: 1px solid #FF8A00;
            margin-right: 32px;
        }
        .next_btn {
            background-color: #FF8A00;
            border: 1px solid #FF8A00;
        }
        .select {
            display: block !important;
        }
    }
    .showModal {
        opacity: 1;
        display: block;
    }
}
</style>
<template>
    <div class="selectBreed">
        <div class="title">
            <span class="big_tit">
                您主要经营什么品种
            </span>
            <span class="small_tit">
                您最多可以挑选10个品种，我们会根据宁的经营品种实时推送相关订单给您
            </span>
        </div>
        <div class="content_wrap">
            <div class="search_wrap">
                <el-autocomplete v-model="breedName" @select="handleSelect" style="width: 100%;" :fetch-suggestions="querySearchAsync" placeholder="请输入您的主要经营品种，点击选中！！！">
                    <template slot="append">
                        <div v-on:click="clear">取消</div>
                    </template>
                </el-autocomplete>
                <i class="el-icon-search"></i>
            </div>
            <div class="selected_wrap">
                <div class="item_wrap" v-for="(item, index) in breedLists">
                    <span class="name">
                        {{item.breedName}}
                    </span>
                    <img @click="deleteBreed(item, index)" class="close" src="../../../static/icon/breedClose.png" height="21" width="21">
                </div>
                <div class="select_none" v-show="breedLists.length === 0">
                    暂未选择经营品种
                </div>
            </div>
            <div class="hotBreed_wrap">
                <div class="title_wrap">
                    <div class="hot_itle">
                        热门品种
                    </div>
                </div>
                <div class="hot_items">
                    <span @click="addHotBreed(item)" :class="{'item_active': item.selected}" class="item" v-for="item in hotList">
                        {{item.breedName}}
                    </span>
                </div>
            </div>
        </div>
        <div class="btn_wrap">
            <span class="back_btn" @click.self.stop="backStep">
                返回上一步
            </span>
            <span class="next_btn" @click.self.stop="nextStep">
                完成
            </span>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    data() {
            return {
                breedLists: [],
                timeout: '',
                breedName: '',
                hotList: [],
            }
        },
        methods: {
            backStep() {
                //返回步骤6
                this.$emit('step', 3)
            },
            nextStep() {
                let bizMain = [];
                if (this.breedLists.length === 0) {
                    this.$message({
                        message: '请选择经营品种，以便能更好的为您服务！！！',
                        type: 'warning'
                    });
                    return;
                } else {
                    this.breedLists.forEach(function(item) {
                        bizMain.push(item.breedName);
                    });
                    //进入步骤5
                    this.$emit('step', 5, bizMain.join(','));
                }
            },
            handleSelect(val) {
                if (!this.validateBreedLists()) {
                    return;
                }
                //下拉列表选中时，先查找已选中是否有选中了的 如果有则不添加
                var flag = true;
                for (var i = 0; i < this.breedLists.length; i++) {
                    if (val.breedName === this.breedLists[i].breedName) {
                        flag = false;
                        this.$message({
                            message: '您已添加该品种！！！',
                            type: 'warning'
                        });
                        break;
                    }
                }
                if (flag) {
                    this.breedLists.push(val);
                    this.breedName = '';
                    //并且查看热门搜索中是否有存在的名字 有则高亮
                    for (var i = 0; i < this.hotList.length; i++) {
                        if (val.breedName === this.hotList[i].breedName) {
                            this.hotList[i].selected = true;
                            break;
                        }
                    }
                }
            },
            deleteBreed(item, index) {
                //删除时 先查看热门搜索中有无选择项 有先清除热门选中
                for (var i = 0; i < this.hotList.length; i++) {
                    if (item.breedName === this.hotList[i].breedName) {
                        this.hotList[i].selected = false;
                        break;
                    }
                }
                //清除选中项
                this.breedLists.splice(index, 1);
                console.log(this.breedLists)
            },
            clear() {
                this.breedName = '';
            },
            addHotBreed(item) {
                if (!item.selected) {
                    if (!this.validateBreedLists()) {
                        return;
                    }
                    item.selected = true;
                    this.breedLists.push(item)
                } else {
                    //再次点击时去掉选项
                    for (var i = 0; i < this.breedLists.length; i++) {
                        if (item.breedName === this.breedLists[i].breedName) {
                            this.breedLists.splice(i, 1);
                            item.selected = false;
                            break;
                        }
                    }
                }
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
                        cb([]);
                    });
                }, 300);
            },
            validateBreedLists() {
                if (this.breedLists.length >= 10) {
                    this.$message({
                        message: '经营品种数量不能超过10个！！！',
                        type: 'warning'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            getHot() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'hotDrugPropertiesInfo',
                    biz_param: {
                        pn: 1,
                        pSize: 30
                    }
                }).then(function(suc) {
                    //处理已选择过的经营品种
                    let arr = suc.biz_result.list;
                    let result = [];
                    if (_self.$store.state.user.user.bizMain !== '') {
                        let result = _self.$store.state.user.user.bizMain.split(',');
                    }
                    result.forEach(function(item) {
                        _self.breedLists.push({
                            breedName: item
                        })
                    });
                    //遍历所有热搜 高亮显示
                    arr.forEach(function(item) {
                        item.selected = false;
                        item.breedName = item.name;
                        for (var i = 0; i < _self.breedLists.length; i++) {
                            var breed = _self.breedLists[i];
                            if (breed.breedName === item.breedName) {
                                item.selected = true;
                                break;
                            }
                        }
                    })
                    _self.hotList = arr;
                }).catch(function(err) {

                })
            }
        },
        created() {
            this.getHot();
        }

}
</script>
