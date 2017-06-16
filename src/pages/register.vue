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
                min-height: 450px;
                margin: 35px 0;
            }
        }
    }
}
</style>
<template>
    <div class="content_body">
        <headerView title="欢迎注册"></headerView>
        <div class="content">
            <div class="step">
                <div v-show="step==1">
                    <img src="../assets/images/step1.png">
                    <div class="border">
                        <registerView v-on:step="stepChange"></registerView>
                    </div>
                </div>
                <div v-show="step==2">
                    <img src="../assets/images/step2.png">
                    <div class="border">
                        <informationView v-on:step="stepChange"></informationView>
                    </div>
                </div>
                <div v-show="step==3">
                    <img src="../assets/images/step3.png">
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
import registerView from '../components/register/register.vue'
import informationView from '../components/register/base_information.vue'
import successView from '../components/register/success.vue'
export default {
    name: 'register_view',
    data() {
        return {
            step:1
        }
    },
    components: {
        headerView,
        footerView,
        registerView,
        informationView,
        successView
    },
    methods: {
        stepChange(step) {
            this.step = step;
        }
    }
}
</script>
