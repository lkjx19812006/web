<style scoped lang="less">
.help {
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
}
</style>
<template>
    <div class="help">
        <div class="top_nav">
            <ul class="nav_wrap">
                <li class="nav_item" :class="{'active': $route.path === item.link}" v-for="item in navs" :key="item.title">
                    <router-link :to="item.link"> {{item.title}} </router-link>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="home_content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
let navs = [{
    title: '注册流程',
    link: '/aboutUsNew/help/helpRegister',
    hovers: false
},{
    title: '如何找货',
    link: '/aboutUsNew/help/helpSeek',
    hovers: false
}]
export default {
    name: 'help-view',
    data() {
        return {
            navs: navs,
        }
    }
}
</script>
