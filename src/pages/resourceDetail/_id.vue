<style lang="less" scoped>
  .resource_detail {
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
    .recommendResource {
      .my_title {
        font-size: 20px;
        padding-left: 15px;
        border-left: 2px solid #F98435;
        color: #4D4D4D;
        margin-top: 45px;
      }
      width: 1200px;
      margin: auto;
      margin-bottom: 80px;
    }
    .resource_detail_content {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1 0 auto;
      .intention_detail {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 1200px;
        margin: 20px;
        height: 500px;
        .intention_image {
          width: 550px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 45px 0 0 10px;
          position: relative;
          .img_icon {
            position: absolute;
            left: 25px;
            top: 0;
            max-width: 45px;
          }
          .big_image {
            width: 500px;
            height: 400px;
            display: flex;
            overflow: hidden;
            align-items: center;
            justify-content: center;
            img {
              height: 100%;
              width: 500px;
            }
          }
          .img_swiper {
            width: 500px;
            flex: 0 1 auto;
            margin: 20px 10px 0 0;
            .img_list_content {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              .img_content {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 80px;
                overflow: hidden;
                img {
                  flex: 1;
                  width: 100%;
                  min-height: 80px;
                }
                cursor: pointer;
              }
            }
          }
        }
        .intention {
          flex: 1;
          margin-left: 65px;
          padding-right: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          width: 500px;
          height: 100%;
          .intention_row {
            display: flex;
            flex-direction: row;
            span {
              cursor: pointer;
            }
            .left {
              flex: 3;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              .speacil_left {
                color: #F98530;
                font-size: 20px;
              }
            }
            .right {
              flex: 2;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .head_title {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              .title_font {
                display: flex;
                flex-direction: row;
                font-size: 24px;
                justify-content: flex-start;
                align-items: center;
                .especial {
                  font-size: 14px;
                  line-height: 30px;
                  padding: 0 10px;
                  color: #fff;
                  background-color: #50C8FF;
                  margin-right: 10px;
                }
                .isMy {
                  font-size: 14px;
                  line-height: 30px;
                  color: #fff;
                  padding: 0px 10px;
                  background-color: #fa5748;
                  margin-right: 10px;
                }
              }
              .shelve_time {
                font-size: 15px;
                color: #000;
                line-height: 40px;
                align-self: flex-end;
              }
            }
            width: 100%;
            font-size: 16px;
            color: #666;
            flex: 1 1 auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .number_width {
              width: 200px;
              margin: 0 0 0 20px;
            }
            .shelve_time {
              margin-left: 20px;
            }
            .row {
              display: flex;
              flex-direction: row;
              align-items: center;
              .distance {
                margin: 0 10px 0 10px;
              }
              img {
                margin: 0 10px 0 0;
              }
            }
            .btn_wrap {
              a {
                margin-left: 15px;
                color: #5D5D5D;
                font-size: 12px;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="resource_detail">
    <headerView tab="3"></headerView>
    <div class="resource_detail_content">
      <div class="intention_detail">
        <div class="intention_image">
          <img class="img_icon" :src="intention.cFlagsPath">
          <div class="big_image">
            <img :src="bigImage">
          </div>
          <div class="img_swiper">
            <el-carousel indicator-position="none" height="80px" :autoplay="false">
              <el-carousel-item v-for="(item, index) in imageList" :key="index">
                <div class="img_list_content">
                  <div class="img_content" v-for="(image, index) in item" :key="index" @click="showBigImage(image)">
                    <img :src="image">
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="intention">
          <div class="intention_row">
            <div class='head_title'>
              <div class="title_font">
                <span class="isMy" v-if="intention.isMy === 1">我的</span>
                <span class="especial" v-if="intention.especial == 1 && intention.type == 1">认证</span>
                <div>{{intention.breedName}}</div>
              </div>
              <div class='shelve_time' v-if="intention.shelveTime">上架日期{{intention.shelveTime | formatBirth}}</div>
              <div class='shelve_time' v-if="!intention.shelveTime">上架日期：近期上架</div>
            </div>
          </div>
          <div class="intention_row">
            <div class='left'>采购价格：<span class='speacil_left'>{{intention.price}}</span><span
              class='speacil_left'>元/{{intention.unit}}</span></div>
            <div class='right'>规格：
              <el-tooltip class="item" effect="dark" :content="intention.spec" placement="top-start">
                <span>{{intention.spec}}</span></el-tooltip>
            </div>
          </div>
          <div class="intention_row">
            <div class='left'>采购数量：<span class='speacil_left'>≥ {{intention.moq}}{{intention.unit}}</span></div>
            <div class='right'>产地：
              <el-tooltip class="item" effect="dark" :content="intention.location" placement="top-start">
                <span>{{intention.location}}</span></el-tooltip>
            </div>
          </div>
          <div class="intention_row">
            <div class='left'>库存数量：<span>{{intention.number}}{{intention.unit}}</span></div>
            <div class='right'>状态：在售</div>
          </div>
          <div class="intention_row">
            <div>卖点：{{intention.quality}}</div>
          </div>
          <div class="intention_row border_bottom">
            <div class="row">
              <div>专属交易员：{{intention.employeeName}}</div>
              <div class="distance">|</div>
              <img src="../../assets/images/phone-green.png">
              <div>{{intention.employeeMobil}}</div>
            </div>
          </div>
          <div class="intention_row">
            <div v-if="intention.isMy !== 1">
              <span>采购数量:</span>
              <el-input v-model="number" type="number" :min="intention.moq" :max="intention.number" :maxlength="10"
                        class="number_width">
                <el-button slot="prepend" icon="minus" @click="minus()"></el-button>
                <el-button slot="append" icon="plus" @click="add()"></el-button>
              </el-input>
            </div>
          </div>
          <div class="intention_row">
            <div class="btn_wrap" v-if="intention.isMy !== 1">
              <el-button type="primary" size="large" class="orange_button" @click="buy()">立即购买</el-button>
              <a @click="linkToPub">我有更低价的资源</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='recommendResource'>
      <div class='my_title'>推荐资源</div>
      <recommendResource></recommendResource>
    </div>
    <footerView></footerView>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import headerView from '../../components/header.vue'
  import footerView from '../../components/foot.vue'
  import recommendResource from '../../components/resource/recommendResource'
  import validation from '../../validation/validation.js'
  export default {
    data() {
      return {
        bigImage: '/static/icon/images-up.png',
        intention: {
          image: ['']
        },
        number: ''
      }
    },
    watch: {
      '$route' (newVal, oldVal) {
        this.gethttp(this.$route.params.id);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.pageYOffset = 0;
      }
    },
    components: {
      headerView,
      footerView,
      recommendResource
    },
    computed: {
      imageList() {
        let imgArr = [];
        let i = Math.ceil(this.intention.image.length / 4);
        for (let m = 0; m < i; m++) {
          let arr = [];
          let n = m * 4 + 0;
          arr.push(this.intention.image[n]);
          if (this.intention.image[n + 1]) arr.push(this.intention.image[n + 1]);
          if (this.intention.image[n + 2]) arr.push(this.intention.image[n + 2]);
          if (this.intention.image[n + 3]) arr.push(this.intention.image[n + 3]);
          imgArr.push(arr);
        }
        return imgArr;
      },
      user() {
        return this.$store.state.user.user
      }
    },
    methods: {
      linkToPub() {
        if (!this.user.id) {
          this.$store.dispatch('setUrl', "/resourcePub/" + this.intention.id).then(() => {
            this.$router.push('/login');
          });
          return;
        }
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
        ;
        this.$router.push('/resourcePub/' + this.intention.id);
      },
      minus() {
        if (this.number > this.intention.moq) {
          this.number--;
        } else {
          this.number = this.intention.moq;
        }
      },
      add() {
        if (this.number < this.intention.number) {
          this.number++;
        } else {
          this.number = this.intention.number;
        }
      },
      showBigImage(image) {
        this.bigImage = image;
      },
      buy() {
        if (!this.user.id) {
          this.$store.dispatch('setUrl', "/resourceDetail/" + this.intention.id).then(() => {
            this.$router.push('/login');
          });
          return;
        }
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
        ;
        let checkNum = validation.checkSoleNum(this.number);
        if (checkNum) {
          return this.$message({
            showClose: true,
            message: '订购数量不能为小数，请重新输入！',
            type: 'error'
          });
        }
        if (this.number < this.intention.moq) {
          return this.$message({
            showClose: true,
            message: '订购数量不能小于起订量，请重新输入！',
            type: 'error'
          });
        }
        if (this.number > this.intention.number) {
          return this.$message({
            showClose: true,
            message: '采购数量大于库存量,请重新输入！',
            type: 'error'
          });
        }
        ;
        this.intention.buyNumber = this.number;
        window.localStorage.cart = JSON.stringify(this.intention);
        this.$router.push('/orderConfirm');
      },
      gethttp(id) {
        let _self = this;
        let url = common.urlCommon + common.apiUrl.most;
        url = common.addSID(url);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'queryIntentionInfo',
          biz_param: {id: id}
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then(function (suc) {
          if (suc.biz_result.id) {
            _self.intention = suc.biz_result;
            _self.number = _self.intention.moq;
            if (_self.intention.image[0]) _self.bigImage = _self.intention.image[0];
          } else {
            _self.$router.push("/resource");
          }
        }).catch(function (err) {
        })
      }
    },
    created() {
      this.gethttp(this.$route.params.id)
    }
  }
</script>
