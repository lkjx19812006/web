<style lang="less" scoped>
.msg {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .img_wrap {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 20px;
        height: 80px;
        .tit {
            color: #F88437;
            font-size: 18px;
            line-height: 20px;
            padding-top: 35px;
            padding-left: 20px;
        }
    }
    .cont {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 45px;
        p {
        	text-align: center;
        	font-size: 16px;
        	line-height: 32px;
        	padding: 0;
        	margin: 0;
        }
    }
}
</style>
<template>
    <div class="msg">
        <div class="img_wrap">
            <img src="../assets/images/success.jpg" alt="">
            <span class="tit">
            	{{title}}
            </span>
        </div>
        <div class="cont">
            <p>尊敬的用户，我们会在12小时内与您联系；</p>
            <p>您也可以拨打我们的客服电话与我们联系；</p>
            <p style="color:#F88437;">电话号码: {{phone}}</p>
        </div>
    </div>
</template>
<script>
import common from '../common/httpService.js'
export default {
    props: {
        title: '',
        phone: '',
    },
    data() {
            return {             
            }
        },
        components: {

        },
        mounted() {

        },
        computed: {

        },
        methods: {


        }
}
</script>
