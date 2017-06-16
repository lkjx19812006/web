<style lang="less" scoped>
.pops {
    .pop_big {
        position: absolute;
        width: 600px;
        z-index: 100;
        left: 90px;
        top: -50px;
        .image {
            width: 100%;
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            .mycancel {
                width: 14px;
                height: 14px;
                position: absolute;
                right: -7px;
                top: -7px;
            }
        }
    }
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
}
</style>
<template>
    <div class="pops">
        <div v-show="popParam.bigImg" class="pop_big" @click="cancel">
            <div class='image'>
                <img :src="popParam.bigUrl">
                <img src="../../static/icon/mycancel.png" @click="cancel" class="mycancel">
            </div>
        </div>
        <div class="shade" v-if="popParam.pops_show" @click="cancel"></div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    name: 'orderlist-view',
    data() {
        return {
            bigImg: false,
            bigUrl: ''
        }

    },
    props: {
        popParam: {

        }
    },
    components: {

    },
    mounted() {

    },
    methods: {
        cancel() {
            this.popParam.bigImg = false;
            this.popParam.pops_show = false;
            this.popParam.bigUrl = '';
        },


    }
}
</script>
