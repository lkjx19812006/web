<style scoped lang="less">
.aboutUsNew {
    ul,
    li {
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    .main {
        .side_top {
            background-color: #FA8435;
            .nav_wrap {
                width: 1200px;
                height: 68px;
                display: flex;
                flex-direction: row;
                list-style: none;
                align-items: stretch;
                margin: auto;
                .nav_item {
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    margin-right: 45px;
                    a {
                        line-height: 68px;
                        padding: 0 20px;
                    }
                }
                .active {
                    background-color: #FFAA46;
                }
            }
        }
    }
}
</style>
<template>
    <div class="aboutUsNew">
        <MainHeader></MainHeader>
        <div class="main">
            <div class="side_top">
                <ul class="nav_wrap">
                    <li class="nav_item" :class="{'active': index === vaildata()}" v-for="(item, index) in aboutNav" :key="item.title">
                        <router-link :to="item.link"> {{item.title}} </router-link>
                    </li>
                </ul>
            </div>
            <div class="center">
                <div class="home_content">
                    <router-view></router-view>
                </div>
            </div>
            <!-- <div style="clear:both"></div> -->
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
let aboutNav = [{
    title: '关于我们',
    link: '/aboutUsNew/about',
    acLink: ''
}, {
    title: '法律声明',
    link: '/aboutUsNew/law/statement',
    acLink: '/aboutUsNew/law',
}, {
    title: '媒体报道',
    link: '/aboutUsNew/media/reports',
    acLink: '/aboutUsNew/media'
}, {
    title: '帮助中心',
    link: '/aboutUsNew/help/helpRegister',
    acLink: '/aboutUsNew/help'
}]
import MainHeader from '../components/header.vue';
import MainFooter from '../components/foot.vue';
import memberNav from '../components/common/about-nav.vue';
import common from '../common/httpService.js';
export default {
    name: 'aboutUs_view',
    data() {
        return {
            aboutNav: aboutNav,
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
    mounted() {
        common.KEY = window.localStorage.KEY;
        common.SID = window.localStorage.SID;
    },
    methods: {
        vaildata() {
            let srcUrl = this.$route.matched[1].path
            for (var i = 0; i < this.aboutNav.length; i++) {
                let url = this.aboutNav[i];
                if (url.link === srcUrl || this.$route.path === url.link || url.acLink === srcUrl) {
                    return i;
                }
            }
            return -1;
        }
    }
}
</script>
