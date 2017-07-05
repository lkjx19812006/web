<style lang="less" scoped>
.slideNav {
    ul,
    li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .items {
        li {
            width: 224px;
            text-align: center;
            a {
                color: #777777;
                text-decoration: none;
                display: block;
                height: 55px;
                line-height: 55px;
                text-align: center;
                width: 100%;
                font-size: 16px;
                background-color: #F8F8F8;
            }
        }
        .top_tit,
        .bottom_tit {
            height: 52px;
            line-height: 52px;
            border-bottom: 1px solid #F1F1F1;
            background-color: #F8F8F8;
            color: #333333;
            font-size: 18px;
        }
        .bottom_tit {
            border: 0 none;
        }
        .active {
            a {
                color: #FF9517;
                background-color: #fff;
                font-weight: 700;
            }
        }
    }
}
</style>
<template>
    <div class="slideNav">
        <ul class="items">
            <li class="top_tit">
                消息中心
            </li>
            <li class="item" :class="{'active': item.link === $route.path}" v-for="item in navData">
                <router-link :to="item.link">{{item.title}}</router-link>
            </li>
            <li class="bottom_tit"></li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        navData: ''
    },
    data() {
        return {

        }
    }
}
</script>
