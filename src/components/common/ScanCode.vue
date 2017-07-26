<style lang="less" scoped>
  .scanCode {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    z-index: 98;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 240px;
    background-color: rgba(0, 0, 0, .6);
    .img_left {
      flex: 0 0 auto;
      height: 280px;
      img {
        max-height: 280px;
      }
      align-self: flex-end;
      margin-right: 80px;
    }
    .code_wrap {
      flex: 0 0 auto;
      height: 375px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .top_img_txt {
        flex: 0 0 auto;
        margin-top: 10px;
        img {
          width: 300px;
        }
      }
      .btn_code {
        flex: 1;
        display: flex;
        padding-top: 15px;
        flex-direction: row;
        justify-content: space-between;
        .code_img_wrap {
          position: relative;
          img {
            height: 100px;
            width: 100px;
          }
          span {
            margin-top: 5px;
            font-size: 16px;
            color: #fff;
            display: block;
            text-align: center;
          }
          .line {
            height: 38px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100px;
            background: -webkit-linear-gradient(top, rgba(255, 118, 0, .1), rgba(255, 118, 0, .4), rgba(255, 118, 0, .1));
            animation: scan 1s 0s infinite ease-in-out;
            /*background-color: red;*/
          }
          @keyframes scan {
            0% {
              -webkit-transform: translateY(0px);
              height: 10px;
              /*opacity: 1;*/
            }
            100% {
              -webkit-transform: translateY(60px);
              height: 38px
              /*opacity: 1;*/
            }
          }
        }
        .btn_wrap {
          margin-left: 30px;
          div {
            height: 38px;
            width: 140px;
            cursor: pointer;
          }
          .ios_btn {
            background: url('../../../static/icon/btn_ios.png') no-repeat center;
            background-size: cover;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .and_btn {
            background: url('../../../static/icon/btn_and.png') no-repeat center;
            background-size: cover;
          }
          .ios_active {
            background: url('../../../static/icon/btn_ios1.png') no-repeat center;
            background-size: cover;
          }
          .and_active {
            background: url('../../../static/icon/btn_and1.png') no-repeat center;
            background-size: cover;
          }
        }
      }
    }
    .close {
      height: 20px;
      width: 20px;
      position: absolute;
      top: 10px;
      right: 10px;
      background: url('../../../static/icon/codeClose.png') no-repeat center;
      background-size: cover;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="scanCode">
    <div class="img_left">
      <img src="../../../static/icon/showPhone.png">
    </div>
    <div class="code_wrap">
      <div class="top_img_txt">
        <img src="../../../static/icon/codeTxt.png">
      </div>
      <div class="btn_code">
        <div class="code_img_wrap">
          <!--ios-->
          <img src="../../assets/images/ios.png" v-show="btnSelect === 1">
          <!--android-->
          <img src="../../assets/images/android.png" v-show="btnSelect === 2">
          <span>扫描下载APP</span>
          <div class="line">
          </div>
        </div>
        <div class="btn_wrap">
          <div class="ios_btn" :class="{'ios_active': btnSelect === 1}" @click="btnSelect = 1">
          </div>
          <div class="and_btn" :class="{'and_active': btnSelect === 2}" @click="btnSelect = 2">
          </div>
        </div>
      </div>
    </div>
    <div class="close" @click="close">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        btnSelect: 2 //1是ios 2是安卓
      }
    },
    methods: {
      close(){
        this.$emit('close');
      }
    }
  }
</script>
