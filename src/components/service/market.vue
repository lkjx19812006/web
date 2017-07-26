<style lang="less" scoped>
  .service_market_compent {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 10px;
    .input_search {
      margin-top: 20px;
      display: flex;
      flex: 0 1 auto;
      justify-content: center;
      width: 300px;
      .search_button {
        margin-left: 10px;
        width: 90px;
      }
    }
    .breed_table {
      display: flex;
      flex-direction: column;
      width: 370px;
      align-items: flex-start;
      padding-bottom: 10px;
      a {
        text-indent: 10px;
        text-decoration: none;
      }
      a:hover {
        > p {
          color: #FA8435;
        }
        cursor: pointer;
      }
      p {
        font-size: 14px;
        color: #7F7F7F;
        font-weight: bold;
      }
      .bread_detail {
        display: flex;
        flex-direction: row;
        width: 360px;
        align-items: flex-start;
        justify-content: space-between;
        padding-bottom: 10px;
        padding-left: 10px;
        font-size: 14px;
        color: #7F7F7F;
        span {
          text-align: left;
          width: 90px;
        }
      }
    }
    .breed_table_bottom {
      border-bottom: 1px solid #e6e6e6;
    }
  }
</style>
<template>
  <div class="service_market_compent">
    <div class="input_search">
      <search v-model="breedName" placeholder="请输入查询的药材名称" v-on:fetch-suggestions="querySearchAsync"
              v-on:select="handleSelect"></search>
      <el-button v-on:click="search" icon="search" size="middle" class="orange_button search_button"></el-button>
    </div>
    <div class="breed_table">
      <router-link to="/market">
        <p>市场行情</p>
      </router-link>
      <div class="bread_detail" v-for="(item,index) in list">
        <span>{{item.name, 3 | filterTxt}}</span>
        <span>{{item.spec, 3 | filterTxt}}</span>
        <span>{{item.location, 4 | filterTxt}}</span>
        <span>{{item.unitprice + '元/公斤' | filterSeven}}</span>
        <span style="text-align: center; flex: 0 0 auto">{{item.dayMoney | percentType}}
                    <img src="../../assets/images/up.png" v-show="item.dayMoney > 0">
                    <img src="../../assets/images/down.png" v-show="item.dayMoney < 0">
                </span>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import search from '../../components/search.vue'
  export default {
    name: 'service_market_view',
    data() {
      return {
        breedName: '',
        list: []
      }
    },
    components: {
      search
    },
    methods: {
      getMarket() {
        let _self = this;
        common.commonPost(common.urlCommon + common.apiUrl.most, {
          biz_module: 'breedService',
          biz_method: 'queryWebBreedPrice',
          biz_param: {
            pn: 1,
            pSize: 10
          }
        }).then(function (suc) {
          console.log(suc);
          _self.list = suc.biz_result.list;
          _self.$store.dispatch('marketList', _self.list);
        }).catch(function (err) {

        })
      },
      search() {
        let _self = this;
        this.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'breedService',
          biz_method: 'queryWebBreedPrice',
          biz_param: {
            name: this.breedName,
            pn: 1,
            pSize: 10
          }
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
          this.$store.dispatch('setMarketName', this.breedName).then(() => {
            this.$router.push('/market');
          });

        }, () => {
        });
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
        }
        ;
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
          }).then(function (suc) {
            let src = suc.biz_result.list;
            for (var i = 0; i < src.length; i++) {
              let obj = src[i];
              obj.value = obj.breedName;
              cb(suc.biz_result.list);
            }
            ;
          }).catch(function (err) {
            cb([{
              value: '请输入关键字',
              keyWord: ''
            }]);
          });
        }, 300);
      },
    },
    mounted() {
      if (this.$store.state.search.marketList.length === 0) {
        this.getMarket();
      } else {
        this.list = this.$store.state.search.marketList;
      }
      ;

    }
  }
</script>
