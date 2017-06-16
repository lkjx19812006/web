<style scoped>
</style>
<template>
  <div>
    <el-autocomplete style="width: 100%;" :value="value" :fetch-suggestions="querySearchAsync" placeholder="请输入药材名称" @select="handleSelect">
    </el-autocomplete>
  </div>
</template>
<script>
import httpService from '../../common/httpService.js';
export default {
  props: ['value'],
  data() {
    return {}
  },
  methods: {
    handleSelect(val) {
      if (val.breedId) {
        this.$emit('getBreedId', val);
      }
    },
    querySearchAsync(queryString, cb) {
      let _self = this;
      if (!queryString) {
        if (_self.$store.state.search.namePpl.list.length != 0) {
          cb(_self.$store.state.search.namePpl.list);
        } else {
          cb([{
            value: '请输入关键字',
            keyWord: ''
          }]);
        }
        return;
      }

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let url = httpService.urlCommon + httpService.apiUrl.most;
        let body = {
          biz_module: 'searchKeywordService',
          biz_method: 'querySearchKeywordBreed',
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
