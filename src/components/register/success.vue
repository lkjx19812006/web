<style lang="less" scoped>
.content {
  flex-direction: column;
  align-items: center;
  .success{
  	display: flex;
  }
  .center{
  	font-size:14px;
  	margin:30px 0;
  	.orange_span{
  		cursor: pointer;
  	}
  }
  .big_orange_span{
  	color:#FA8435;
  	font-size: 18px;
  	line-height: 62px;
  	margin:0 10px;
  }
  div{
  	flex:1 0 auto;
  }
}
</style>
<template>
  <div class="content">
  <div class="success"><img src="../../assets/images/complete.png"><div class="big_orange_span">恭喜您注册完成</div></div>
  <div class="center">尊敬的用户，您已成功注册药材买卖网，请<span class="orange_span" @click="login()">点击登录</span>！</div>
   <el-button size="large" class="orange_button" type="primary" @click="login()">立即登录</el-button>
  </div>
</template>
<script>
import httpService from '../../common/httpService.js'
export default {
  data() {
    return {
      
    }
  },
  methods: {
  	login(){
  		 this.$router.push('/login');
  	}
  }
}
</script>
