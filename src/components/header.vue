<style lang="less" scoped>
  @width: 1200px;
  .head_content {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #FA8435;
    align-items: center;
    // min-height: 196px;
    .head_welcome {
      display: flex;
      width: 100%;
      background-color: #FBFAF6;
      height: 36px;
      padding-bottom: 3px;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #eee;
      .welcome_center {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: @width;
        flex: 0 0 auto;
        font-size: 12px;
        color: #666;
        .orange_span {
          color: #FA8435;
          margin: 0 5px;
          cursor: pointer;
        }
        .dis_span {
          margin-left: 30px;
        }
        .center_span {
          margin: 0 5px;
        }
        .welcome_right {
          flex: 0 0 auto;
          .point_span {
            cursor: pointer;
          }
          .point_span:hover {
            color: #FA8435;
          }
        }
        .welcome_left {
          flex: 0 0 auto;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    .head_logo {
      width: @width;
      flex: 0 0 auto;
      height: 106px;
      align-items: center;
      display: flex;
      .flext_item {
        flex: 0 1 auto;
      }
      .left_image {
        max-height: 80px;
      }
      .center_image {
        margin: 0 40px;
      }
      .right_font {
        color: #FA8435;
        font-size: 28px;
      }
      .flex_end {
        flex: 1 1 auto;
        justify-content: flex-end;
        display: flex;
        flex-direction: row;
        .el-select {
          width: 100px;
        }
        .el-input {
          width: 350px;
        }
        .el-input__inner {
          border: 1px solid red;
        }
      }
    }
    .left_static {
      flex: 0 1 auto;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -700px;
      transform: translate(0, -200px);
      z-index: 99;
      .district {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #dad8d4;
        height: 56px;
        padding: 10px;
        cursor: pointer;
        p {
          font-size: 14px;
          color: #fff;
          margin: 5px 0 0 0;
        }
      }
      .active {
        background-color: #FA8435;
      }
    }
    .qr_code {
      width: 138px;
      height: 312px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .img_wrap {
        .title {
          width: 138px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          background-color: #FBFAF6;
          color: #F98435;
          img {
            vertical-align: baseline;
          }
        }
      }
      position: absolute;
      width: 100px;
      height: 100px;
      left: 78px;
      bottom: 255px;
    }
  }

  .verInfo {
    z-index: 99999;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;
    left: 0;
    top: 0;
    .content {
      position: relative;
      width: 500px;
      margin: 100px auto;
      background-color: #fff;
      padding: 20px;
      line-height: 24px;
      border: 1px solid #F98435;
      border-radius: 5px;
      h3 {
        margin: 0;
        padding: 5px;
        padding-bottom: 10px;
        color: #F98435;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 14px;
        line-height: 20px;
      }
      .el-icon-close {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #666;
      }
      .el-icon-close:hover {
        color: #F98435;
        cursor: pointer;
      }
      .info {
        margin-top: 10px;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        color: #F98435;
      }
    }
  }
</style>
<template>
  <div class="head_content">
    <div class="verInfo" v-show="showVerInfo">
      <div class="content">
        <h3>友情提示</h3>
        <i @click="close" class="el-icon-close"></i>
        <p>您目前使用的浏览器版本较低，为了能正常浏览网页推荐使用以下浏览器</p>
        <div class="info">
          <p>主流浏览器的极速模式：</p>
          <div>
            <span class="item">360浏览器极速模式</span>
            <span class="item">QQ浏览器极速模式</span>
            <span class="item">搜狗浏览器极速模式等...</span>
          </div>
          <p>或使用现代浏览器：</p>
          <span class="item">谷歌浏览器</span>
          <span class="item">火狐浏览器</span>
          <span class="item">IE10以上浏览器等</span>
        </div>
      </div>
    </div>
    <div class="head_welcome" ref="header">
      <div class="welcome_center">
        <div class="welcome_left">
          <span>您好，欢迎您来到药材买卖网！</span>
          <span v-show="!user.phone"><span class="dis_span">【</span><span class="orange_span" @click="jump('/login')">用户登录</span>|<span
            class="orange_span" @click="jump('/register')">免费注册</span><span>】</span></span>
          <!--1. 有无认证 user.utype === 2-->
          <span class="orange_span" v-if="user.utype !== 2">
            <!--显示未认证的情况-->
            {{user.phone && !user.fullname === true ? user.phone : user.fullname}}
          </span>
          <span class="orange_span" v-else>
            {{user.name}}
          </span>
          <!--<span v-if="user.phone && !user.fullname" class="orange_span">{{user.phone}}</span>-->
          <!--<span v-else class="orange_span">{{user.fullname}}</span>-->
          <span v-show="user.phone" @click="quit()" class="orange_span"> | &nbsp;&nbsp;退出</span>
        </div>
        <div class="welcome_right">
          <span class="point_span" @click="jump('/')">药材买卖网首页</span>
          <span class="center_span">|</span>
          <span class="point_span" @click="jumpCenter('/member/saleOrder')">会员中心</span>
          <span class="center_span">|</span>
          <span class="point_span" @click="jumpCenter('/message/intention')">
                        <span class="el-icon-message orange_span"></span>
                    <span class="messgee_txt">我的消息</span>
                    <span class="message_num orange_span">{{messageTotal}}</span>
                    </span>
          <span class="center_span">|</span>
          <span class="point_span" @click="jumpCenter('/selectBreed')">我的主营</span>
          <span class="center_span">|</span>
          <span>{{phone}}</span>
        </div>
      </div>
    </div>
    <div class="head_logo">
      <img style="cursor: pointer;" @click="linkIndex" src="../assets/images/logo.png" class=" flext_item left_image">
      <img src="../assets/images/head-Interval-line.png" class="flext_item center_image" v-if="title">
      <div class="flext_item right_font" v-if="title">
        {{title}}
      </div>
      <div v-if="!title" class="flext_item flex_end">
        <el-select no-data-text="资源" v-model="search.type" placeholder="请选择" @change="selectType">
          <el-option label="资源" value="0"></el-option>
          <el-option label="求购" value="1"></el-option>
        </el-select>
        <mySearch v-model="search.value" style="width: 200px;" placeholder="请输入您需要的产品名称"
                  v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></mySearch>
        <el-button icon="search" class="orange_button" @click="searchResource()"></el-button>
        <!--  <el-input placeholder="请输入您需要的产品名称" size="large" v-model="search.value" class="el-select">

        </el-input> -->
      </div>
    </div>
    <tabView v-if="tab" :tab="tab"></tabView>
    <div class="left_static" :style="{ marginTop: disTop + 'px' }" v-show="showNav">
      <div class="district"
           :class="{'active':(item.name === pathName && codeIndex !== 3) || (codeIndex === 3 && index=== 3)}"
           v-for="(item,index) in leftArray"
           @click="searchId(index)">
        <img :src="item.image">
        <p>{{item.title}}</p>
      </div>
    </div>
    <transition name="fade">
      <ScanCode v-on:close="closeCode" v-if="showNav && ((codeIndex === 3 && !isClose) || !isClose)"></ScanCode>
    </transition>

  </div>
</template>
<script>
  import httpService from '../common/httpService.js'
  import tabView from '../components/tab.vue'
  import mySearch from '../components/search.vue'
  import ScanCode from '../components/common/ScanCode.vue'
  import {
    device
  } from '../filters/index.js'
  export default {
    name: 'head-view',
    data() {
      return {
        phone: httpService.phone,
        showNav: false,
        codeIndex: -1,
        verInfo: {},
        showVerInfo: false,
        pathName: '',
        isShowUserInfo: false,
        search: {
          type: '资源',
          value: ''
        },
        needParam: {
          sort: {
            "offer": "0",
            "duedate": "0",
            "shelve_time": "0"
          },
          location: [],
          keyWord: '',
          pn: 1,
          pSize: 10,
          spec: ''
        },
        resourceParam: {
          sort: {
            "shelve_time": "0",
            "price": "0"
          },
          location: [],
          sampling: '-1',
          pn: 1,
          pSize: 10,
          spec: '',
          keyWord: ''
        },
        disTop: 55,
        codeShow: false,
        leftArray: [{
          title: '求购专区',
          image: '/static/icon/Buying-area.png',
          name: '/need'
        }, {
          title: '资源专区',
          image: '/static/icon/Resource-area.png',
          name: '/resource'
        }, {
          title: '预售专区',
          image: '/static/icon/Pre-sale-area.png',
          name: '/presell'
        }, {
          title: '下载APP',
          image: '/static/icon/code.png'
        }, {
          title: '回到顶部',
          image: '/static/icon/top.png'
        }]
      }
    },
    props: {
      title: '',
      tab: ''
    },
    computed: {
      user() {
        return this.$store.state.user.user
      },
      flag() {
        return this.$store.state.user.userFlag
      },
      messageTotal() {
        return this.$store.state.message.messageTotal
      },
      isClose(){
        return this.$store.state.user.isClose;
      }
    },
    beforeMount() {
      this.verInfo = device();
      if (this.verInfo.type == "IE" && parseFloat(this.verInfo.ver) < 10.0) {
        this.showVerInfo = true;
      }
    },
    mounted() {
      //从window中拿地址缓存
      if (this.$store.state.search.cityList.length === 0) {
        if (window.localStorage.cityList == undefined) {
          this.getLocation();
        } else {
          this.$store.dispatch('sch_getCityList', JSON.parse(window.localStorage.cityList));
        }
      }
      let _self = this;
      this.search.value = this.$store.state.search.searchValue.resourceValue;
      let user = this.$store.state.user.user;
      if (window.localStorage.KEY && !user.phone) {
        httpService.KEY = window.localStorage.KEY;
        httpService.SID = window.localStorage.SID;
        httpService.getDate(
          function () {
            let url = httpService.urlCommon + httpService.apiUrl.most
            let body = {
              biz_module: 'userService',
              biz_method: 'queryUserInfo'
            }
            url = httpService.addSID(url);
            body.version = 1;
            body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
            body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            _self.$store.dispatch('getUserInformation', {
              body: body,
              path: url
            }).then(() => {
              let path = _self.$route.matched[0].path;
              if (httpService.validateUserInfo(_self.$store.state.user.user, () => {
                  if (path != '/member' && !_self.flag && path != '/register') {
                    _self.$alert('您还未完善个人信息,请立即去完善', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        _self.$router.push('/register');
                      }
                    });
                    return;
//                    _self.$confirm('您还未完善个人信息,是否现在去完善？', '提示', {
//                      confirmButtonText: '确定',
//                      cancelButtonText: '取消',
//                      type: 'info'
//                    }).then(() => {
//                      _self.$router.push('/register')
//                    }).catch(() => {
//                      _self.$store.dispatch('changeFlag', true);
//                    });
                  }
                }));
            }, () => {

            });
          }
        );
      }
      ;
      if (window.localStorage.KEY && window.localStorage.KEY !== '') {
        this.getMessageTotals();
      }
      this.pathName = this.$route.path;
      if (this.pathName === '/need' || this.pathName === '/resource' || this.pathName === '/presell' || this.pathName === '/market') {
        this.showNav = true;
      }
      if (this.pathName === '/need') {
        this.search.type = '1';
      } else {
        this.search.type = '0';
      }
    },
    components: {
      tabView,
      mySearch,
      ScanCode
    },
    methods: {
      closeCode(){
        this.codeIndex = -1;
        this.$store.dispatch('setIsClose', true);
      },
      linkIndex() {
        this.$router.push('/');
      },
      searchId(index) {
        let _self = this;
        this.codeIndex = -1;
        switch (index) {
          case 0:
            _self.$router.push('/need')
            break;
          case 1:
            _self.$router.push('/resource')
            break;
          case 2:
            _self.$router.push('/presell')
            break;
          case 3:
            _self.codeIndex = 3;
            _self.$store.dispatch('setIsClose', false);
            break;
          case 4:
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            window.pageYOffset = 0;
            break;
          default:
            break;
        }
      },
      close() {
        this.showVerInfo = false;
      },
      selectType(val) {
        this.search.value = '';
        // if (this.search.type === '0') {
        //     this.search.value = this.$store.state.search.searchValue.resourceValue;
        // } else {
        //     this.search.value = this.$store.state.search.searchValue.needValue;
        // }
      },
      searchResource() {
        let _self = this;
        if (this.search.type === '1') {
          this.$store.dispatch('setSearchValue', {
            type: 1,
            value: _self.search.value
          }).then(() => {
            _self.needParam.keyWord = _self.search.value;
            _self.$store.dispatch('getNeedAllList', {
              body: {
                biz_module: 'intentionService',
                biz_method: 'queryBegBuyList',
                biz_param: _self.needParam
              },
              path: httpService.urlCommon + httpService.apiUrl.most
            }).then((res) => {
              if (res.biz_result.list.length === 0) {
                _self.$message({
                  message: '未搜索到相关信息',
                  type: 'info'
                });
                _self.$router.push('/need');
              } else {
                _self.$router.push('/need');
              }
            })
          }, () => {
          });

        } else if (this.search.type === '0') {
          this.$store.dispatch('setSearchValue', {
            type: 0,
            value: _self.search.value
          }).then(() => {
            _self.resourceParam.keyWord = _self.search.value;
            _self.$store.dispatch('getResourceAllList', {
              body: {
                biz_module: 'intentionService',
                biz_method: 'querySupplyList',
                biz_param: _self.resourceParam
              },
              path: httpService.urlCommon + httpService.apiUrl.most
            }).then((res) => {
              if (res.biz_result.list.length === 0) {
                _self.$message({
                  message: '未搜索到相关信息',
                  type: 'info'
                });
                _self.$router.push('/resource');
              } else {
                _self.$router.push('/resource');
              }
            })
          }, () => {
          })

        }
      },
      jumpCenter(path) {
        let _self = this;
        if (httpService.KEY) {
          _self.$router.push(path);
        } else {
          this.$store.dispatch('setUrl', path).then(() => {
            this.$router.push('/login');
          });
        }
      },
      jump(path) {
        if (path === '/login') {
          let srcUrl = this.$route.path;
          if (this.$route.path === '/register' || this.$route.path == '/forget') srcUrl = '/login'
          srcUrl = srcUrl === '/login' ? '/' : srcUrl;
          this.$store.dispatch('setUrl', srcUrl).then(() => {
            this.$router.push('/login');
          });
        } else {
          this.$router.push(path);
        }
      },
      getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      },
      clearCookie(name) {
        // this.setCookie(name, "", -1);
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) {
          document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
        }
      },
      setCookie(name, value, days) {
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      },
      quit() {
        let _self = this;
        this.$confirm('是否要退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          httpService.KEY = '';
          httpService.SID = '';
          httpService.customerId = '';
          window.localStorage.KEY = '';
          window.localStorage.SID = '';
          _self.clearCookie('KEY');
          _self.clearCookie('SID');
          _self.$store.dispatch('quitWeb')
            .then(() => {
              _self.$store.dispatch('clearMessageTotal');
              _self.$router.push('/');
            }, () => {

            });

        }).catch(() => {

        });
      },
      handleSelect(val) {
        this.searchResource(val.breedName);
      },
      querySearchAsync(queryString, cb) {
        //console.log(queryString)
        let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
        if (!pattern.test(queryString)) {
          cb([{
            value: '请输入关键字',
            keyWord: ''
          }]);
          return;
        }
        ;
        let _self = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          httpService.commonPost(httpService.urlCommon + httpService.apiUrl.most, {
            biz_module: 'searchKeywordService',
            biz_method: 'querySearchKeywordBreed',
            biz_param: {
              keyWord: queryString,
              pn: 1,
              pSize: 20
            }
          }).then(function (suc) {
            let src = suc.biz_result.list;
            for (var i = 0; i < src.length; i++) {
              let obj = src[i];
              obj.value = obj.breedName;
              cb(suc.biz_result.list);
            }
            ;
          }).catch(function (err) {
            cb([{
              value: '请输入关键字',
              keyWord: ''
            }]);
          });
        }, 300);
      },
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
      //获取地址 存入本地
      getLocation(){
        function sortArr(item, type) {
          item.label = item.cname;
          item.value = item.id;
          if (item.childList.length > 0) item.children = item.childList;
          if (item.childList.length > 0) item.children.forEach(function (childItem) {
            sortArr(childItem);
          })
        }

        let _self = this;
        httpService.commonPost(httpService.urlCommon + httpService.apiUrl.most, {
          biz_module: 'locationService',
          biz_method: 'queryLocationList',
          biz_param: {}
        }).then(function (suc) {
          suc.biz_result.list.forEach(function (item) {
            sortArr(item);
          });
          //存入VUX
          _self.$store.dispatch('sch_getCityList', suc.biz_result.list);
          window.localStorage.cityList = JSON.stringify(suc.biz_result.list);
        }).catch(function (err) {
          _self.$store.dispatch('sch_getCityList', []);
        })
      }
    }

  }
</script>
