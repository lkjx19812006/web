<style lang="less" scoped>
.need_text_condition {
    display: flex;
    flex-direction: row;
    background-color: #FBFAF6;
    align-items: center;
    justify-content: space-around;
    .condition_detail {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 1 auto;
        flex-direction: row;
        padding: 10px 15px;
        .condition_detail_label {
            width: 60px;
            font-size: 14px;
            color: #666;
        }
        .condition_detail_input {
            width: 185px;
        }
    }
}
</style>
<template>
    <div class="need_text_condition">
        <div class="condition_detail">
            <p class="condition_detail_label">商品</p>
            <!--  <breedSearch v-on:getBreedId="getBreed" :value="value" class="condition_detail_input"></breedSearch> -->
            <mySearch v-model="httpParam.keyWord" placeholder="请输入查询的药材名称" v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></mySearch>
            <!-- <el-input v-model="httpParam.keyWord" placeholder="请输入商品名称" class="condition_detail_input"></el-input> -->
        </div>
        <div class="condition_detail">
            <p class="condition_detail_label">规格</p>
            <el-input v-model="httpParam.spec" placeholder="请输入商品规格" class="condition_detail_input"></el-input>
            <!--  <el-select v-model="httpParam.spec" placeholder="请选择商品规格" v-show="httpParam.keyWord">
                <el-option v-for="item in options" :label="item.name" :value="item.name">
                </el-option>
            </el-select> -->
        </div>
        <div class="condition_detail">
            <p class="condition_detail_label">产地</p>
            <el-select v-model="httpParam.location" filterable multiple placeholder="请选择" :change="selectValue()">
                <el-option-group v-for="group in options" :label="group.key" :key="group">
                    <el-option v-for="(item, index) in group.value" :key="index" :label="item.name" :value="item.locationId">
                    </el-option>
                </el-option-group>
            </el-select>
        </div>
        <el-button type="primary" size="large" class="orange_button" @click="search()">搜索</el-button>
    </div>
</template>
<script>
import breedSearch from '../common/breed.vue';
import common from '../../common/httpService.js';
import mySearch from '../../components/search.vue'
export default {

    data() {
            return {
                name: '',
                spec: '',
                value: '',
                options: []
            }
        },
        watch: {
            isTabNum(newVal, oldVal) {
                this.httpParam.keyWord = '';
                this.httpParam.spec = '';
                this.httpParam.location = [];
            }
        },
        computed: {
            isTabNum() {
                return this.$store.state.search.isTabNum;
            }
        },
        props: {
            httpParam: {}
        },
        components: {
            breedSearch,
            mySearch
        },
        mounted() {
            this.getLocation();
        },
        methods: {
            selectValue() {

            },
            getLocation() {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'queryBreedLocalList',
                    biz_param: {

                    }
                }).then(function(suc) {

                    _self.options = suc.biz_result.list;
                    console.log(_self.options)
                }).catch(function(err) {

                })
            },
            search() {
                let obj = {
                    type: 'need',
                    pn: 1
                };
                this.$emit('getData', obj);
            },
            getBreed(data) {
                this.httpParam.keyWord = data.breedName;
                this.getSpec(data.breedId);
            },
            getSpec(breedId) {
                let _self = this;
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'queryBreedSpecList',
                    biz_param: {
                        breedId: breedId
                    }
                }).then(function(suc) {


                }).catch(function(err) {

                })

            },
            handleSelect(val) {
                this.search();
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
