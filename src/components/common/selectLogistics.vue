<style scoped>
  .box {
    width: 100%;
    padding-bottom: 50px;
  }

  .box .company {
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .box .company .name {
    width: 110px;
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
    line-height: 36px;
    font-size: 14px;
    color: #333;
  }

  .box .company .input {
    flex: 1;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .box .images .title {
    padding-left: 15px;
    font-size: 14px;
    color: #333;
  }

  .box .images .title > span {
    color: #FA6705;
  }

  .box .images .img_box {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin-top: 25px;
  }

  .box .images .img_box .imgs {
    flex: 1;
    margin-left: 10px;
  }

  .box .confirm {
    background: #FA6705;
    width: 120px;
    color: white;
    font-size: 15px;
    line-height: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 3px;
    text-align: center;
    float: right;
    margin-top: 25px;
    cursor: pointer;
  }
</style>
<template>
  <div class="box">
    <div class='company'>
      <div class='name'>快递公司：</div>
      <div class='input'>
        <el-select placeholder="请选择" v-model='params.id'>
          <el-option v-for="item in companys" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class='company'>
      <div class='name'>单号：</div>
      <div class='input'>
        <el-input v-model="params.number" placeholder="请输入单号"></el-input>
      </div>
    </div>
    <div class='images'>
      <div class='title'>
        发货凭证<span>（请上传发货凭证）</span>
      </div>
      <div class='img_box'>
        <div v-for='(todo, index) in imageArr' class='imgs' :key="index">
          <imageUpload :param="todo" v-on:postUrl="getUrl"></imageUpload>
        </div>
      </div>
    </div>
    <div class='confirm' @click='confirm()'>确认发货</div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import imageUpload from '../../components/imageUpload'
  import validation from '../../validation/validation.js'
  export default {
    data() {
      return {
        imageArr: [{
          keyName: 'validate',
          defaults: '../../static/icon/up--img.bmp',
          index: 0,
          url: ''
        }, {
          keyName: 'validate',
          defaults: '../../static/icon/up--img.bmp',
          index: 1,
          url: ''
        }, {
          keyName: 'validate',
          defaults: '../../static/icon/up--img.bmp',
          index: 2,
          url: ''
        }],
        deliverImage: []
      }
    },
    computed: {
      companys() {
        return this.$store.state.orderlist.companys;
      }
    },
    props: {
      params: {}
    },
    components: {
      imageUpload
    },
    methods: {
      getUrl(param) {
        let _self = this;
        _self.deliverImage.push(param.url);
        //console.log(_self.deliverImage);
      },
      confirm() {
        let _self = this;
        var checkArr = [];
        let checkCompany = validation.checkNull(_self.params.id, '请选择物流公司');
        checkArr.push(checkCompany);
        let checkNumber = validation.checkNull(_self.params.number, '请输入单号');
        checkArr.push(checkNumber);

        for (var i = 0; i < checkArr.length; i++) {
          if (checkArr[i]) {
            this.$message({
              showClose: false,
              message: checkArr[i]
            });
            return;
          }
        }
        _self.submit();
        _self.formDate.sendOut = false;
      },
      submit() {
        let _self = this;
        _self.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'logisticsService',
          biz_method: 'submitExpressInfo',
          biz_param: {
            number: _self.params.number,
            deliverImage: _self.deliverImage,
            orderId: _self.params.orderId,
            logistics: _self.params.id,
            orderNo: _self.params.orderNo
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
            if (res.code == "1c01") {
              _self.$emit('getHttp', 2)
              _self.$message({
                message: '发货成功',
                type: 'success'
              });
            }
          })
          .catch(function (err) {
            console.log(err)
            _self.loading = false;
          })

      }
    }
  }
</script>
