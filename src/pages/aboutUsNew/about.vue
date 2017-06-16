<style scoped lang="less">
.aboutNew {
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    a {
        text-decoration: none;
    }
    .top_nav {
        background-color: #F6F6F6;
        .nav_wrap {
            width: 1200px;
            height: 50px;
            display: flex;
            flex-direction: row;
            list-style: none;
            align-items: stretch;
            margin: auto;
            .nav_item {
                display: flex;
                flex-direction: row;
                align-items: stretch;
                margin-right: 15px;
                font-size: 14px;
                border-bottom: 1px solid #F6F6F6;
                a {
                    color: #555555;
                    line-height: 48px;
                    padding: 0 20px;
                }
            }
            .active {
                a {
                    color: #FA8435;
                }
                border-bottom-color: #FA8435;
            }
        }
    }
    .top_banner {
        max-width: 1980px;
        width: 100vw;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    .showBigNav {
        width: 1200px;
        margin: auto;
        margin-top: 120px;
        margin-bottom: 120px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .item_column {
            display: flex;
            height: 240px;
            flex-direction: row;
            align-items: stretch;
            border-bottom: 1px solid #dbdbdb;
            .item_row {
                cursor: pointer;
                display: flex;
                flex: 0 0 300px;
                flex-direction: column;
                justify-content: center;
                align-items: stretch;
                border-right: 1px solid #dbdbdb;
                .link_wrap {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: #929292;
                    span {
                        line-height: 40px;
                    }
                }
            }
            .item_row:hover {
                .link_wrap {
                    color: #FA8435;
                }
            }
            .last_item_row {
                border-right: none;
            }
        }
        .last_item_column {
            border-bottom: none;
        }
    }
}
</style>
<template>
    <div class="aboutNew">
        <div class="top_nav" v-if="!showBigNav">
            <ul class="nav_wrap">
                <li class="nav_item" :class="{'active': $route.path === item.link}" v-for="item in topNavs" :key="item.title">
                    <router-link :to="item.link"> {{item.title}} </router-link>
                </li>
            </ul>
        </div>
        <div class="top_banner" v-show="showBigNav">
            <img src="../../static/icon/aboutUsBgc.png">
        </div>
        <div class="showBigNav" v-show="showBigNav">
            <div class="item_column" v-for="(item, ind) in navs" :class="{'last_item_column': ind === navs.length -1 }">
                <div class="item_row" v-on:mouseenter="subItem.hovers = true" v-on:mouseleave="subItem.hovers = false" v-for="(subItem, index) in item" :class="{'last_item_row': index === item.length - 1 && index === 3}">
                    <div class="link_wrap" @click="changeShowNav(subItem.link)">
                        <img :src="subItem.img" v-show="!subItem.hovers">
                        <img :src="subItem.imgA" v-show="subItem.hovers">
                        <span>{{subItem.title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="home_content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
let navs = [
    [{
        title: '企业简介',
        link: '/aboutUsNew/about/profile',
        hovers: false,
        img: require('../../static/icon/aboutUsicon1-1.png'),
        imgA: require('../../static/icon/aboutUsicon1-2.png')
    }, {
        title: '创始团队',
        link: '/aboutUsNew/about/initiator',
        hovers: false,
        img: require('../../static/icon/aboutUsicon2-1.png'),
        imgA: require('../../static/icon/aboutUsicon2-2.png')
    }, {
        title: '发展历程',
        link: '/aboutUsNew/about/development',
        hovers: false,
        img: require('../../static/icon/aboutUsicon3-1.png'),
        imgA: require('../../static/icon/aboutUsicon3-2.png')
    }, {
        title: '团队风采',
        link: '/aboutUsNew/about/teamStyle',
        hovers: false,
        img: require('../../static/icon/aboutUsicon4-1.png'),
        imgA: require('../../static/icon/aboutUsicon4-2.png')
    }],
    [{
        title: '企业文化',
        link: '/aboutUsNew/about/corporate',
        hovers: false,
        img: require('../../static/icon/aboutUsicon5-1.png'),
        imgA: require('../../static/icon/aboutUsicon5-2.png')
    }, {
        title: '企业荣誉',
        link: '/aboutUsNew/about/honor',
        hovers: false,
        img: require('../../static/icon/aboutUsicon6-1.png'),
        imgA: require('../../static/icon/aboutUsicon6-2.png')
    }, {
        title: '联系我们',
        link: '/aboutUsNew/about/contact',
        hovers: false,
        img: require('../../static/icon/aboutUsicon7-1.png'),
        imgA: require('../../static/icon/aboutUsicon7-2.png')
    }]
]
let topNavs = [];
topNavs = topNavs.concat(navs[0], navs[1]);
export default {
    name: 'about-view',
    data() {
        return {
            navs: navs,
            topNavs: topNavs
        }
    },
    computed: {
        showBigNav() {
            if (this.$route.path === '/aboutUsNew/about') {
               return true;
            } else {
               return false;
            }
        }
    },
    methods: {
        changeShowNav(url) {
            this.$router.push(url)
        },

    }
}
</script>
