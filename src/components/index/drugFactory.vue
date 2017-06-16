<style lang="less" scoped>
.drug_factory_compent {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-bottom:3px solid #67AF88;
    padding-bottom:16px;
    .title_name {
      font-size: 22px;
      color: #676767;
      flex: 0 0 auto;
    }
  }
  .imgContent {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .content {
      width: 198px;
      height:73px;
      display: flex;
      align-items:center;
      justify-content:center;
      border:1px solid #67AF88;
      overflow:hidden;
      img {
       width: 160px;
      }
    }
  }
}
</style>
<template>
  <div class="drug_factory_compent">
    <div class="title">
      <div class="title_name">合作药厂</div>
    </div>
    <div class="swiper">
      <el-carousel indicator-position="none" height="150px">
        <el-carousel-item v-for="(item, index) in imgArray" :key="index">
          <div class="imgContent">
            <div v-for="(subItem, index) in item" class="content"><img :src="index"></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        imgArray: [
          ['/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png'],
          ['/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png'],
          ['/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png', '/static/icon/login-logo.png']
        ]
      }
    },
    methods: {}
}
</script>
