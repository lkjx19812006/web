<style scoped>
.nav_member {
    background-color: #eef1f6;
    color: #fff;
    height: 100%;
    border: 1px solid #DBD6D0;
}

.nav_member .member_word {
    background: white;
    color: #000;
    font-size: 24px;
}

.title_word {
    background: #EEE7E1;
}

.nav_member .head_name {
    font-size: 16px;
    margin-left: 18px;
    position: relative;
}

.nav_member .head_name img {
    width: 35px;
    position: absolute;
    left: -43px;
    top: 13px;
}

a {
    text-decoration: none;
}
</style>
<template>
    <div class="nav_member">
        <el-menu v-bind:default-active="getDefaultIndex" class="el-menu-vertical-demo">
            <template v-for="(item,index) in getList">
                <el-submenu v-bind:index="menuIndex(index)" v-if="item.children">
                    <template slot="title">
                        <!-- <i class="el-icon-message"></i> -->
                        <div class="head_name">
                            <img :src="item.url"> {{item.name}}
                        </div>
                    </template>
                    <router-link :to="base + subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex">
                        <el-menu-item v-bind:index="subMenuIndex(index,subIndex)">{{subItem.title}}</el-menu-item>
                    </router-link>
                </el-submenu>
                <!-- <router-link v-else :to="base + item.path"> -->
                <div v-else>
                    <el-menu-item v-bind:index="menuIndex(index)" class="member_word">{{item.name}}</el-menu-item>
                </div>
                <!-- </router-link> -->
            </template>
        </el-menu>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'

let _self = this;
export default {
    name: 'member-nav-view',
    props: {
        base: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            wrapperHeight: '',
            deIndex: '0',
            urlArr: []
        }
    },
    computed: {
        getDefaultIndex() {
            let _self = this;

            function getIndex(arr) {
                for (var j in arr) {
                    if (_self.$route.path.indexOf(arr[j].path) > 0) {
                        _self.deIndex = arr[j].index;
                        break;
                    } else if (arr[j].children && arr[j].children.length > 0) {
                        getIndex(arr[j].children);
                    }
                }
            }

            getIndex(_self.getList);
            //console.log(_self.getList)
            return _self.deIndex;
        },
        getList() {

            return [{
                "name": "会员中心",
                "path": "/",
                "index": "0"
            }, {
                "name": "我的订单",
                "index": "1",
                "url": "/static/icon/Order.png",
                "children": [{
                    "path": "/saleOrder",
                    "title": "销售订单",
                    "index": "1-0"
                }, {
                    "path": "/purchaseOrder",
                    "title": "采购订单",
                    "index": "1-1"
                }, {
                    "path": "/preSaleOrder",
                    "title": "预售订单",
                    "index": "1-2"
                }]
            }, {
                "name": "我的发布",
                "index": "2",
                "url": "/static/icon/release.png",
                "children": [{
                    "path": "/myResource",
                    "title": "我的资源",
                    "index": "2-0"
                }, {
                    "path": "/myNeed",
                    "title": "我的求购",
                    "index": "2-1"
                }, {
                    "path": "/mySuggest",
                    "title": "我的留言",
                    "index": "2-2"
                }]
            }, {
                "name": "我的报价",
                "index": "3",
                "url": "/static/icon/quoted-price.png",
                "children": [{
                    "path": "/myReportPrice",
                    "title": "我的报价",
                    "index": "3-0"
                }]
            }, {
                "name": "信息管理及认证",
                "index": "4",
                "url": "/static/icon/Information-management.png",
                "children": [{
                    "path": "/personalInformation",
                    "title": "个人信息",
                    "index": "4-0"
                }, {
                    "path": "/addressManagement",
                    "title": "地址管理",
                    "index": "4-1"
                }, {
                    "path": "/personalCertification",
                    "title": "个人认证",
                    "index": "4-2"
                }, {
                    "path": "/companyCertification",
                    "title": "企业认证",
                    "index": "4-3"
                }]
            }]
        }
    },
    methods: {
        menuIndex: function(index) {
            return index.toString();
        },
        subMenuIndex: function(index, subIndex) {
            return index + '-' + subIndex;
        },
        go(path) {
            console.log(path);
            if (path !== '/') {
                this.$router.push(this.base + path);
            }

        }

    }
}
</script>
