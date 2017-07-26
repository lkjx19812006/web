<style lang="less" scoped>
  .my_report_price {
    .list {
      margin-top: 30px;
      .orange {
        color: #FA8535;
        display: inline-block;
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        border: 1px solid #FA8535;
        border-radius: 2px;
        margin-right: 5px;
        padding: 0 10px;
      }
      .green {
        display: inline-block;
        height: 25px;
        line-height: 25px;
        border: 1px solid #58BC85;
        color: #58BC85;
        cursor: pointer;
        border-radius: 2px;
        padding: 0 10px;
        position: relative;
        .employ {
          position: absolute;
          display: flex;
          flex-direction: row;
          z-index: 999;
          color: #fff;
          width: 180px;
          line-height: 32px;
          border-radius: 5px;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          background-color: #1f2d3d;
          left: 0;
          top: -45px;
          margin-left: 50%;
          transform: translate(-90px, 0);
          font-size: 12px;
          span {
            color: #1f2d3d;
            position: absolute;
            bottom: -10px;
            width: 6px;
            left: 0;
            margin-left: 50%;
            transform: translate(-3px, 0);
          }
        }
      }
      .again {
        position: relative;
        .erm_wrap_content {
          position: absolute;
          left: 0;
          top: -135px;
          z-index: 9999;
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
          margin-left: 50%;
          transform: translate(-65px, 0);
          margin-bottom: 10px;
          span {
            padding: 2px 0;
          }
        }
      }
      .gray {
        display: inline-block;
        height: 25px;
        line-height: 25px;
        border: 1px solid #D3D3D3;
        color: #D3D3D3;
        cursor: not-allowed;
        border-radius: 2px;
        padding: 0 10px;
      }
      .block {
        float: right;
        margin-top: 20px;
      }
    }
    .detail {
      color: #5D5D5D;
      .title {
        .name {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          margin-top: 30px;
          font-size: 18px;
          line-height: 18px;
          color: #7AB257;
          margin-bottom: 21px;
          img {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="my_report_price">
    <titleHead :param="myhead" v-on:empty='empty'></titleHead>
    <div class="list" v-show='!detail && !top_detail'>
      <template>
        <el-table :data="myList" border style="width: 100%">
          <el-table-column label="报价时间" width="120">
            <template scope="scope">
              <span>{{scope.row.otime | formatBirth}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="breedName" label="品名" width="100">
          </el-table-column>
          <el-table-column prop="spec" label="规格" width="100">
            <template scope="scope">
              <span>{{scope.row.spec, 4 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="location" label="产地" width="90">
            <template scope="scope">
              <span>{{scope.row.location, 4 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="数量" width="100">
            <template scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="报价">
            <template scope="scope">
              <span>{{scope.row.price + '元/' + scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template scope="scope">
              <span v-if="scope.row.accept == 0">受理中</span>
              <span v-if="scope.row.accept == 1">已采用</span>
              <span v-if="scope.row.accept == 2">未采用</span>
              <span v-if="scope.row.accept == 3">受理中</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template scope="scope">
              <span class='orange' @click="jumpDetail(scope.row)">详情</span>
              <!-- 受理中 可以再次报价 -->
              <!--<span class="gray" v-if="scope.row.accept == 0 || scope.row.accept == 3">联系专属客服</span>-->

              <!-- 受理中未采用 未过期 都可以报价-->
              <span class='green again' v-if="scope.row.accept != 1 && ValidateOverTime(scope.row.overTime)"
                    v-on:mouseenter="scope.row.showEWM = true" v-on:mouseleave="scope.row.showEWM = false">
                扫码再次报价
                <div class="erm_wrap_content" v-show="scope.row.showEWM">
                    <qrcode type="image" level="H" :size="106" :value="getEWMUrl(scope.row)"></qrcode>
                </div>
              </span>
              <!-- 受理中未采用 已过期过期 不能报价-->
              <span class="gray" v-if="scope.row.accept != 1 && !ValidateOverTime(scope.row.overTime)">扫码再次报价</span>

              <!--报价成功 联系客服-->
              <span class='green' v-on:mouseenter="scope.row.showtips = true"
                    v-on:mouseleave="scope.row.showtips = false" @click="jumpDetail(scope.row)"
                    v-if="scope.row.accept == 1">
                联系专属客服
                <div class="employ"
                     v-show="scope.row.showtips && scope.row.employeeName && scope.row.employeeMobil">
                    {{scope.row.employeeName + ' ' + scope.row.employeeMobil}}
                    <span class="el-icon-caret-bottom"></span>
                </div>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination layout="prev, pager, next" :total="totalNum" :page-size="10"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </template>
    </div>
    <div class='detail' v-if='detail != "" && top_detail != ""'>
      <div class='title'>
        <div class='name'>
          <img src="../../static/icon/myOffer1.png" height="23" width="23">
          <span>求购信息</span>
        </div>
        <div class="offer_info_wrap">
          <myOfferResDetail :detailObj="top_detail"></myOfferResDetail>
        </div>
      </div>
      <div class='title'>
        <div class='name'>
          <img src="../../static/icon/myoffer2.png" height="24" width="23">
          <span>我的报价</span>
        </div>
        <div class="offer_price_wrap">
          <myOfferPrice :detailObj="detail" :topDetail="top_detail"></myOfferPrice>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import titleHead from '../../components/common/headTitle'
  import myOfferResDetail from '../../components/my/myOfferResDetail.vue'
  import myOfferPrice from '../../components/my/myOfferPrice.vue'
  import qrcode from 'v-qrcode'
  export default {
    name: 'report-price-view',
    data() {
      return {
        showEWM: -1,
        httpParam: {
          sort: {
            "pubdate": "0",
            "duedate": "0",
            "offer": "0"
          },
          sampling: 0,
          pn: 1,
          pSize: 10
        },
        popParam: {
          mydetail: false,
          title: '药材卖点',
          contents: ''
        },

        show: false,
        loading: false,
        myhead: {
          name: '我的报价',
          title: ''
        },
        detail: '',
        top_detail: '',
        detailParam: {
          intentionId: '',
          pn: 1,
          pSize: 10
        },
        intentionId: '',
        id: '',
        edit: false,
        images: []
      }

    },
    computed: {
      myList() {
        return this.$store.state.reportPrice.userReportPriList;
      },
      totalNum() {
        return Number(this.$store.state.reportPrice.userReportTotal);
      }
    },
    components: {
      titleHead,
      myOfferResDetail,
      myOfferPrice,
      qrcode
    },
    created() {
      //确定消息中心带过来的数据
      if (this.$route.query && this.$route.query.intentionId && this.$route.query.intentionId != undefined) {
        this.intentionId = this.$route.query.intentionId;
        this.getDetail(this.intentionId);
        this.getTopDetail(this.intentionId);
      }
    },
    mounted() {
      this.getHttp();
    },
    methods: {
      ValidateOverTime(param){
        if (parseFloat(param) <= 0) {
          return false;
        } else {
          return true;
        }
      },
      showTips(index) {
        this.myList[index].showtips = true;
      },
      getEWMUrl(row) {
        return common.commonGetEWMURL(row.breedName, row.intentionId);
      },
      handleCurrentChange(val) {
        this.httpParam.pn = val;
        this.getHttp();
      },
      getHttp() {
        let _self = this;
        this.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionOfferService',
          biz_method: 'htmlMyIntentionOfferList',
          biz_param: _self.httpParam
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('userReportPri', {
          body: body,
          path: url
        }).then(() => {
          _self.loading = false
        }, () => {
          _self.loading = false
        });
      },
      lookDetail(contents) {
        this.popParam.mydetail = true;
        this.popParam.contents = contents;
      },
      empty() {
        this.detail = '';
        this.top_detail = '';
      },
      lookPic(images) {
        this.edit = true;
        this.images = images;
      },
      jumpDetail(row) {
        this.id = row.id;
        this.getTopDetail(row.intentionId);
        this.getDetail(row.intentionId);
      },
      handleChange(val) {
        this.detailParam.pn = val;
        this.getDetail(this.id);
      },
      getDetail(id) {
        let _self = this;
        this.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionOfferService',
          biz_method: 'htmlMyIntentionOfferListInfo',
          biz_param: {
            pn: 1,
            pSize: 10,
            intentionId: id
          }
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body)
          .then(function (res) {
            if (res.code == '1c01') {
              _self.detail = res.biz_result;
              console.log(1, res);
              _self.myhead.title = '返回报价列表'
            }
          })
          .catch(function (err) {

          })
      },
      getTopDetail(id) {
        let _self = this;
        this.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionService',
          biz_method: 'queryIntentionInfo',
          biz_param: {
            id: id
          }
        };
        common.commonPost(url, body)
          .then(function (res) {
            if (res.code == '1c01') {
              _self.top_detail = res.biz_result;
            }
          })
          .catch(function (err) {

          })
      }
    }
  }
</script>
