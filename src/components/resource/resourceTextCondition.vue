<style lang="less" scoped>
.need_text_condition {
  display: flex;
  flex-direction: row;
  background-color: #FBFAF6;
  align-items: center;
  justify-content: space-around;
  .condition_detail {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 1 auto;
    flex-direction: row;
    padding: 10px 15px;
    .condition_detail_label {
      width: 60px;
      font-size: 14px;
      color: #666;
    }
    .condition_detail_input {
      width: 185px;
    }
  }
}
</style>
<template>
  <div class="need_text_condition">
    <div class="condition_detail">
      <p class="condition_detail_label">商品</p>
      <el-input v-model="name" placeholder="请输入商品名称" class="condition_detail_input"></el-input>
    </div>
    <div class="condition_detail">
      <p class="condition_detail_label">规格</p>
      <el-input v-model="spec" placeholder="请输入商品规格" class="condition_detail_input"></el-input>
    </div>
    <div class="condition_detail">
      <p class="condition_detail_label">产地</p>
      <el-input v-model="spec" placeholder="请输入商品规格" class="condition_detail_input"></el-input>
    </div>
    <el-button type="primary" size="large" class="orange_button">搜索</el-button>
  </div>
</template>
<script>
export default {
  data() {
      return {
        name: '',
        spec: ''
      }
    },
    props: {
      httpParam: {}
    }
}
</script>
