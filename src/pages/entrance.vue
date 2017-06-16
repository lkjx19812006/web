<style lang="less" scoped>
.entrance{
    width:100%;
    .main{
       width:1200px;
       margin:auto;
       min-height:650px;
       display:flex;
       flex-direction:row;
       img{
          width:210px;
          height:210px;
          margin-left:142px;
          margin-top:180px;
       }
    }
}
</style>
<template>
    <div class="entrance">
        <MainHeader></MainHeader>
        <div class="main">
            <img src="../static/icon/erp.png" @click="jump('http://erp.yaocaimaimai.net/erp/#!/login')"> 
            <img src="../static/icon/WMS.png" @click="jump('http://erp.yaocaimaimai.net:3002')">
            <img src="../static/icon/cms.png" @click="jump('http://erp.yaocaimaimai.net/cms/login')">
        </div>
        <div class="footer">
            <MainFooter></MainFooter>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'

import MainHeader from '../components/entranceHead.vue';
import MainFooter from '../components/foot.vue';
import common from '../common/httpService.js'

export default {
    name: 'home-view',
    data() {
        return {
            httpParam: {
                employee: '',
                name: '',
                region: '',
                status: '',
                pn: 1,
                pSize: 20
            },

        }
    },
    components: {
        MainHeader,
        MainFooter
    },
    methods:{
        jump(path){
            let _self = this;
            window.location.href = path;
        }
    },
    mounted() {
       
    }
}
</script>
