<style scoped lang="less">
  ul li {
    list-style: none;
  }

  .logistics_box {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 30px;
    line-height: 20px;
    font-size: 14px;
    .item {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      img {
        flex: 0 0 auto;
        margin-right: 10px;
      }
      .box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .now {
      color: #fa8435;
    }
  }


</style>
<template>
  <div class="logistics_box">
    <div v-if="param.arr.length == 0 && param.show" style="text-align: center">物流信息正在加载中...</div>
    <div v-if="param.arr.length == 0 && !param.show" style="text-align: center">物流信息获取失败！！！</div>
    <ul class="item-wrap">
      <li v-for="item,index in param.arr" class="item" :class="{'now':index===0}">
        <img src="../../assets/images/ct.png" v-if="index == 0">
        <img src="../../assets/images/unct.png" v-else>
        <div class="box">
          <div class="context">{{item.context}}</div>
          <div class="emtry"></div>
          <div class="time">{{item.time}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {

    data() {
      return {}
    },
    props: {
      param: {
        type: Object,
        default: {}
      }
    },
    mounted(){
      console.log(this.param)
    },
    methods: {
      cancel() {
        this.param.show = false;
      }
    }
  }
</script>
