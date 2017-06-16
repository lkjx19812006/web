<!-- 药材品种组件 -->
<style lang="less" scoped>
</style>
<template>
    <el-autocomplete style="width: 100%;" v-bind:value="value" :fetch-suggestions="querySearchAsync" placeholder="请输入药材名称" @select="handleSelect">
    </el-autocomplete>
</template>
<script>
import common from '../../common/httpService.js';
export default {
    name: 'breed',
    props: ['value'],
    data() {
        return {

        }
    },
    methods: {
        handleSelect(val) {
            console.log(1,val)
            this.$emit('getBreedId', val);
        },
        querySearchAsync(queryString, cb) {
            if (!queryString) {
                cb([{
                    value: '请输入关键字',
                    keyWord: ''
                }]);
                this.$emit('getBreedId', {
                    breedId: '',
                    breedName: ''
                });
                return;
            };
            this.$emit('getBreedId', {
                breedId: '',
                breedName: ''
            });
            let _self = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                let _self = this;
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
                    }
                    cb(src);
                }).catch(function(err) {
                    cb([]);
                })
            }, 500);

        },

    }
}
</script>
