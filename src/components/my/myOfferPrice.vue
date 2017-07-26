<style lang="less" scoped>
  // 我的报价
  .myOfferPrice_item {
    .myOfferPrice {
      padding: 25px;
      width: 960px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      border: 1px solid #E6E6E6;
      margin-bottom: 30px;
      .top_info_wrap {
        border-bottom: 1px solid #E6E6E6;
        display: flex;
        flex-direction: row;
        padding-bottom: 25px;
        .slide_img {
          width: 160px;
          height: 140px;
          .img_wrap {
            width: 160px;
            height: 140px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            img {
              max-height: 160px;
            }
          }
        }
        .txt_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 25px;
          .title_wrap {
            .name {
              font-size: 22px;
              color: #666666;
            }
            .number {
              font-size: 18px;
              margin: 0 10px;
              color: #666666;
            }
            .time {
              font-size: 16px;
              color: #999999;
            }
            span {
              color: #666666;
              font-size: 16px;
            }
          }
        }
        .state_wrap {
          flex: 0 0 180px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          .comments_info {
            flex: 1;
            font-size: 16px;
            /*box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .2), 0 0 6px 0 rgba(0, 0, 0, .1);*/
            /*background-color: #fbfbfb;*/
          }
        }
      }
      .bot_info_des {
        padding-top: 15px;
        flex: 0 0 auto;
        width: 908px;
        display: flex;
        flex-direction: column;
        .top_wrap {
          display: flex;
          flex: 0 0 auto;
          width: 908px;
          flex-direction: row;
          justify-content: space-between;
          .des_wrap {
            flex: 1;
            padding-right: 20px;
            .product_info {
              margin-bottom: 15px;
              display: flex;
              flex-direction: row;
              .product_info_tit {
                flex: 0 1 auto;
              }
              .product_info_cot {
                flex: 1;
              }
            }
          }
          .btn_wrap {
            flex: 0 0 200px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            font-size: 16px;
            .btn_cont {
              color: #58BC85;
              width: 200px;
              text-align: center;
              padding: 5px 0;
              border-radius: 2px;
              border: 1px solid #58BC85;
              cursor: pointer;
              position: relative;
              .contact_info {
                position: absolute;
                left: 0px;
                top: -40px;
                padding: 5px 0;
                width: 200px;
                text-align: center;
                color: #58BC85;
                background-color: #fbfbfb;
                box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .2), 0 0 6px 0 rgba(0, 0, 0, .1);
                border-radius: 4px;

              }
            }
            .btn_cont:hover {
              color: #fff;
              background-color: #58BC85;
            }
            .erm_wrap_content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: #fff;
              width: 120px;
              padding: 5px;
              padding-top: 12px;
              border-radius: 5px;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
              border: 1px solid #d1dbe5;
              margin-bottom: 10px;
              span {
                padding: 2px 0;
              }
            }
          }
        }

      }
    }
    .step {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      .step_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img_item {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .line {
            flex: 1;
            border-bottom: 1px solid #ddd;
          }
          img {
            width: 50px;
            height: 50px;
            margin: 0 20px;
          }
          .steped {
            border-bottom-color: #79B054;
          }
        }
        .content {
          text-align: center;
        }
        .steped {
          color: #79B054;
        }
        .noSelect {
          color: #FF6869;
        }
      }

    }
    .btn_wrap_showList {
      padding: 10px 0;
      text-align: center;
      span {
        padding: 10px 20px;
        border: 1px solid #FAB735;
        background-color: #FAB735;
        color: #fff;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
</style>
<template>
  <div class="myOfferPrice_item">
    <div class="myOfferPrice" v-for="(item, index) in detailObj.list" :key="index" v-show="index <= showIndex">
      <div class="top_info_wrap">
        <div class="slide_img">
          <el-carousel trigger="click" indicator-position="none" height="140px">
            <el-carousel-item v-for="(img, index) in item.image" :key="index">
              <div class="img_wrap">
                <img :src="img">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="txt_info">
          <div class="title_wrap">
            <span class="name">{{item.breedName}}</span>
            <span class="number">(&nbsp;{{item.number + item.unit}}&nbsp;)</span>
            <span class="time">报价时间：{{item.otime | formatBirth}}</span>
          </div>
          <div class="spec">
            <span class="detail_tit">规格：</span>
            <span class="detail_info">{{item.spec}}</span>
          </div>
          <div class="location">
            <span class="detail_tit">产地：</span>
            <span class="detail_info">{{item.location}}</span>
          </div>
          <div class="price">
            <span class="detail_tit">价格：</span>
            <span class="detail_info">{{item.price + '元/' + item.unit}}</span>
          </div>
        </div>
        <div class="state_wrap">
          <div class="comments_info">
            <span style="color: #333">报价状态：</span>
            <span style="color: #75AA53" v-if="item.accept === 0">受理中</span>
            <span style="color: #D65B5B" v-if="item.accept === 1">已采用</span>
            <span style="color: #FF291E" v-if="item.accept === 2">未采用</span>
            <span style="color: #75AA53" v-if="item.accept === 3">受理中</span>
            <div style="display: flex; flex-direction: row; margin-top: 5px; width: 100%"
                 v-if="item.accept == 2 && item.comments != ''">
              <span style="width: 50px; flex: 0 0 auto">原因：</span>
              <span style="flex: 1">{{item.comments}}</span>
            </div>
          </div>
          <div class="img_wrap" v-if="item.accept === 1">
            <img src="../../static/icon/caiyong.png" height="93" width="101">
          </div>

        </div>
      </div>
      <div class="step">
        <div class="step_item" v-for="subitem,idx in item.step">
          <div class="img_item" :style="{'margin-top': !!subitem.info === true?'20px': '' }">
            <div class="line" :class="{'steped': subitem.show}"></div>
            <!--默认图片地址-->
            <img src="../../../static/icon/offerStep1.png" v-if="!subitem.show">
            <img :src="subitem.img" v-else>
            <div class="line" :class="{'steped': subitem.show}"></div>
          </div>
          <div class="content" :class="{'steped': subitem.show}">
            <span :class="{'noSelect': idx === 2 &&item.accept === 2}">{{subitem.title}}</span><br/>
            <span v-if="subitem.info" style="color: #FF6869">（{{subitem.info}}）</span>
          </div>
        </div>
      </div>
      <div class="bot_info_des">
        <div class="top_wrap">
          <div class="des_wrap">
            <div class="product_info">
              <span class="product_info_tit">产品信息：</span>
              <span class="product_info_cot">{{item.quality}}</span>
            </div>
            <div class="product_info">
              <span class="product_info_tit">备注信息：</span>
              <span class="product_info_cot">{{item.priceDescription}}</span>
            </div>
          </div>
          <div class="btn_wrap">
            <div class="btn_cont" v-if="item.accept === 1"
                 v-on:mouseenter="showConcate = index" v-on:mouseleave="showConcate = -1">
              联系专属交易员
              <div class="contact_info" v-show="showConcate === index">
                <!-- {{item.employeeName}} -->
                <span class="name">{{item.employeeName}}</span>
                <!-- {{item.employeeMobil}} -->
                <span class="phone">{{item.employeeMobil}}</span>
              </div>
            </div>
            <!--只要没采纳并且没过期 都能再次报价 -->
            <div class="erm_wrap_content" v-if="item.accept != 1 && ValidateOverTime(topDetail.overTime)">
              <qrcode type="image" level="H" :size="106" :value="getEWMUrl(item)"></qrcode>
              <span>扫码再次报价</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_wrap_showList" v-if="detailObj.list.length > 1">
      <span class="showList" v-if="!showList" @click="showIndex = 999; showList = true">查看历史报价</span>
      <span class="hideList" v-if="showList" @click="showIndex = 0; showList = false">收起</span>
    </div>
  </div>
</template>
<script>
  //detailObj.accept 0 3 = 已报价=受理中  已采用 = 1 未采用=2
  import common from '../../common/httpService.js'
  import qrcode from 'v-qrcode'
  export default {
    data() {
      return {
        showConcate: -1,
        showIndex: 0,
        showList: false,
      }
    },
    props: {
      detailObj: '',
      topDetail: ''
    },
    created(){
      this.detailObj.list.forEach((item) => {
        let imgs = [
          require('../../../static/icon/offerStep1.png'),
          require('../../../static/icon/offerStep2.png'),
          require('../../../static/icon/offerStep3.png')
        ];
        let step = [
          {title: '已报价', accept: 0, img: imgs[1], show: false},
          {title: '受理中', accept: 3, img: imgs[1], show: false},
          {title: '待采用', accept: 1, img: imgs[1], show: false},
          {title: '待寄样', info: '即将上线', img: imgs[1], show: false},
          {title: '待成交', info: '即将上线', img: imgs[1], show: false}
        ];
        item.step = step;
        item.step[0].show = true;
        item.step[1].show = true;
        switch (item.accept) {
          //已采用
          case 1:
            item.step[2].title = '已采用';
            item.step[2].img = imgs[1];
            item.step[2].show = true;
            break;
          //未采用
          case 2:
            item.step[2].title = '未采用';
            item.step[2].img = imgs[2];
            item.step[2].show = true;
            break;
        }
      })
    },
    components: {
      qrcode
    },
    methods: {
      ValidateOverTime(param){
        if (parseFloat(param) <= 0) {
          return false;
        } else {
          return true;
        }
      },
      getEWMUrl(row) {
        return common.commonGetEWMURL(row.breedName, row.intentionId);
      }
    }

  }
</script>
