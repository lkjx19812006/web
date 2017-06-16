<style lang="less" scoped>
.presell_text_condition {
    display: flex;
    flex-direction: row;
    background-color: #FBFAF6;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
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
    <div class="presell_text_condition">
        <div class="condition_detail">
            <p class="condition_detail_label">商品</p>
            <search v-model="httpParam.breedName" placeholder="请输入查询的药材名称" v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></search>
        </div>
        <!-- <div class="condition_detail">
            <p class="condition_detail_label">规格</p>
            <el-input v-model="httpParam.spec" placeholder="请输入商品规格" class="condition_detail_input"></el-input>
        </div> -->
        <div class="condition_detail">
            <p class="condition_detail_label">出口国</p>
            <el-select @change="selectC" v-model="httpParam.country" :clearable="true" filterable placeholder="请输入出口国">
                <el-option v-for="(item, index) in countrys" :key="index" :label="item.cname" :value="item.id">
                </el-option>
            </el-select>
            <!-- <el-input v-model="httpParam.country" placeholder="请输入出口国" class="condition_detail_input"></el-input> -->
        </div>
        <div class="condition_detail">
            <p class="condition_detail_label" style="width: 80px;">到港时间</p>
            <el-select @change="selectChange" v-model="httpParam.arriveTime" placeholder="请选择">
                <el-option label="默认" :value="0">
                </el-option>
                <el-option label="升序" :value="1">
                </el-option>
                <el-option label="降序" :value="2">
                </el-option>
            </el-select>
        </div>
        <el-button type="primary" size="large" class="orange_button" @click="search()">搜索</el-button>
    </div>
</template>
<script>
import search from '../../components/search.vue'
import common from '../../common/httpService.js'
export default {
    data() {
            return {
                name: '',
                spec: ''
            }
        },
        watch: {
            isTabNum(newVal, oldVal) {
                this.httpParam.breedName = '';
                this.httpParam.country = '';
                this.httpParam.arriveTime = 0;
            }
        },
        props: {
            httpParam: {}
        },
        computed: {
            countrys() {
                return this.$store.state.search.countryList;
            },
            isTabNum() {
                return this.$store.state.search.isTabNum;
            }
        },
        components: {
            search,
        },
        methods: {
            search() {
                let obj = {
                    type: 'presell',
                    pn: 1
                }
                this.$emit('getData', obj);
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
            selectChange() {
                this.search();
            },
            selectC() {
                this.search();
            }
        }
}
</script>
