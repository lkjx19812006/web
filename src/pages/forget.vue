<style lang="less" scoped>
@width : 1200px;
.content_body {
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
    height: 100vh;
    .content {
        flex: 1 0 auto;
        display: flex;
        justify-content: center;
        .step {
            margin-top: 60px;
            width: @width;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                flex: 0 0 auto;
            }
            .border {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 350px;
                margin: 10px 0;
               
            }
        }
    }
}
</style>
<template>
    <div class="content_body">
        <headerView title="忘记密码"></headerView>
        <div class="content">
            <div class="step">
                <div v-show="step==1">
                    <img src="../assets/images/forget1.jpg">
                    <div class="border">
                        <forgetView v-on:step="stepChange" :ruleForm="ruleForm"></forgetView>
                    </div>
                </div>
                <div v-show="step==2">
                    <img src="../assets/images/forget2.jpg">
                    <div class="border">
                        <changPsw v-on:step="stepChange" :ruleForm="ruleForm"></changPsw>
                    </div>
                </div>
                <div v-show="step==3">
                    <img src="../assets/images/forget3.jpg">
                    <div class="border">
                        <successView></successView>
                    </div>
                </div>
            </div>
        </div>
        <footerView></footerView>
    </div>
</template>
<script>
import httpService from '../common/httpService.js'
import headerView from '../components/header.vue'
import footerView from '../components/foot.vue'
import forgetView from '../components/forget/forget.vue'
import changPsw from '../components/forget/changPsw.vue'
import successView from '../components/forget/success.vue'
export default {
    name: 'forget_view',
    data() {
        return {
            step: 1,
            ruleForm: {
                phone: '',
                identiCode: '',
                messageCode: '',
                password: '',
                rePassword: ''
            },
        }
    },
    components: {
        headerView,
        footerView,
        forgetView,
        changPsw,
        successView
    },
    methods: {
        stepChange(params) {
            if (params.step == 2) {
                this.ruleForm.phone = params.ruleForm.phone;
                this.ruleForm.identiCode = params.ruleForm.identiCode;
                this.ruleForm.messageCode = params.ruleForm.messageCode;
            }
            this.step = params.step;
        }
    }
}
</script>
