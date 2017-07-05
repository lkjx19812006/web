<style scoped>
.content {
    font-size: 15px;
    float: left;
    width: 100%;
    position: relative;
}

.content .right {
    float: right;
    width: 80%;
}

.content .main {
    width: 1200px;
    margin: 40px auto;
    min-height: 550px;
}

.content .side_left {
    float: left;
    width: 17.5%;
    background: #fff;
    min-height: 60%;
}

a {
    color: #34495e;
    text-decoration: none;
}

.home_content {
    width: 100%;
    float: left;
}

.content .footer {
    margin-top: 55px;
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
<template>
    <div class="content">
        <MainHeader tab="9" title='会员中心'></MainHeader>
        <div class="main">
            <div class="side_left">
                <member-nav :base="'/member'">
                </member-nav>
            </div>
            <div class="right">
                <div class="home_content">
                    <router-view></router-view>
                </div>
            </div>
            <div style="clear:both">
            </div>
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

import MainHeader from '../components/header.vue';
import MainFooter from '../components/foot.vue';
import memberNav from '../components/common/member-nav.vue';
import common from '../common/httpService.js'

export default {
    name: 'member-view',
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
        memberNav,
        MainFooter
    },
    beforeMount() {
        common.KEY = window.localStorage.KEY;
        common.SID = window.localStorage.SID;      
    }
}
</script>
