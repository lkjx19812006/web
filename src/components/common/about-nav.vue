<style scoped>
a {
    text-decoration: none;
}

.nav_about .el-menu {
    background: #FBFAF6;
}
</style>
<template>
    <div class="nav_about">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item :index="item.index" v-for="item in getList" :key="item.path">
                <router-link :to="base + item.path">
                    <div class="mynav">{{item.name}}</div>
                </router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'

let _self = this;
export default {
    name: 'about-nav-view',
    props: {
        base: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            wrapperHeight: '',
            urlArr: [],
            /*activeIndex: '0'*/
        }
    },
    computed: {
        getList() {
            return [{
                path: '/about',
                index: '0',
                name: '关于药材买卖网'
            }, {
                path: '/law',
                index: '1',
                name: '法律声明'
            }, {
                path: '/contact',
                index: '2',
                name: '联系我们'
            }, {
                path: '/help',
                index: '3',
                name: '帮助'
            }]
        },
        activeIndex() {
            let _self = this;
            let path = this.$route.path.split('/')[2];
            let index ='';
            switch (path) {
                case 'about':
                    index = '0';
                    break;
                case 'law':
                    index = '1';
                    break;
                case 'contact':
                    index = '2';
                    break;
                case 'help':
                    index = '3';
                    break;
            }
            return index
        }
    },
    methods: {
        // handleSelect(key, keyPath) { // console.log(key, keyPath); // this.activeIndex = keyPath; // }

    },
    mounted() {
        let _self = this;
        let path = this.$route.path.split('/')[2];
       /* switch (path) {
            case 'about':
                _self.activeIndex = '0';
                break;
            case 'law':
                _self.activeIndex = '1';
                break;
            case 'contact':
                _self.activeIndex = '2';
                break;
            case 'help':
                _self.activeIndex = '3';
                break;
        }*/

    }
}
</script>
