<style lang="less" scoped>
.content {
    flex-direction: column;
    align-items: center;
    .success {
        display: flex;
        margin-bottom: 20px;

    }
    .big_orange_span {
        color: #FA8435;
        font-size: 18px;
        line-height: 62px;
        margin: 0 10px;
    }
    div {
        flex: 1 0 auto;
    }
}
</style>
<template>
    <div class="content">
        <div class="success"><img src="../../assets/images/complete.png">
            <div class="big_orange_span">密码修改成功</div>
        </div>      
        <el-button size="large" class="orange_button" type="primary" @click="login()">马上登录</el-button>
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
