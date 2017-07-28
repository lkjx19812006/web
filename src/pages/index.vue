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
      flex-direction: column;
      align-items: center;
      .swiper {
        margin-bottom: 35px;
        width: 100%;
        img {
          width: 100%;
          min-height: 400px;
        }
      }
      .arrondi {
        display: flex;
        flex-direction: row;
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
        .left_static {
          flex: 0 1 auto;
          margin-left: -100px;
          position: fixed;
          top: 580px;
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
          .activeCode {
            background-color: #FA8435;
          }
        }
        .right_arrondi {
          flex: 1 1 auto;
          width: 1200px;
          margin: auto;
        }
      }
    }
  }
</style>
<template>
  <div class="content_body">
    <upgradeMsg v-on:show="changeShow" v-if="showUpgrade"></upgradeMsg>
    <headerView tab="1"></headerView>
    <div class="content">
      <div class="swiper">
        <el-carousel height='400px'>
          <el-carousel-item v-for="item, index in imgArray" :key="item.webImg">
            <img :src="item.webImg" @click="jump(item.activityUrl, index)" class="bigImgs">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="arrondi">
        <transition name="fade">
          <ScanCode v-on:close="closeCode" v-if="(showIndex === 3 && !isClose) || !isClose"></ScanCode>
        </transition>
        <div class="left_static" :style="{ marginTop: disTop + 'px' }">
          <div class="district" :class="{'activeCode': index === showIndex || (!isClose && index === 3)}"
               v-for="(item,index) in leftArray"
               :key="index" @click="searchId(index)">
            <img :src="item.image">
            <p>{{item.title}}</p>
          </div>
        </div>
        <div class="right_arrondi">
          <needArrondi id="a0"></needArrondi>
          <resourceArrondi id="a1"></resourceArrondi>
          <preSellArrondi id="a2"></preSellArrondi>
          <mediaArrondi></mediaArrondi>
        </div>
      </div>
    </div>
    <footerView></footerView>
  </div>
</template>
<script>
  import common from '../common/httpService.js'
  import footerView from '../components/foot.vue'
  import drugFactory from '../components/index/drugFactory.vue'
  import mediaArrondi from '../components/index/mediaArrondi.vue'
  import needArrondi from '../components/index/needArrondi.vue'
  import preSellArrondi from '../components/index/preSellArrondi.vue'
  import resourceArrondi from '../components/index/resourceArrondi.vue'
  import upgradeMsg from '../components/index/upgradeMsg.vue'
  import headerView from '../components/header.vue'
  import ScanCode from '../components/common/ScanCode.vue'
  export default {
    name: 'index_view',
    data() {
      return {
        showUpgrade: false,
        showIndex: -1,
        imgArray: [],
        disTop: 55,
        leftArray: [{
          title: '求购专区',
          image: '/static/icon/Buying-area.png'
        }, {
          title: '资源专区',
          image: '/static/icon/Resource-area.png'
        }, {
          title: '预售专区',
          image: '/static/icon/Pre-sale-area.png'
        }, {
          title: '下载APP',
          image: '/static/icon/code.png'
        }, {
          title: '回到顶部',
          image: '/static/icon/top.png'
        }]
      }
    },
    computed: {
      isClose(){
        return this.$store.state.user.isClose;
      }
    },
    components: {
      headerView,
      footerView,
      drugFactory,
      mediaArrondi,
      needArrondi,
      preSellArrondi,
      resourceArrondi,
      upgradeMsg,
      ScanCode
    },
    mounted() {
      this.getImgArr();
      let _self = this;
      window.onscroll = function () {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0;
        if (scrollTop >= 185) {
          _self.disTop = 55 - 185;
        } else if (scrollTop > 0) {
          _self.disTop = 55 - scrollTop;
        } else {
          _self.disTop = 55
        }
      };
      //获取本地缓存
      let str = window.localStorage.getItem('showUpgrade');
      if (!!str && str != '{}') {
        str = JSON.parse(str);
        if (!str.showUpgrade) {
          this.showUpgrade = true;
          return;
        }
        this.showUpgrade = false;
      } else {
        this.showUpgrade = true;
        window.localStorage.setItem('showUpgrade', JSON.stringify({
          'showUpgrade': true
        }))
      }
    },
    methods: {
      changeShow(val) {
        this.showUpgrade = val;
      },
      closeCode(){
        this.showIndex = -1;
        this.$store.dispatch('setIsClose', true);
      },
      getImgArr() {
        let _self = this;
        common.commonPost(common.urlCommon + common.apiUrl.most, {
          biz_module: 'activityService',
          biz_method: 'queryActivityList',
          biz_param: {
            type: 2
          }
        }).then((res) => {
          console.log(res);
          let newArr = [];
          for (var i = 0; i < res.biz_result.list.length; i++) {
            let obj = res.biz_result.list[i];
            if (obj.webImg) {
              newArr.push(obj);
            }
          }
          ;
          console.log(1234, newArr)
          _self.imgArray = newArr;
        }, (err) => {
          console.log(err);
        })
      },
      jump(path, index) {
        //登录了的 跳转到发布页 没有登录的 跳转到登录页
        //资源发布页 是最后一个链接的地址 求购发布是
        //publish/resource
        let Reg1 = /\/publish\/resource/g;
        if (Reg1.test(path)) {
          //登录了并且是资源发布页 或者求购发布页的路径时
          if (this.$store.state.user.user.phone) {
            this.$router.push('/publish/resource');
          } else {
            this.$store.dispatch('setUrl', '/publish/resource').then(() => {
              this.$router.push('/login');
            });
          }
        } else {
          if (path) {
            let newWin = window.open();
            newWin.location.href = path;
          }
        }
      },
      searchId(index) {
        let _self = this;
        this.showIndex = index;
        let anchor = document.getElementById("a" + index);
        let top = 0;
        switch (index) {
          case 0:
            top = anchor.offsetTop - 200;
            break;
          case 1:
            top = anchor.offsetTop - 200;
            break;
          case 2:
            top = anchor.offsetTop - 200;
            break;
          case 3:
            this.$store.dispatch('setIsClose', false);
            break;
          case 4:
            top = 1;
            break;
          default:
            break;
        }
        if (top) {
          document.body.scrollTop = top - 1;
          document.documentElement.scrollTop = top - 1;
        }
      },
    }
  }
</script>
