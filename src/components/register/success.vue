<style lang="less" scoped>
.content {
    flex-direction: column;
    align-items: center;
    img {
        margin-top: 50px;
    }
    .center {
        font-size: 14px;
        line-height: 44px;
        .orange_span {
            cursor: pointer;
        }
    }
    .big_orange_span {
        color: #78B114;
        font-size: 18px;
        line-height: 36px;
        margin: 0 10px;
    }
    .orange_button {
        margin-top: 16px;
        background-color: #7BB919;
        font-size: 18px;
        color: #fff;
        font-weight: 700;
    }
   
}
</style>
<template>
    <div class="content">
        <img src="../../../static/icon/registerSuccess.png" height="70" width="100">
        <div class="big_orange_span">恭喜您注册完成</div>
        <div class="center">尊敬的用户，您已成功注册药材买卖网，请<span class="orange_span" @click="login()">点击登录</span>！</div>
        <el-button size="large" class="orange_button" type="primary" @click.self.stop="login()">立即登录</el-button>
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
            login() {
                this.$router.push('/login');
            }
        }
}
</script>
