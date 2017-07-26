<style lang="less" scoped>
  .my_need {
    .box {
      margin-top: 30px;
      .orange {
        color: #FA8535;
        display: inline-block;
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        border: 1px solid #FA8535;
        border-radius: 2px;
        margin-right: 10px;
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
      }
      .block {
        float: right;
        margin-top: 20px;
      }
      .top {
        .title {
          color: #92BD75;
          font-size: 20px;
          line-height: 20px;
          margin-bottom: 22px;
        }
        .content {
          width: 650px;
          display: flex;
          flex-direction: row;
          div {
            flex: 1;
            text-align: left;
            font-size: 15px;
            line-height: 15px;
            margin-bottom: 14px;
            color: #929292;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="my_need">
    <titleHead :param="myhead" v-on:empty='empty'></titleHead>
    <div class='box' v-show='!detailObj'>
      <el-table :data="myNeed.list" border style="width: 100%">
        <el-table-column label="发布时间" width='120'>
          <template scope="scope">
            <span>{{scope.row.pubdate | formatBirth}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品名">
          <template scope="scope">
            <span>{{scope.row.breedName, 5 | filterTxt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template scope="scope">
            <span>{{scope.row.spec, 5 | filterTxt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产地">
          <template scope="scope">
            <span>{{scope.row.location, 5 | filterTxt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template scope="scope">
            <span>{{scope.row.number}}{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余日期">
          <template scope="scope">
            <span>{{ValidateOverTime(scope.row.overTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width='95'>
          <template scope="scope">
            <span v-show="scope.row.onSell == 1">审核中</span>
            <span v-show="scope.row.onSell == 2">询价中</span>
            <span v-show="scope.row.onSell == -2">审核失败</span>
            <span v-show="scope.row.onSell == 4">询价结束</span>
            <span v-show="scope.row.onSell == 3">询价结束</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width='150'>
          <template scope="scope">
            <span class='orange' @click='lookDetail(scope.row.id)'>详情</span>
            <span class='green' @click='resive(scope.row.id)'>编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="myNeed.total" :page-size="10"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div class='box' v-if="detailObj != ''">
      <myNeedDetail :detailObj='detailObj' v-on:endOrAgn="endOrAgn"></myNeedDetail>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import titleHead from '../../components/common/headTitle'
  import myNeedDetail from '../../components/my/myNeedDetail.vue'
  export default {
    data() {
      return {
        resourceParam: {
          sort: {
            "offer": "0",
            "pubdate": "2",
            "duedate": "0"
          },
          onSell: 0,
          pn: 1,
          pSize: 10
        },
        myhead: {
          name: '我的求购',
          title: ''
        },
        need: true,
        textarea: '',
        loading: false,
        detailObj: '',
        intentionId: ''
      }
    },
    computed: {
      myNeed() {
        return this.$store.state.user.myNeed;
      }
    },
    created() {
      //确定消息中心带过来的数据
      if (this.$route.query && this.$route.query.intentionId && this.$route.query.intentionId != undefined) {
        this.intentionId = this.$route.query.intentionId;
        if (!this.$store.state.message.needIntentionInfo.id) {
          this.getDetail(this.intentionId);
        } else {
          this.detailObj = this.$store.state.message.needIntentionInfo;
          this.myhead.title = '返回求购列表'
        }
      }
    },
    mounted() {
      this.getHttp();
    },
    components: {
      titleHead,
      myNeedDetail
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
      endOrAgn(params) {
        //结束询价
        let _self = this;
        if (params.type === 'endEnquiry') {
          this.getDetail(params.id).then(() => {
            console.log('asdfsadfasd')
            _self.$message({
              type: 'success',
              message: '操作成功'
            });
            _self.getHttp();
          })
        }
      },
      validtaeDate(time) {
        console.log(time)
        let nowTime = new Date();
        time = new Date(time);
        let dateValue = time.getTime() - nowTime.getTime();
        let days = Math.floor(dateValue / (24 * 3600 * 1000));
        if (days >= 0) {
          return true;
        } else {
          return false;
        }
      },
      getHttp() {
        let _self = this;
        _self.loading = true;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'myBegIntentionList',
          biz_param: _self.resourceParam
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('getMyNeed', {
          body: body,
          path: url
        }).then(() => {
          _self.loading = false;
        }, () => {
          _self.loading = false;
        })
      },
      getDetail(id) {
        let _self = this;
        return new Promise((resolve, reject) => {
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
              console.log(1, res)
              if (res.code == '1c01') {
                console.log(res.biz_result)
                _self.detailObj = res.biz_result;
                _self.myhead.title = '返回求购列表'
                resolve();
              }

            })
            .catch(function (err) {
              _self.loading = false;
              reject();
            })
        })

      },
      getOfferList(id) {
        let _self = this;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionOfferService',
          biz_method: 'queryIntentionOfferList',
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
            if (res.code == '1c01') {
              //console.log(res.biz_result.list)

            }
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      resive(id) {
        this.$router.push('/publish/need/' + id);
      },
      deleteNeed(id) {
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
            if (res.code = '1c01') {
              _self.getHttp();
              _self.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      dete(id) {
        this.$confirm('确定删除该条求购信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNeed(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      empty() {
        this.detailObj = '';
      },
      lookDetail(id) {
        this.getDetail(id);
        //this.getOfferList(id);
      },
      handleCurrentChange(val) {
        this.resourceParam.pn = val;
        this.getHttp();
      },

    }
  }
</script>
