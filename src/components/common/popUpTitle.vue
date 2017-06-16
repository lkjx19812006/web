<style lang="less" scoped>
.popTitle {
    .shade {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: black;
        opacity: 0.5;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: 15;
    }
    .title {
        position: absolute;
        width: 600px;
        margin-left: -300px;
        z-index: 100;
        left: 50%;
        top: 170px;
        .head {
            width: 100%;
            background-color: #FA6705;
            padding: 10px 0;
            text-align: center;
            color: #fff;
            font-size: 18px;
            position: relative;
            img {
                position: absolute;
                right: -7px;
                top: -7px;
            }
        }
        .content {
            width: 100%;
            background-color: #fff;
            padding: 20px;
            text-indent: 2em;
            font-size: 16px;
            line-height: 25px;
            box-sizing: border-box;
            min-height: 400px;
        }
    }
}
</style>
<template>
    <div class="popTitle">
        <div class="title" v-show="popParam.mydetail">
            <div class="head">
                {{popParam.title}}
                <img src="../../static/icon/mycancel.png" @click="cancel">
            </div>
            <div class="content">
                {{popParam.contents}}
            </div>
        </div>
        <div class="shade" v-show="popParam.mydetail" @click="cancel"></div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {

    data() {
            return {}

        },
        props: {
            popParam: {

            }
        },
        methods: {
            cancel() {
                 this.popParam.mydetail = false;
            }
        }
}
</script>
