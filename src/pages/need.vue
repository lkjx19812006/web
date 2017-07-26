<style lang="less" scoped>
  @width: 1200px;
  body {
    .content_body {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -moz-box-orient: vertical;
      -moz-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      .content {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 800px;
        .body_content {
          width: 1200px;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          .need_detail {
            background-color: #FCFCFC;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            min-height: 150px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #FCFCFC;
            position: relative;
            .need_detail_left {
              flex: 1 0 auto;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              height: 185px;
              padding-left: 28px;
              .title {
                flex: 0 0 auto;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-top: 15px;
                margin-bottom: 5px;
                .img_icon {
                  max-width: 40px;
                  margin-right: 10px;
                }
                .hName {
                  font-size: 26px;
                  color: #333333;
                  margin-right: 5px;
                }
                .number {
                  font-size: 18px;
                  color: #333333;
                }
                .isMy {
                  font-size: 14px;
                  color: #fff;
                  padding: 4px 10px;
                  background-color: #fa5748;
                  margin-right: 10px;
                }
                .location {
                  font-size: 16px;
                  color: #fff;
                  padding: 3px 8px;
                  background-color: #FA8435;
                  margin: 0 10px;
                }
                .spec {
                  font-size: 16px;
                  color: #fff;
                  padding: 3px 8px;
                  background-color: #FFC71A;
                }
              }
              .detail {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .detail_item {
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  font-size: 16px;
                  color: #666666;
                  line-height: 36px;
                  .htit {
                    flex: 0 0 auto;
                  }
                  .info {
                    flex: 1;
                  }
                }
              }
            }
            .need_detail_center {
              flex: 0 0 280px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .date_icon_wrap {
                display: flex;
                flex-direction: row;
                aliggn-item: center;
                font-size: 18px;
                line-height: 22px;
                color: #FA8435;
                img {
                  margin-right: 8px;
                }
              }
              .date_txt_wrap {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                aliggn-item: center;
                font-size: 14px;
                color: #666666;
              }
            }
            .need_detail_right {
              flex: 0 1 260px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-left: 1px solid #EBEBEB;
              .erm_wrap_content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                width: 120px;
                padding: 5px;
                padding-top: 12px;
                border-radius: 5px;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
                border: 1px solid #d1dbe5;
                margin-bottom: 10px;
                span {
                  padding: 2px 0;
                }
              }
              .offer_info_num {
                font-size: 16px;
                color: #333333;
              }
            }
            .img_wrap {
              position: absolute;
              width: 89px;
              height: 65px;
              left: -1px;
              top: -1px;
              img {
                width: 89px;
                height: 65px;
                vertical-align: middle;
              }
            }
          }
          .need_top {
            padding-top: 30px;
          }
          // .need_detail:hover {
          //     background-color: #fff;
          //     border: 1px solid #FA8435;
          //     .border_orange_button {
          //         background-color: #FA8435;
          //         color: #fff;
          //     }
          // }
          .page {
            padding: 20px 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="content_body" v-loading.fullscreen.lock="fullscreenLoading">
    <headerView tab="2"></headerView>
    <div class="content">
      <div class="body_content">
        <needTextCondition :httpParam="httpParam" v-on:getData="getHttp" type="need"></needTextCondition>
        <needCondition :httpParam="httpParam" v-on:getData="getHttp"></needCondition>
        <!-- v-show="item.isMy == '0'" -->
        <div class="need_detail" :class="{'need_top':item.indentType === 0}" v-for="(item,index) in needList">
          <div class="need_detail_left">
            <div class="title">
              <img class="img_icon" :src="item.cFlagsPath">
              <span class="isMy" v-show="item.isMy === 1">我的</span>
              <span class="hName">{{item.breedName}}</span>
              <span class="number">{{item.number}}({{item.unit}})</span>
              <span class="location">{{item.location, 10 | filterTxt}}</span>
              <span class="spec" v-if="item.spec != ''">{{item.spec, 10 | filterTxt}}</span>
            </div>
            <div class="detail">
              <div class="detail_item" v-if="false">
                <span class="htit">付款方式：</span>
                <span class="info"
                      v-if="item.paymentWay != '' && item.paymentWay != '其他：'">{{item.paymentWay, 28 | filterTxt}}</span>
                <span class="info" v-else>面议</span>
              </div>
              <div class="detail_item">
                <span class="htit">交货地点：</span>
                <span class="info" v-if="item.address != ''">{{item.province + ',' + item.city}}</span>
                <span class="info" v-else>面议</span>
              </div>
              <div class="detail_item">
                <span class="htit">质量要求：</span>
                <span class="info">{{item.quality, 28 | filterTxt}}</span>
              </div>
              <div class="detail_item">
                <span class="htit" v-if="item.indentType === 0">药厂备注：</span>
                <span class="htit" v-if="item.indentType != 0">备注信息：</span>
                <span class="info" v-if="item.description != ''">{{item.description, 28 | filterTxt}}</span>
                <span class="info" v-else>符合药典</span>
              </div>
            </div>
          </div>
          <div class="need_detail_center">
            <div class="date_icon_wrap">
              <img src="../static/icon/dateIcon.png" height="22" width="22">
              <span>剩余{{item.duedate | timeDateNum}}天</span>
            </div>
            <div class="date_txt_wrap">
              <span>上架时间：</span>
              <span v-if="item.shelveTime">{{item.shelveTime | formatBirth}}</span>
              <span v-else>近期上架</span>
            </div>
          </div>
          <div class="need_detail_right">
            <div class="erm_wrap_content">
              <!-- value="item.ewmUrl" -->
              <qrcode type="image" level="H" :size="106" :value="item.ewmUrl"></qrcode>
              <span>扫码报价</span>
            </div>
            <div class="offer_info_num">
              <span>已有</span>
              <span style="color: #FA8435">{{item.offer}}</span>
              <span>人报价</span>
            </div>
          </div>
          <div class="img_wrap" v-if="item.indentType === 0">
            <img src="../static/icon/yaochangneed.png">
          </div>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="httpParam.pn" :page-size="httpParam.pSize"
                         layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <footerView></footerView>
    s
  </div>
</template>
<script>
  import common from '../common/httpService.js'
  import headerView from '../components/header.vue'
  import footerView from '../components/foot.vue'
  import needTextCondition from '../components/need/needTextCondition.vue'
  import needCondition from '../components/need/needCondition.vue'
  import qrcode from 'v-qrcode'
  let httpParam = {
    sort: {
      "offer": "0",
      "duedate": "0",
      "shelve_time": "0",
    },
    province: [],
    keyWord: '',
    indentType: '-1',
    pn: 1,
    pSize: 10,
    spec: ''
  }
  export default {
    name: 'need_view',
    data() {
      return {
        intentionId: '',
        showEWMIndex: -1,
        httpParam: httpParam,
        fullscreenLoading: false
      }
    },
    components: {
      headerView,
      footerView,
      needTextCondition,
      needCondition,
      qrcode
    },
    watch: {
      needValue() {
        this.httpParam.pn = 1;
        this.httpParam.keyWord = this.$store.state.search.searchValue.needValue;
      }
    },
    created() {
      //确定消息中心带过来的数据
      if (this.$route.query && this.$route.query.intentionId && this.$route.query.intentionId != undefined) {
        this.httpParam.keyWord = '';
        this.intentionId = this.$route.query.intentionId;
        this.getHttpById(this.intentionId);
      }
    },
    computed: {
      needList() {
        //处理二维码
        let arr = this.$store.state.resource.needAllList.list;
        for (var i = 0; i < arr.length; i++) {
          let obj = arr[i];
          obj.ewmUrl = common.commonGetEWMURL(obj.breedName, obj.id);
        }
        return arr;
      },
      total() {
        return this.$store.state.resource.needAllList.total
      },
      user() {
        return this.$store.state.user.user
      },
      needValue() {
        return this.$store.state.search.searchValue.needValue
      }
    },
    mounted() {
      if (this.intentionId === '') {
        if (this.$store.state.search.searchValue.needValue) {
          this.httpParam.keyWord = this.$store.state.search.searchValue.needValue;
        } else {
          this.httpParam.keyWord = '';
        }
        this.httpParam.pn = 1;
        if (this.$store.state.resource.needAllList.list.length === 0) {
          this.getHttp();
        }
      }
    },
    methods: {
      goDetail(item, user) {
        let _self = this;
        if (this.user.phone && !this.user.fullname) {
          this.$alert('您还未完善个人信息,立即去完善', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/member/personalInformation');
            }
          });
          return;
        }
        ;
        if (user.phone) {
          this.$router.push("/needDetail/" + item.id);
          // let newWin = window.open();
          // newWin.location.href = "/needDetail/" + item.id;
          return;
        } else {
          this.$store.dispatch('setUrl', "/need").then(() => {
            this.$router.push('/login');
          });
          return;
          // _self.$message({ // showClose: true, // message: '请先登录', // type: 'warning' // });
        }
      },
      getHttp(params) {
        //确定是头部搜索组件下来的请求
        if (params && params.type === 'need') {
          this.httpParam.pn = params.pn
        }
        ;
        let _self = this;
        this.fullscreenLoading = true;
        let url = common.urlCommon + common.apiUrl.most;
        if (common.SID) url = common.addSID(url);
        this.$store.dispatch('getNeedAllList', {
          body: {
            biz_module: 'intentionService',
            biz_method: 'queryBegBuyList',
            biz_param: _self.httpParam
          },
          path: url
        }).then(() => {
          _self.fullscreenLoading = false;
        }, () => {
          _self.fullscreenLoading = false;
        });
      },
      getHttpById(intentionId) {
        let _self = this;
        this.fullscreenLoading = true;
        let url = common.urlCommon + common.apiUrl.most;
        if (common.SID) url = common.addSID(url);
        this.$store.dispatch('getNeedAllList', {
          body: {
            biz_module: 'intentionService',
            biz_method: 'queryIntentionInList',
            biz_param: {
              id: intentionId,
              type: 0
            }
          },
          path: url
        }).then(() => {
          _self.fullscreenLoading = false;
        }, () => {
          _self.fullscreenLoading = false;
        });
      },
      handleCurrentChange(val) {
        this.httpParam.pn = val;
        this.getHttp();
      }
    }
  }
</script>
