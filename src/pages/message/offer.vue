<style lang="less" scoped>
  .offer {
    .top_checkBox {
      height: 38px;
      background-color: #F8F8F8;
      border-top: 1px solid #E0E0E0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      .btn_wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div {
          padding: 3px 15px;
          border: 1px solid #E0E0E0;
          color: #fff;
          border-radius: 5px;
          background-color: #fff;
          font-size: 12px;
          margin: 0 10px;
          cursor: pointer;
        }
        .btn_read {
          border: 1px solid #EDB200;
          background-color: #FBBD00;
        }
        .btn_del {
          border: 1px solid #EB7F00;
          background-color: #FB8800;
        }
        .disabled {
          background-color: #D8D8D8;
          border-color: #ccc;
          cursor: not-allowed;
        }
      }
    }
    .items {
      padding: 24px 10px;
      padding-right: 0;
      .item {
        height: 100px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .checkBox_wrap {
          flex: 0 0 auto;
          width: 50px;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          background-color: #FBFBFB;
          height: 100%;
          .time_wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 0 0 auto;
            height: 100%;
            width: 116px;
            .ymd {
              font-size: 14px;
              color: #333;
              margin-bottom: 5px;
            }
            .hm {
              font-size: 14px;
              color: #999;
            }
          }
          .cont_txt {
            flex: 1;
            padding: 20px 0;
            .cont_wrap {
              height: 100%;
              padding: 0 30px;
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              border-left: 1px solid #E3E3E3;
              font-size: 14px;
              .info {
                color: #4D4D4D;
                margin-right: 10px;
                .pre_read {
                  color: #F08200;
                  margin-right: 10px;
                  font-weight: 700;
                }
              }
              .linkTo {
                flex: 0 0 auto;
                color: #27A961;
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }
      .normal {
        min-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 18px;
          color: #CACACA;
          margin-top: 30px;
        }
      }
    }
    .page {
      text-align: center;
      margin-bottom: 100px;
    }
  }
</style>
<template>
  <div class="offer">
    <div class="top_checkBox">
      <el-checkbox @change="allChecked" v-model="checked">
        <span style="font-size: 12px; color: #666">全选</span>
      </el-checkbox>
      <div class="btn_wrap">
        <div v-if="validateBtn('read')" class="btn_read disabled">
          标为已读
        </div>
        <div v-else class="btn_read" @click="isRead">
          标为已读
        </div>
        <div v-if="validateBtn('del')" class="btn_del disabled">
          删除
        </div>
        <div v-else class="btn_del" @click="del">
          删除
        </div>
      </div>
    </div>
    <div class="items">
      <div v-if="offerList.length > 0" class="item" v-for="item in offerList">
        <div class="checkBox_wrap">
          <el-checkbox @change="itemChecked" v-model="item.checked">
          </el-checkbox>
        </div>
        <div class="content">
          <div class="time_wrap">
            <div class="ymd">
              {{item.creatTime, 0 | getYMD}}
            </div>
            <div class="hm">
              {{item.creatTime, 1 | getYMD}}
            </div>
          </div>
          <div class="cont_txt">
            <div class="cont_wrap">
              <div class="info">
                <span class="pre_read" v-if="item.isRead === 0">[未读]</span>
                <span class="pre_read" style="color: #B3B3B3" v-if="item.isRead === 1">[已读]</span>
                <span>{{item.message, 60 | filterTxt}}</span>
                <span class="linkTo" @click="linkTo(item)">点击查看详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="offerList.length ===  0" class="normal">
        <img src="../../../static/icon/normalMessage.png">
        <span>亲，暂时没有消息哦！</span>
      </div>
    </div>
    <div class="page" v-if="offerList.length > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="httpParam.pn" :page-size="httpParam.pSize"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import httpService from '../../common/httpService.js'
  export default {
    data() {
      return {
        checked: false,
        checkedList: [],
        httpParam: {
          type: 4,
          pn: 1,
          pSize: 10
        }
      }
    },
    computed: {
      offerList() {
        return this.$store.state.message.messageOfferList.list;
      },
      total() {
        return this.$store.state.message.messageOfferList.total
      }
    },
    created() {
      this.getOfferList();
      this.getMessageType()
    },
    methods: {
      /*校验按钮禁用状态
       * 1.总数为0 时禁用
       * 2.列表中 checked 为 true 并且 isRead === 0 显示按钮 其他都不显示
       * **/
      validateBtn(type){
        let flag = true;
        if (this.total > 0) {
          for (var i = 0; i < this.offerList.length; i++) {
            if (type === 'read') {
              if (this.offerList[i].checked && this.offerList[i].isRead === 0) {
                flag = false;
                break;
              }

            } else if (type === 'del') {
              if (this.offerList[i].checked) {
                flag = false;
                break;
              }
            }
          }
        }
        return flag;
      },
      isRead() {
        this.countChecked();
        if (this.checkedList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要标记的信息！！！'
          })
          return;
        }
        ;
        this.$confirm('确定标记选择消息为已读吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.updateMessageRead(this.checkedList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      del() {
        this.countChecked();
        if (this.checkedList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的信息！！！'
          })
          return;
        }
        ;
        this.$confirm('确定删除选中的消息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.deleteMessage(this.checkedList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //处理全选
      allChecked() {
        let _self = this;
        this.offerList.forEach(function (item) {
          item.checked = _self.checked;
        })
      },
      //改变单个
      itemChecked() {
        let flag = true;
        for (var i = 0; i < this.offerList.length; i++) {
          if (!this.offerList[i].checked) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      //计算选中的checkBox 排除已读的
      countChecked() {
        let _self = this;
        this.checkedList = [];
        this.offerList.forEach(function (item) {
          if (item.checked) {
            _self.checkedList.push(item.id);
          }
        })
      },
      linkTo(item) {
        //点击后更新完成后
        //先获取总数
        //再获取标题数量
        //再获取列表 item.intentionId, item.id
        this.updateMessageRead(item.id);
        this.$router.push('/member/myReportPrice?intentionId=' + item.intentionId);
      },
      //获取列表
      getOfferList() {
        let url = httpService.urlCommon + httpService.apiUrl.most
        let body = {
          biz_module: 'pushService',
          biz_method: 'myMessagePushList',
          biz_param: this.httpParam
        }
        url = httpService.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
        body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('getOfferList', {
          body: body,
          path: url
        }).then(() => {
          this.checked = false;
        }, () => {

        })
      },
      //分页
      handleCurrentChange(val) {
        this.httpParam.pn = val;
        this.getOfferList();
      },
      //更新消息状态
      updateMessageRead(param) {
        let isReadList = [];
        let _self = this;
        if (!param) {
          return;
        } else {
          if (this.isArray(param)) {
            //是数组 直接传数组
            isReadList = param;
          } else {
            //不是数组 直接push到数组中
            isReadList.push(param)
          }
        }
        ;
        let url = httpService.urlCommon + httpService.apiUrl.most
        let body = {
          biz_module: 'pushService',
          biz_method: 'setMessageIsRead',
          biz_param: {
            isReadList: isReadList
          }
        }
        url = httpService.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
        body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('updateMessage', {
          body: body,
          path: url
        }).then(() => {
          //先获取总数
          this.getMessageTotals();
          //再获取标题数量
          this.getMessageType();
          //再获取列表
          this.getOfferList();
        }, () => {

        })
      },
      isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
      },
      //获取消息类型 列表
      getMessageType() {
        let url = httpService.urlCommon + httpService.apiUrl.most
        let body = {
          biz_module: 'pushService',
          biz_method: 'pushMessageList'
        }
        url = httpService.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
        body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('getMessageType', {
          body: body,
          path: url
        }).then(() => {
        }, () => {
        })
      },
      //获取消息总数
      getMessageTotals() {
        let url = httpService.urlCommon + httpService.apiUrl.most
        let body = {
          biz_module: 'pushService',
          biz_method: 'showIsRead'
        }
        url = httpService.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
        body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('getMessageTotal', {
          body: body,
          path: url
        }).then(() => {
        }, () => {
        })
      },
      //删除消息
      deleteMessage(param) {
        let url = httpService.urlCommon + httpService.apiUrl.most
        let body = {
          biz_module: 'pushService',
          biz_method: 'deleteMyMessage',
          biz_param: {
            messageList: param
          }
        }
        url = httpService.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
        body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('deleteMessage', {
          body: body,
          path: url
        }).then(() => {
          //先获取总数
          this.getMessageTotals();
          //再获取标题数量
          this.getMessageType();
          this.httpParam.pn = 1;
          //再获取列表
          this.getOfferList();
        }, () => {

        })
      }

    }
  }
</script>
