<style lang="less" scoped>
.topSlide {
    ul,
    li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .items {
        display: flex;
        flex-direction: row;
        height: 52px;
        justify-content: flex-start;
        li {
            flex: 0 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            position: relative;
            a {
                padding: 0 10px;
                color: #777777;
                text-decoration: none;
                height: 50px;
                line-height: 50px;
                border-bottom: 2px solid #FFFFFF;
                font-size: 16px;
                background-color: #fff;
                color: #333;
            }
            span {
                padding: 0 35px;
                line-height: 48px;
                color: #E0E0E0;
            }
            .num {
                display: block;
                height: 16px;
                line-height: 16px;
                padding: 0 7px;
                background-color: #F08200;
                color: #fff;
                font-size: 12px;
                position: absolute;
                left: 80px;
                top: 5px;
                border-radius: 4px;
            }
        }
        .top_tit {
            height: 52px;
            line-height: 52px;
            border-bottom: 1px solid #F1F1F1;
            background-color: #F8F8F8;
            color: #333333;
            font-size: 18px;
        }
        .active {
            a {
                color: #27A961;
                border-bottom: 2px solid #27A961;
                font-weight: 700;
            }
        }
    }
}
</style>
<template>
    <div class="topSlide">
        <ul class="items">
            <li class="item" :class="{'active': item.link === $route.path}" v-for="item in navList">
                <router-link :to="item.link">{{item.title}}</router-link>
                <span v-if="item.index < navData.length - 1">|</span>
                <span class="num" v-if="item.total > 0">
                    {{item.total}}
                </span>
            </li>
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
    },
    computed: {
        navList() {
            let typeList = this.$store.state.message.messageType;
            let result = this.navData;
            result.forEach(function(item) {
                item.total = 0;
            });
            if (this.$store.state.message.messageType.length > 0) {
                typeList.forEach(function(item) {
                    for (var i = 0; i < result.length; i++) {
                        if (item.type === result[i].type) {
                            result[i].total = item.total;
                        }
                    }
                })
            };
            return result;
        }
    }
}
</script>
