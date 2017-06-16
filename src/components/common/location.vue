<style scoped>
</style>
<template>
    <el-autocomplete style="width: 100%;" v-bind:value="value" :fetch-suggestions="querySearchAsync" placeholder="请输入药材名称" @select="handleSelect">
    </el-autocomplete>
</template>
<script>
import httpService from '../../common/httpService.js';
export default {
    name: 'location',
    props: ['value'],
    data() {
        return {}
    },
    methods: {
        handleSelect(val) {
            if (val.breedId) {
                this.$emit('getLoca', val);
            }
        },
        querySearchAsync(queryString, cb) {
            if (!queryString) {
                cb([{
                    value: '请输入关键字',
                    keyWord: ''
                }]);
                return;
            }
            let _self = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                let url = httpService.urlCommon + httpService.apiUrl.most;
                let body = {
                    biz_module: 'breedService',
                    biz_method: 'queryLocalSpecList',
                    biz_param: {
                        keyWord: queryString,
                        pn: 1,
                        pSize: 20
                    }
                }
                let obj = {
                    body: body,
                    path: url
                }
                _self.$store.dispatch('sch_getInitNamePpl', obj).then(() => {
                    cb(_self.$store.state.search.namePpl.list);
                }, () => {
                    cb(_self.$store.state.search.namePpl.list);
                });
            }, 300);
        },

    }
}
</script>
