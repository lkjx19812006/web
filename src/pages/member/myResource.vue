<style lang="less" scoped>
  .my_Resource {
    .box {
      margin-top: 30px;
      .green {
        color: #089A47;
        cursor: pointer;
      }
      .orange {
        color: #FA8535;
        cursor: pointer;
      }
      .block {
        float: right;
        margin-top: 20px;
      }
    }
  }
</style>
<template>
  <div class="my_Resource">
    <titleHead :param="myhead" v-on:empty='empty'></titleHead>
    <div class='box' v-show='!detailObj'>
      <el-table :data="myResource.list" border style="width: 100%">
        <el-table-column label="发布时间">
          <template scope="scope">
            <span>{{scope.row.pubdate | formatBirth}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品名">
          <template scope="scope">
            <span>{{scope.row.breedName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template scope="scope">
            <span>{{scope.row.number}}{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template scope="scope">
            <span>{{scope.row.price}}元/{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template scope="scope">
            <span class='green' @click='lookDetail(scope.row.id)'>查看详情</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <span class='orange' @click='detel(scope.row.id)'>删除</span>&nbsp;&nbsp;
            <span class='orange' @click='resive(scope.row.id)'>编辑</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <span v-show="scope.row.onSell == '1'">申请中</span>
            <span v-show="scope.row.onSell == '2'">在架</span>
            <span v-show="scope.row.onSell == '-2'">上架失败</span>
            <span v-show="scope.row.onSell == '3'">已下架</span>
            <span v-show="scope.row.onSell == '4'">已下架</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="myResource.total" :page-size="10"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div class='box'>
      <myResDeatil :type="0" :detailObj='detailObj'></myResDeatil>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import titleHead from '../../components/common/headTitle'
  import myResDeatil from '../../components/my/myResDeatil'
  export default {
    name: 'my-resource-view',
    data() {
      return {
        resourceParam: {
          sort: {
            "pubdate": "2",
            "duedate": "0"
          },
          onSell: 0,
          pn: 1,
          pSize: 10
        },
        intentionId: '',
        myhead: {
          name: '我的资源',
          title: ''
        },
        textarea: '',
        loading: false,
        detailObj: ''
      }
    },
    computed: {
      myResource() {
        return this.$store.state.user.myResource;
      }
    },
    created() {
      //确定消息中心带过来的数据
      if (this.$route.query && this.$route.query.intentionId && this.$route.query.intentionId != undefined) {
        this.intentionId = this.$route.query.intentionId;
        if (!this.$store.state.message.resourceIntentionInfo.id) {
          this.getDetail(this.intentionId);
        } else {
          this.detailObj = this.$store.state.message.resourceIntentionInfo;
          this.myhead.title = '返回求购列表'
        }
      }
    },
    components: {
      titleHead,
      myResDeatil
    },
    mounted() {
      this.getHttp();
    },
    methods: {
      getHttp() {
        let _self = this;
        _self.loading = true;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'mySupplyIntentionList',
          biz_param: _self.resourceParam
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('getMyResource', {
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
            if (res.code == '1c01') {
              console.log(res.biz_result)
              _self.detailObj = res.biz_result;
              _self.myhead.title = '返回资源列表'
            }
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      resive(id) {
        this.$router.push('/publish/resource/' + id);
      },
      deleteRes(id) {
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
      detel(id) {
        this.$confirm('确定删除该条资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRes(id)
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
        this.getDetail(id)
      },
      handleCurrentChange(val) {
        this.resourceParam.pn = val;
        this.getHttp();
      },

    }
  }
</script>
