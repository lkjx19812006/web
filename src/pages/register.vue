<style lang="less" scoped>
  @width: 1200px;
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
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
      .step {
        margin-top: 60px;
        width: @width;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          flex: 0 0 auto;
        }
        .border {
          // display: flex;
          // justify-content: center;
          // align-items: flex-;
          min-height: 450px;
          margin: 35px 0;
        }
      }
    }
    .component-fade-enter-active, .component-fade-leave-active {
      transition: opacity .2s;
    }
    .component-fade-enter,
    .component-fade-leave-to {
      opacity: 0;
    }
  }
</style>
<template>
  <div class="content_body">
    <headerView :title="title"></headerView>
    <div class="content">
      <div class="step">
        <transition name="component-fade" mode="out-in">
          <div v-if="step==1" key="step1">
            <img src="../../static/icon/step1.png" height="98" width="1201">
            <div class="border">
              <registerView v-on:step="stepChange"></registerView>
            </div>
          </div>
          <div v-if="step==2" key="step2">
            <img src="../../static/icon/step234.png" height="98" width="1201">
            <div class="border">
              <userIdentity v-on:step="stepChange"></userIdentity>
            </div>
          </div>
          <div v-if="step==3" key="step3">
            <img src="../../static/icon/step234.png" height="98" width="1201">
            <div class="border">
              <userInfo v-on:step="stepChange"></userInfo>
            </div>
          </div>
          <div v-if="step==4" key="step4">
            <img src="../../static/icon/step234.png" height="98" width="1201">
            <div class="border">
              <selectBreed v-on:step="stepChange"></selectBreed>
            </div>
          </div>
          <div v-if="step==5" key="step5">
            <img src="../../static/icon/step5.png" height="98" width="1201">
            <div class="border">
              <successView></successView>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <footerView></footerView>
  </div>
</template>
<script>
  import httpService from '../common/httpService.js'
  import headerView from '../components/header.vue'
  import footerView from '../components/foot.vue'
  import registerView from '../components/register/register.vue'
  import userIdentity from '../components/register/userIdentity.vue'
  import userInfo from '../components/register/userInfo.vue'
  import selectBreed from '../components/register/selectBreed.vue'
  import successView from '../components/register/success.vue'
  import common from '../common/httpService.js'
  export default {
    name: 'register_view',
    data() {
      return {
        title: '',
        step: 1
      }
    },
    //监听user变化实时计算当前步骤
    watch: {
      user(newVal, oldVal) {
        if (newVal.phone) {
          this.countStep();
        }
      },
      step(newVal, oldVal) {
        switch (newVal) {
          case 1:
            this.title = '欢迎注册';
            break;
          case 2:
            this.title = '完善身份信息';
            break;
          case 3:
            this.title = '完善具体身份信息';
            break;
          case 4:
            this.title = '完善主营品种';
            break;
          case 5:
            this.title = '信息完善成功';
            break;
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user;
      }
    },
    components: {
      headerView,
      footerView,
      registerView,
      userIdentity,
      userInfo,
      selectBreed,
      successView
    },
    created() {
      this.countStep();
    },
    methods: {
      //计算当前步骤
      countStep() {
        let nowStep = 1;
        //登录过后
        if (this.user.phone) {
          if (this.user.userType === 0) {
            nowStep = 2;
          } else {
            if (this.user.manageType === -1) {
              nowStep = 3;
            } else {
              if (this.user.bizMain === '') {
                nowStep = 4;
              } else {
                nowStep = 5;
              }
            }
          }
        }
        this.step = nowStep;
      },
      stepChange(step, params) {
        let obj = {};
        switch (step) {
          case 2:
            this.step = 2;
            break;
          case 3:
            obj.userType = params;
            this.upDateUserInfo(obj, step);
            break;
          case 4:
            obj.manageType = params;
            this.upDateUserInfo(obj, step);
            break;
          case 5:
            obj.bizMain = params;
            this.upDateUserInfo(obj, step);
            break;
        }
        if (document.documentElement.scrollTop) document.documentElement.scrollTop = 0;
        if (window.pageYOffset) window.pageYOffset = 0;
        if (document.body.scrollTop) document.body.scrollTop = 0;
      },
      upDateUserInfo(params, step) {
        let _self = this;
        let url = common.urlCommon + common.apiUrl.most
        let body = {
          biz_module: 'userService',
          biz_method: 'updateUserInfo',
          biz_param: params
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        _self.$store.dispatch('getUserInformation', {
          body: body,
          path: url
        }).then(() => {
          _self.getUserInfo(step);
        }, () => {

        });
      },
      getUserInfo(step) {
        let _self = this;
        let url = common.urlCommon + common.apiUrl.most
        let body = {
          biz_module: 'userService',
          biz_method: 'queryUserInfo'
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        _self.$store.dispatch('getUserInformation', {
          body: body,
          path: url
        }).then(() => {
          switch (step) {
            case 3:
              _self.step = 3;
              break;
            case 4:
              _self.step = 4;
              break;
            case 5:
              _self.step = 5;
              break;
          }
        }, () => {

        });
      },
    }
  }
</script>
