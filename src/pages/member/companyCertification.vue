<style scoped lang="less">
  .company_certifi {
    position: relative;
  }

  .company_certifi .title {
    font-size: 20px;
    color: #333333;
    height: 45px;
    margin-bottom: 15px;
  }

  .company_certifi .content {
    float: left;
    width: 100%;
  }

  .company_certifi .content .basic {
    float: left;
    width: 600px;
    font-size: 14px;
    margin-top: 45px;
  }

  .company_certifi .content .basic .name_title {
    float: left;
    width: 120px;
    line-height: 36px;
    color: #333;
    text-align: right;
    padding-right: 25px;
  }

  .company_certifi .content .basic .name_input {
    float: left;
    width: 370px;
    position: relative;
  }

  .company_certifi .content .basic .name_input > div {
    font-size: 12px;
    color: #FFC741;
  }

  .company_certifi .content .basic .name {
    float: left;
    width: 100%;
    margin-bottom: 15px;
  }

  .company_certifi .content .basic .name .blank {
    float: left;
    width: 95px;
  }

  .company_certifi .content .basic .tname {
    margin-top: 15px;
  }

  .company_certifi .content .basic .name .name_input .select {
    float: left;
    margin-right: 70px;
    line-height: 22px;
  }

  .company_certifi .content .basic .name .name_input .select_title {
    position: absolute;
    right: -300px;
    line-height: 22px;
    color: #999;
    font-size: 12px;
  }

  .company_certifi .content .images {
    float: left;
    width: 100%;
    margin-top: 20px;
  }

  .company_certifi .content .images .images_box {
    float: left;
    text-align: center;
    margin: 0 0 25px 25px;
  }

  .company_certifi .content .images .images_up {
    width: 240px;
    height: 160px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  .company_certifi .content .images .images_title {
    font-size: 14px;
    color: #333;
    margin-top: 5px;
  }

  .company_certifi .content .images .images_up .word {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #666;
  }

  .company_certifi .confirm {
    float: right;
    background-color: #FA8435;
    box-sizing: border-box;
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    margin-top: 40px;
    margin-right: 440px;
    cursor: pointer;
    color: white;
  }

  .company_certifi {
    .hideType {
      width: 900px;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .msg_img_wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img_wrap {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          img {
            vertical-align: middle;
          }
          .title {
            padding-left: 20px;
            line-height: 62px;
            font-size: 20px;
            color: #56C101;
          }
          margin-bottom: 20px;
        }
        p {
          margin: 0;
          padding: 0;
          text-align: center;
          font-size: 16px;
          color: #4E4E4E;
          line-height: 32px;
        }
        .btn {
          margin-top: 20px;
          font-size: 18px;
          color: #fff;
          padding: 10px 20px;
          background-color: #FF8336;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      .suc_info {
        margin-top: 30px;
        .info {
          padding-bottom: 30px;
        }
        .info_img {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          span {
            flex: 0 0 100px;
          }
          .img_wrap {
            display: flex;
            flex-direction: row;
            width: 900px;
            flex-wrap: wrap;
            .box {
              display: flex;
              flex-direction: column;
              margin-bottom: 10px;
              .img_box {
                width: 235px;
                height: 165px;
                margin-right: 60px;
                img {
                  width: 235px;
                  height: 165px;
                }
              }
              .name {
                width: 235px;
                margin-top: 10px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }

  .company_certifi {
    .step {
      padding: 0 30px;
      padding-top: 25px;
      width: 900px;
      height: 120px;
      margin: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .step_wrap {
          height: 48px;
          width: 48px;
          border: 2px solid #DBDBDB;
          border-radius: 50% 50%;
          position: relative;
          .tip_left,
          .tip_lright {
            height: 16px;
            width: 16px;
            position: absolute;
            left: -8px;
            top: 15px;
            background-color: #fff;
            z-index: 1
          }
          .tip_lright {
            right: -8px;
          }
          .line_wrap {
            height: 12px;
            width: 400px;
            background-color: #FFF;
            position: absolute;
            left: 25px;
            top: 15px;
            padding: 3px 0;
            div {
              height: 100%;
              width: 100%;
              background-color: #DBDBDB;
            }
            z-index: 2;
            .bgc_step {
              background-color: #FFC945;
            }
          }
          .txt {
            height: 42px;
            width: 42px;
            line-height: 42px;
            background-color: #DBDBDB;
            color: #fff;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            position: absolute;
            margin: auto;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            border-radius: 50% 50%;
            z-index: 3
          }
          .color_step {
            color: #FFC945;
          }
          .bgc_step {
            background-color: #FFC945;
          }
        }
        .border_step {
          border-color: #FFC945;
        }
        .tit_wrap {
          font-size: 20px;
          padding: 12px 0;
          color: #DCDCDC;
        }
        .color_step {
          color: #FFC945;
        }
        .bgc_step {
          background-color: #FFC945;
        }
      }
    }
  }
</style>
<template>
  <div class="company_certifi">
    <titleHead :param="myhead"></titleHead>
    <myTitle :param="param"></myTitle>
    <div class="step">
      <div class="item" v-for="(item,index) in step">
        <div class="step_wrap" :class="{'border_step ': companyType >= index}">
          <div class="tip_left" v-if="index != 0">
          </div>
          <div class="tip_right" v-if="index != (step.length -1)">
          </div>
          <div class="line_wrap" v-if="index != (step.length -1)">
            <div :class="{'bgc_step ': companyType > index}"></div>
          </div>
          <div class="txt" :class="{'bgc_step ': companyType >= index}">{{item.step}}</div>
        </div>
        <div class="tit_wrap" :class="{'color_step ': companyType >= index}">
          {{item.title}}
        </div>
      </div>
    </div>
    <div v-if="companyType == 1" class="hideType">
      <div class="msg_img_wrap">
        <div class="img_wrap">
          <img src="../../assets/images/success.png" height="62" width="78">
          <div class="title">
            提交成功
          </div>
        </div>
        <p>尊敬的用户，您的企业信息已提交成功，请耐心等待审核</p>
      </div>
    </div>
    <div v-if="companyType == 2" class="hideType">
      <div class="msg_img_wrap">
        <div class="img_wrap">
          <img src="../../assets/images/success.png" height="62" width="78">
          <div class="title">
            审核通过
          </div>
        </div>
      </div>
      <div class="suc_info">
        <div class="info">
          <span>公司名称:{{user.company}}</span>
          <!-- <span style="margin-left: 40px;">公司地址:</span>
          <span style="margin-left: 40px;">联系电话:</span> -->
        </div>
        <div class="info_img">
          <span>公司证件照:</span>
          <div class="img_wrap">
            <!--传统三证-->
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 9' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 9'>三证合一</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 10' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 10'>银行开户许可证</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 11' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 11'>GMP资格证书</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 14' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 14'>生产许可证</div>
            </div>
            <!--6证-->
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 3' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 3'>工商营业执照</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 4' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 4'>组织机构代码证</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 5' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 5'>税务登记证</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 6' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 6'>银行开户许可证</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 7' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 7'>GMP资格证书</div>
            </div>
            <div class="box">
              <div v-for="item in companyValidate.list" v-show='item.category == 13' class='img_box'>
                <img :src="item.path">
              </div>
              <div class="name" v-for="item in companyValidate.list" v-show='item.category == 13'>生产许可证</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="companyType == 3 && !again" class="hideType">
      <div class="msg_img_wrap">
        <div class="img_wrap">
          <img src="../../assets/images/error.png" width="46" height="46" style="margin-top:10px;">
          <div class="title" style="color: red">
            审核不通过
          </div>
        </div>
        <p>尊敬的用户，此次认证失败，请您与药材买卖网客服人员联系</p>
        <p style="color:#FF8336">联系电话：021-55502736</p>
        <div class="btn" v-on:click="againValidate">再次申请</div>
      </div>
    </div>
    <div class="content" v-if="companyType == 0 || again">
      <div class="basic">
        <div class="name">
          <div class="name_title">公司名称：</div>
          <div class="name_input">
            <el-input style="font-size: 14px;" v-model="formData.company" placeholder="请输入公司名称"></el-input>
          </div>
        </div>
        <!--<div class="name">-->
        <!--<div class="name_title">公司地址：</div>-->
        <!--<div class="name_input">-->
        <!--<el-input v-model="formData.address" placeholder="请输入公司地址"></el-input>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="name">-->
        <!--<div class="name_title">公司联系方式：</div>-->
        <!--<div class="name_input">-->
        <!--<el-input v-model="formData.tel" placeholder="请输入公司联系方式"></el-input>-->
        <!--</div>-->
        <!--</div>-->
        <div class="name">
          <div class="name_title">&nbsp;</div>
          <div class="name_input">
            <div>温馨提示:请确认上传证件真实，有效，清晰，否则审核将不予通过</div>
          </div>
        </div>
        <div class="name tname">
          <div class="blank">&nbsp;</div>
          <div class="name_input">
            <div class="select">
              <el-radio class="radio" v-model="show" :label="1">普通营业执照</el-radio>
            </div>
            <div class="select">
              <el-radio class="radio" v-model="show" :label="2">三证合一</el-radio>
            </div>
            <div class="select_title">
              (自2015年10月1日起登记机关颁发的含统一信用代码的营业执照)
            </div>
          </div>
        </div>
      </div>
      <div class="images" v-if="show == 1">
        <div class="images_box" v-for="(todo,index) in imagesData">
          <div class="images_up">
            <imageUpload :param="imgUp[index]" v-on:postUrl="getUrl"></imageUpload>
            <div class="word" v-if="!imgUp[index].url">上传图片</div>
          </div>
          <div class="images_title">
            {{todo.name}}
            <span v-if="index === 4 || index === 5">
              <span v-if="user.manageType !== 3 && user.manageType !== 23">（非必传项）</span>
              <!--<span style="color: red" v-else>（必传项）</span>-->
            </span>
          </div>
        </div>
      </div>
      <div class="images" v-if="show == 2">
        <div class="images_box" v-for="(todo,index) in specilData">
          <div class="images_up">
            <imageUpload :param="specilImgUp[index]" v-on:postUrl="getUrl"></imageUpload>
            <div class="word" v-if="!imgUp[index].url">上传图片</div>
          </div>
          <div class="images_title">
            {{todo.name}}
            <span v-if="index === 2 || index === 3">
              <span v-if="user.manageType !== 3 && user.manageType !== 23">（非必传项）</span>
              <!--<span style="color: red" v-else>（必传项）</span>-->
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm" v-show="companyType == 0 || again" @click="confirm">提交申请</div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import titleHead from '../../components/common/headTitle'
  import myTitle from '../../components/common/title'
  import imageUpload from '../../components/imageUpload'
  import validation from '../../validation/validation.js'
  let step = [{
    step: '1',
    title: '企业身份认证',
  }, {
    step: '2',
    title: '等待审核',
  }, {
    step: '3',
    title: '审核通过',
  }];

  export default {
    name: 'company-certifi-view',
    data() {
      return {
        step: step,
        again: false,
        myhead: {
          name: '企业认证'
        },
        param: {
          title: '企业认证须知:',
          arr: [{
            name: '1、您在认证的时候需要提供您所在企业的营业执照、组织机构代码证、税务登记证、开户许可证扫描件。药材买卖网只支持3M以上的jpg、gif、png、pdf、jpeg格式的图片文件。'
          }, {
            name: '2、您在认证时提交的企业资质文件会由药材买卖网企业资质审核人员在1~2个工作日内完成审核，审核通过后发布供求信息可直接同步药材买卖网各平台。'
          }]
        },
        imagesData: [{
          name: "工商营业执照"
        }, {
          name: "组织机构代码证"
        }, {
          name: "税务登记证"
        }, {
          name: '银行开户许可证'
        }, {
          name: 'GMP资格证书'
        }, {
          name: '生产许可证'
        }],
        specilData: [{
          name: "三证合一"
        }, {
          name: '银行开户许可证'
        }, {
          name: 'GMP资格证书'
        }, {
          name: '生产许可证'
        }],
        //普通证件
        imgUp: [{
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 0,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 1,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 2,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 3,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 4,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 5,
          url: ''
        }],
        //三证合一
        specilImgUp: [{
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 0,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 1,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 2,
          url: ''
        }, {
          defaults: '../../static/icon/images-up.png',
          keyName: 'authen',
          index: 3,
          url: ''
        }],
        formData: {
          company: '',
          address: '',
          tel: '',
          commonImg: [{
            path: '',
            catagory: 3
          }, {
            path: '',
            catagory: 4
          }, {
            path: '',
            catagory: 5
          }, {
            path: '',
            catagory: 6
          }, {
            path: '',
            catagory: 7
          }, {
            path: '',
            catagory: 13
          }],
          specilImg: [{
            path: '',
            catagory: 9
          }, {
            path: '',
            catagory: 10
          }, {
            path: '',
            catagory: 11
          }, {
            path: '',
            catagory: 14
          }]
        },
        show: 1
      }
    },
    computed: {
      companyType() {
        if (this.$store.state.authentication.companyType === 3) {
          this.step[2].title = '审核不通过'
        } else {
          this.step[2].title = '审核通过'
        }
        return this.$store.state.authentication.companyType;
      },
      companyValidate() {
        return this.$store.state.authentication.companyValidate;
      },
      user() {
        return this.$store.state.user.user;
      },
    },
    components: {
      titleHead,
      myTitle,
      imageUpload
    },
    created(){
      if (!common.validateUserInfo(this.user, () => {
        })) {
        this.$router.push('/register');
        return;
      }
    },
    mounted() {
      this.getHttp();
    },
    methods: {
      againValidate() {
        this.again = true;
      },
      getUrl(param) {
        let _self = this;
        if (_self.show == 1) {
          _self.formData.commonImg[param.index].path = param.url;
        } else if (_self.show == 2) {
          _self.formData.specilImg[param.index].path = param.url;
        }
      },
      getHttp() {
        let _self = this;
        _self.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'userService',
          biz_method: 'queryUserAuthenImage',
          biz_param: {
            type: 1
          }
        };
        if (!common.SID) {
          common.getSID(req, redirect);
        }
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        _self.$store.dispatch('personAuthenCompany', {
          body: body,
          path: url
        })
      },
      selectType(val) {
        switch (val) {
          case 3:
            return '工商营业执照';
            break;
          case 4:
            return '组织机构代码证';
            break;
          case 5:
            return '税务登记证';
            break;
          case 6:
            return '银行开户许可证';
            break;
          case 9:
            return '三证合一';
            break;
          case 10:
            return '银行开户许可证';
            break;
        }
      },
      authentication() {
        let _self = this;
        let arr = [];
        if (_self.show == 1) {
          arr = _self.formData.commonImg;
        } else if (_self.show == 2) {
          arr = _self.formData.specilImg;
        }
        this.loading = true;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'userService',
          biz_method: 'webSubmitAuthenImage',
          biz_param: {
            authenImage: arr,
            type: 1,
            company: _self.formData.company,
            address: _self.formData.address,
            tel: _self.formData.tel
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
              _self.getHttp();
              _self.getUserInfo();
              _self.again = false;
            }
            _self.loading = false;
          })
          .catch(function (res) {
            console.log(2222)
            _self.loading = false;
          })
      },
      confirm() {
        let _self = this;
        let checkArr = [];
        let checkName = validation.checkNull(_self.formData.company, '请输入公司名');
        checkArr.push(checkName);
//        let checkNameDes = validation.checkLook(_self.formData.company);
//        checkArr.push(checkNameDes);
//        let checkAddress = validation.checkNull(_self.formData.address, '请输入地址');
//        checkArr.push(checkAddress);
//        let checkTel = validation.checkNull(_self.formData.tel, '请输入联系方式');
//        checkArr.push(checkTel);
        if (_self.show == 1) {
          let checkImg = validation.checkArr(_self.formData.commonImg);
          checkArr.push(checkImg);
        } else if (_self.show == 2) {
          let checkImg = validation.checkArr(_self.formData.specilImg);
          checkArr.push(checkImg);
        }
        for (let i = 0; i < checkArr.length; i++) {
          if (checkArr[i]) {
            this.$message({
              showClose: false,
              message: checkArr[i]
            });
            return;
          }
        }
        ;
        let arr = [];
        if (_self.show == 1) {
          arr = this.formData.commonImg;
        } else if (_self.show == 2) {
          arr = this.formData.specilImg;
        }
        for (var i = 0; i < arr.length; i++) {
          let obj = arr[i];
          if (!obj.path) {
            if (_self.selectType(obj.catagory)) {
              this.$message({
                message: _self.selectType(obj.catagory) + '未上传',
                type: 'info'
              });
              return;
            }
          }
        }
        //判断药厂/饮片厂 必须上传GMP 生成许可证
        let flag = true;
        if (this.user.manageType === 3 || this.user.manageType === 23) {
          if (_self.show === 2) {
            if (this.formData.specilImg[2].path === '' || this.formData.specilImg[3].path === '') {
              flag = false;
            }
          } else if (_self.show === 1) {
            if (this.formData.commonImg[4].path === '' || this.formData.commonImg[5].path === '') {
              flag = false;
            }
          }
        }
        if (!flag) {
          this.$message({
            message: '根据您的身份信息，请上传GMP资格证书和生产许可证书，以便更好为您服务！',
            type: 'info'
          });
          return
        }
        this.$confirm('确定提交企业信息认证？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _self.authentication();
        }).catch(() => {
        });
      },
      getUserInfo() {
        let _self = this;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'userService',
          biz_method: 'queryUserInfo',
          biz_param: {}
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        _self.$store.dispatch('getUserInformation', {
          body: body,
          path: url
        });
      },

    }
  }
</script>
