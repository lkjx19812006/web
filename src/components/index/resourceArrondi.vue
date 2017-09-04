<style lang="less" scoped>
  .resource_arrondi_compent {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 50px;
    box-sizing: border-box;
    .need_table {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .title {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        width: 100%;
        margin-bottom: 16px;
        .title_name {
          font-size: 22px;
          color: #676767;
          flex: 0 0 auto;
        }
        .title_more {
          font-size: 16px;
          color: #8F8F8F;
          flex: 0 0 auto;
          cursor: pointer;
        }
      }
      .table {
        box-sizing: border-box;
        border-top: 2px solid #F98435;
        .tbox {
          display: flex;
          flex-direction: row;
          text-align: center;
          div {
            flex: 1;
          }
          img {
            width: 11px;
            height: 20px;
          }
        }
        .phone {
          cursor: pointer;
          height: 40px;
          width: 64px;
          background: url('../../assets/images/phone-green.png') no-repeat center;
        }
        .phone:hover {
          cursor: pointer;
          height: 40px;
          width: 64px;
          background: url('../../assets/images/phone-ogange.png') no-repeat center;
        }
        .orange_btn {
          height: 12px;
          line-height: 12px;
          padding: 7px 5px;
          font-size: 12px;
          color: #fff;
          border: 1px solid #FA8435;
          background-color: #FA8435;
          border-radius: 2px;
          cursor: pointer;
        }
        .orange_btn:hover {
          background-color: #FA8435;
          color: #fff;
        }
        .red_btn {
          border: 1px solid #fa5748;
          background-color: #fa5748;
        }
      }
    }
    .deal {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      box-sizing: border-box;
      .title {
        box-sizing: border-box;
        font-size: 22px;
        color: #676767;
        flex: 0 0 auto;
        margin-bottom: 16px;
      }
    }
  }
</style>
<template>
  <div class="resource_arrondi_compent">
    <div class="need_table">
      <div class="title">
        <div class="title_name">资源专区</div>
        <div class="title_more" v-on:click="linkTo">更多 >></div>
      </div>
      <div class="table">
        <el-table :data="resourceList" style="width: 100%;border:none;text-align:center">
          <el-table-column prop="breedName" label="品名" width="115">
            <template scope="scope">
              <span>{{scope.row.breedName, 4 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="125">
            <template scope="scope">
              <span>{{scope.row.spec, 5 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产地" width="125">
            <template scope="scope">
              <span>{{scope.row.location, 5 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="160">
            <template scope="scope">
              <span>{{scope.row.price + '元'}}</span>
            </template>
          </el-table-column>
          <!--  <el-table-column label="幅度(%)" width="115">
              <template scope="scope">
                  <div class='tbox'>
                      <div>{{scope.row.dayDowns,7 | filterPercent}}</div>
                      <img src="../../static/icon/down.png" v-show='scope.row.dayDowns < 0'>
                      <img src="../../static/icon/up.png" v-show='scope.row.dayDowns > 0'>
                  </div>
              </template>
          </el-table-column> -->
          <el-table-column label="产品卖点" width="165">
            <template scope="scope">
              <span v-if="scope.row.quality == ''">暂未填写卖点</span>
              <span v-if="scope.row.quality != ''">{{scope.row.quality, 8 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column label="咨询电话" width="95">
            <template scope="scope">
              <el-tooltip class="item" effect="dark"
                          :content="'客服电话:' + scope.row.employeeMobil"
                          placement="top-start">
                <div class="phone"></div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template scope="scope">
              <div v-if="scope.row.isMy === 0" class="orange_btn"
                   @click="offer(scope.row.id)">
                {{scope.row.especial == 1 && scope.row.type == 1 === true ? '立即抢购' : '我要购买'}}
              </div>
              <div v-if="scope.row.isMy === 1" class="orange_btn red_btn"
                   @click="offer(scope.row.id)">
                我的资源
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="deal">
      <div class="title">最新成交</div>
      <div class="table">
        <el-table :data="transactionArr" style="border: 0 none; border-top:2px solid #F98435;text-align:center">
          <el-table-column prop="mobile" label="成交人" width="120">
          </el-table-column>
          <el-table-column label="交易摘要" width="105">
            <template scope="scope">
              <span>{{scope.row.abstract, 4 | filterTxt}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="75">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  export default {
    data() {
      return {
        QRious: '',
        httpParam: {
          sort: {
            "shelve_time": "0",
            "price": "0"
          },
          location: ["", ""],
          sampling: -1,
          isShowPrice: 1,
          pn: 1,
          pSize: 10

        },
        transactionArr: [],

      }
    },
    mounted() {
      let _self = this;
      if (this.$store.state.resource.resourceList.list.length == 0) {
        _self.getHttp();
      }
      this.transaction();
    },
    computed: {
      resourceList() {
        return this.$store.state.resource.resourceList.list
      },
      total() {
        return this.$store.state.resource.resourceList.total
      },
      user() {
        return this.$store.state.user.user
      }

    },
    methods: {
      qrcode(ele, src) {
        const qr = new this.QRious({
          element: ele,
          background: '#fff',
          foreground: '#000',
          mime: 'image/png',
          level: 'H',
          size: 120,
          value: src
        })
      },
      getHttp() {
        let _self = this;
        let url = common.urlCommon + common.apiUrl.most;
        if (common.SID) url = common.addSID(url);
        this.$store.dispatch('getResourceList', {
          body: {
            biz_module: 'intentionService',
            biz_method: 'querySupplyList',
            biz_param: _self.httpParam
          },
          path: url
        }).then(() => {

        }, () => {

        });
      },
      offer(paramsId) {
        let _self = this;
        if (!common.validateUserInfo(this.user, () => {
          })) {
          this.$alert('您还未完善个人信息,请立即去完善', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/register');
            }
          });
          return;
        }
        if (this.user.phone) {
          // let newWin = window.open();
          // newWin.location.href = "/resourceDetail/" + paramsId;
          this.$router.push("/resourceDetail/" + paramsId);
        } else {
          this.$store.dispatch('setUrl', '/resourceDetail/' + paramsId).then(() => {
            this.$router.push('/login');
          });
          // _self.$message({
          //     showClose: true,
          //     message: '请先登录',
          //     type: 'warning'
          // });
        }
        ;

      },
      linkTo() {
        this.$router.push('/resource');
      },
      transaction() {
        let _self = this;
        common.commonPost(common.urlCommon + common.apiUrl.most, {
          biz_module: 'tradeNewService',
          biz_method: 'webCurrentList',
          biz_param: {
            pn: 1,
            pSize: 10
          }
        }).then(function (suc) {
          _self.transactionArr = suc.biz_result.list;
          console.log(_self.transactionArr)
        }).catch(function (err) {

        })
      }
    }
  }
</script>
