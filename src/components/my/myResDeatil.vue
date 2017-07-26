<style lang="less" scoped>
  .ttbox {
    .detail {
      display: flex;
      flex-direction: row;
      .swiper {
        width: 355px;
        .img_wrap {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          img {
            flex: 1;
            width: 100%;
          }
        }
      }
      .info {
        flex: 1;
        padding-left: 45px;
        box-sizing: border-box;
        .breedname {
          font-size: 24px;
          color: #F88532;
          line-height: 26px;
          margin-bottom: 30px;
          span {
            font-size: 17px;
            color: #5D5D5D;
          }
        }
        .row {
          display: flex;
          flex-direction: row;
          font-size: 17px;
          line-height: 17px;
          color: #5D5D5D;
          .left {
            display: flex;
            flex: 1;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .right {
            display: flex;
            flex: 1;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .tit {
            flex: 0 1 auto;
          }
          .cnt {
            flex: 1;
          }
          margin-bottom: 30px;
          .content {
            flex: 1;
            padding-right: 25px;
          }
        }
        .trow {
          line-height: 30px;
          .name {
            flex: 0 0 auto;
          }
          .content {
            flex: 1;
          }
        }
      }
    }
    .buttom {
      float: right;
      width: 100%;
      padding-right: 35px;
      margin-top: 35px;
      div {
        width: 100px;
        height: 40px;
        color: #fff;
        font-size: 20px;
        line-height: 40px;
        text-align: center;
        border-radius: 3px;
        margin-left: 35px;
      }
      .resive {
        float: right;
        background: #FFAB1A;
        cursor: pointer;
      }
      .delet {
        float: right;
        background: #F98435;
      }
    }
  }
</style>
<template>
  <div class='ttbox' v-if='detailObj'>
    <div class='detail'>
      <div class="swiper" v-show='!need'>
        <el-carousel height="280px" indicator-position='none'>
          <el-carousel-item v-for="(todo, index) in detailObj.image" :key="index">
            <div class="img_wrap">
              <img :src="todo">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class='info'>
        <div class='breedname'>{{detailObj.breedName}}
          <span v-show="detailObj.onSell == 1">（申请中）</span>
          <span v-show="detailObj.onSell == 2">（已上架）</span>
          <span v-show="detailObj.onSell == -2">（上架失败）</span>
          <span v-show="detailObj.onSell == 4">（已下架）</span>
          <span v-show="detailObj.onSell == 3">（已下架）</span>
        </div>
        <div class='row'>
          <div class='left'>
            <span class="tit">发布日期：</span>
            <span class="cnt">{{detailObj.pubdate | formatBirth}}</span>
          </div>
          <div class='right'>
            <span class="tit">产品规格：</span>
            <span class="cnt">{{detailObj.spec}}</span>
          </div>
        </div>
        <div class='row'>
          <div class='left'>
            <span class="tit">产品产地：</span>
            <span class="cnt">{{detailObj.location}}</span>
          </div>
          <div class='right'>
            <span class="tit">需求数量：</span>
            <span class="cnt">{{detailObj.number}}{{detailObj.unit}}</span>
          </div>
        </div>
        <div class='row'>
          <div class='left'>
            <span class="tit">报价次数：</span>
            <span class="cnt">{{detailObj.offer}}次</span>
          </div>
          <div class='right'>
            <span class="tit">剩余时间：</span>
            <span class="cnt">{{ValidateOverTime(detailObj.overTime)}}</span>
          </div>
        </div>
        <div class='row trow'>
          <div class='name' v-if="type === 0">产品卖点：</div>
          <div class='name' v-if="type === 1">产品需求点：</div>
          <div class='content'>
            {{detailObj.quality}}
          </div>
        </div>
      </div>
    </div>
    <div class='buttom'>
      <div class='resive' @click='resive(detailObj.id)'>编辑</div>
      <!-- <div class='delet' @click='delet(detailObj.id)'>删除</div> -->
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'

  export default {
    data() {
      return {
        textarea: '',
        loading: false,

      }
    },
    props: {
      detailObj: '',
      need: '',
      type: ''
    },
    methods: {
      ValidateOverTime(param){
        if (parseFloat(param) <= 0) {
          return '已过期';
        } else if (parseFloat(param) > 30 && param.indexOf('天') > -1) {
          return '30天';
        } else {
          return param;
        }
      },
      getDetail(id) {
        let _self = this;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'queryIntentionInfo',
          biz_param: {
            id: id
          }
        };
        //url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body)
          .then(function (res) {
            _self.loading = false;
            _self.detailObj = res.biz_result;
            console.log(res.biz_result)
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      delet(id) {
        let _self = this;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'deleteIntentionInfo',
          biz_param: {
            id: id
          }
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body)
          .then(function (res) {
            _self.loading = false;
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      resive(id) {
        if (!this.need) this.$router.push('/publish/resource/' + id);
        if (this.need) this.$router.push('/publish/need/' + id);
      }

    }
  }
</script>
