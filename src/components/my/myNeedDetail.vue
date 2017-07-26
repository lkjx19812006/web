<style lang="less" scoped>
  .myNeedDetail {
    .detail {
      width: 960px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: 1px solid #F0F0F0;
      position: relative;
      .detail_left {
        width: 650px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 25px;
        padding-left: 45px;
        padding-bottom: 25px;
        padding-right: 20px;
        div {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          line-height: 36px;
          color: #666666;
        }
        .title_name {
          margin-bottom: 10px;
          .hName {
            font-size: 26px;
            color: #333333;
            margin-right: 5px;
          }
          .number {
            font-size: 18px;
            color: #333333;
          }
        }
        .spec_wrap {
          .spec {
            font-size: 16px;
            color: #fff;
            padding: 3px 8px;
            background-color: #FFC71A;
          }
        }
        .location_wrap {
          .location {
            font-size: 16px;
            color: #fff;
            padding: 3px 8px;
            background-color: #FA8435;
            margin: 0 10px;
          }
        }
        .detail_tit {
          flex: 0 1 auto;
        }
        .detail_info {
          flex: 1;
        }
      }
      .detail_right {
        padding: 25px 0;
        flex: 1 1 300px;
        display: flex;
        flex-direction: row;
        .detail_date_wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .date_icon_wrap {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 22px;
            margin-bottom: 15px;
            img {
              margin-right: 10px;
            }
            span {
              font-size: 18px;
              color: #FA8435;
            }
          }
          .date_txt_wrap {
            font-size: 16px;
            color: #999999;
            margin-bottom: 5px;
          }
          .num_txt_wrap {
            font-size: 16px;
            color: #333;
          }
        }
        .detail_date_line {
          flex: 0 1 1px;
          background: url('../../static/icon/spaceLine.png') no-repeat center;
        }
      }
      .validate_img_wrap {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .button_wrap {
      padding: 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      border: 1px solid #f0f0f0;
      border-top: 0 none;
      div {
        height: 46px;
        width: 140px;
        color: #fff;
        border-radius: 4px;
        line-height: 46px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
      .edit_btn {
        margin-right: 35px;
        background-color: #fab735;
        border: 1px solid #fab735;
      }
      .end_btn {
        color: #666666;
        background-color: #f7f7f7;
        border: 1px solid #ebebeb;
      }
      .agin_btn {
        color: #fff;
        background-color: #97cb90;
        border: 1px solid #97cb90;
      }
    }
    .validate_wrap {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 11px 0;
      background-color: #fbfbfb;
      border: 1px solid #F0F0F0;
      border-top: 0 none;
      img {
        margin-right: 20px;
      }
      .txt_info {
        font-size: 18px;
        color: #66a85e;
      }
    }
  }
</style>
<template>
  <div class='myNeedDetail'>
    <div class='detail'>
      <div class="detail_left">
        <div class="title_name">
          <span class="hName">{{detailObj.breedName}}</span>
          <span class="number">(&nbsp;{{detailObj.number + detailObj.unit}}&nbsp;)</span>
        </div>
        <div class="spec_wrap">
          <span class="detail_tit">规格：</span>
          <span class="detail_info">{{detailObj.spec}}</span>
        </div>
        <div class="location_wrap">
          <span class="detail_tit">产地：</span>
          <span class="detail_info">{{detailObj.location}}</span>
        </div>
        <div class="detail_wrap">
          <span class="detail_tit">质量要求：</span>
          <span class="detail_info">{{detailObj.quality}}</span>
        </div>
        <div class="detail_wrap">
          <span class="detail_tit">交货地点：</span>
          <span class="detail_info">{{detailObj.address}}</span>
        </div>
        <div class="detail_wrap" v-if="false">
          <span class="detail_tit">付款方式：</span>
          <span class="detail_info">{{detailObj.paymentWay}}</span>
        </div>
        <div class="detail_wrap">
          <span class="detail_tit" v-if="detailObj.indentType === 0">药厂备注：</span>
          <span class="detail_tit" v-if="detailObj.indentType != 0">备注信息：</span>
          <span class="detail_info">{{detailObj.description}}</span>
        </div>
      </div>
      <div class="detail_right">
        <div class="detail_date_line">
        </div>
        <div class="detail_date_wrap">
          <div class="date_icon_wrap" v-if="detailObj.onSell != 4">
            <img src="../../static/icon/dateIcon.png" height="22" width="22">
            <span>{{ValidateOverTime(detailObj.overTime)}}</span>
          </div>
          <div class="date_txt_wrap">
            <span>上架时间：</span>
            <span v-if="detailObj.shelveTime != ''">{{detailObj.shelveTime | formatBirth}}</span>
            <span v-if="detailObj.shelveTime == ''">暂未上架</span>
          </div>
          <div class="num_txt_wrap">
            <span>已有</span>
            <span style="color: #FA8435">{{detailObj.offer}}</span>
            <span>人报价</span>
          </div>
        </div>
      </div>
      <div class="validate_img_wrap">
        <img src="../../static/icon/xjing.png" height="94" width="133" v-if="detailObj.onSell === 2">
        <img src="../../static/icon/xjend.png" height="94" width="133"
             v-if="detailObj.onSell === 4 || detailObj.onSell ===3">
        <img src="../../static/icon/xjvalidate.png" height="94" width="133"
             v-if="detailObj.onSell === 0 || detailObj.onSell === 1">
      </div>
    </div>
    <div class='button_wrap' v-if="detailObj.onSell != 1 && detailObj.onSell != 0">
      <div class='edit_btn' @click='resive(detailObj.id)'>编辑</div>
      <div class='end_btn' @click='endEnquiry(detailObj.id)' v-if="detailObj.onSell === 2">结束询价</div>
      <div class='agin_btn' @click='resive(detailObj.id)' v-if="detailObj.onSell === 4 || detailObj.onSell ===3">再次询价
      </div>
    </div>
    <div class="validate_wrap" v-else>
      <img src="../../static/icon/myNeedValidate.png" height="75" width="75">
      <span class="txt_info">喵喵正在全力审核您的求购信息，请耐心等待</span>
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
      detailObj: ''
    },
    methods: {
      ValidateOverTime(param){
        if (parseFloat(param) <= 0) {
          return '已过期';
        } else if (parseFloat(param) > 30 && param.indexOf('天') > -1) {
          return '剩余30天';
        } else {
          return '剩余' + param;
        }
      },
      resive(id) {
        this.$router.push('/publish/need/' + id);
      },
      endEnquiryHttp(id) {
        let _self = this;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'endEnquiry',
          biz_param: {
            intentionId: id
          }
        };
        //url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body)
          .then(function (res) {
            _self.$emit('endOrAgn', {
              type: 'endEnquiry',
              id: id
            });
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      endEnquiry(id) {
        this.$confirm('确定结束询价吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.endEnquiryHttp(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }

    }
  }
</script>
