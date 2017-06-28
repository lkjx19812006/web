<style lang="less" scoped>
.need_condition {
    display: flex;
    background-color: #fff;
    padding: 20px 0;
    .need_condition_border {
        border: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .left_select {
            display: flex;
            flex-direction: row;
            align-items: center;
            .left_select_detail {
                width: 125px;
                display: flex;
                flex-direction: row;
                align-items: center;
                cursor: pointer;
                font-size: 16px;
                color: #666;
                border-right: 1px solid #eee;
                .command_wrap {
                    flex: 1;
                    padding: 0 20px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    img {
                        flex: 0 1 auto;
                        margin-left: 10px;
                    }
                }
            }
        }
        .right_page {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 16px;
            color: #666;
            p {
                padding: 0 20px;
            }
            .pre_end {
                margin-right: 10px;
                width: 60px;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: 1px solid #FA8435;
                justify-content: center;
                div {
                    text-align: center;
                    width: 50%;
                    padding: 5px 0;
                    cursor: not-allowed;
                }
                .active {
                    cursor: pointer;
                    color: #fff;
                    background-color: #FA8435;
                }
            }
        }
    }
}
</style>
<template>
    <div class="need_condition">
        <div class="need_condition_border">
            <div class="left_select">
                <div class="left_select_detail" @click="sortDefault()">
                    <div class="command_wrap">
                        <p>综合排序</p>
                        <img src="../../assets/images/sort_gray.png" v-show="!showGeneral">
                        <img src="../../assets/images/sort_down.png" v-show="showGeneral">
                    </div>
                </div>
                <el-dropdown @command="groundCommand" class="left_select_detail">
                    <div class="command_wrap">
                        <p>{{ground}}</p>
                        <img src="../../assets/images/sort_gray.png" v-show="ground==='上架时间'">
                        <img src="../../assets/images/sort_up.png" v-show="ground==='由旧到新'">
                        <img src="../../assets/images/sort_down.png" v-show="ground==='由新到旧'">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">默认</el-dropdown-item>
                        <el-dropdown-item command="2">由新到旧</el-dropdown-item>
                        <el-dropdown-item command="1">由旧到新</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="peopleCommand" class="left_select_detail">
                    <div class="command_wrap">
                        <p>{{price}}</p>
                        <img src="../../assets/images/sort_gray.png" v-show="price==='价格排序'">
                        <img src="../../assets/images/sort_up.png" v-show="price==='由低到高'">
                        <img src="../../assets/images/sort_down.png" v-show="price==='由高到低'">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">默认</el-dropdown-item>
                        <el-dropdown-item command="1">由低到高</el-dropdown-item>
                        <el-dropdown-item command="2">由高到低</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="right_page">
                <p>共{{total}}条资源</p>
                <p><span class="orange_span">{{httpParam.pn}}</span>/{{pageTotal}}</p>
                <div class="pre_end">
                    <div :class="{ active: httpParam.pn!=1 }" @click="minus()">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div :class="{ active: httpParam.pn!=pageTotal }" @click="add()">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                ground: '上架时间',
                price: '价格排序',
                sample: '是否供样'
            }
        },
        props: {
            httpParam: {}
        },
        computed: {
            total() {
                return this.$store.state.resource.resourceAllList.total
            },
            pageTotal() {
                let pageSize = 1;
                if (this.$store.state.resource.resourceAllList.total) {
                    if (this.$store.state.resource.resourceAllList.total % 10 > 0) {
                        pageSize = 1 + parseInt(this.$store.state.resource.resourceAllList.total / 10);
                    } else {
                        pageSize = parseInt(this.$store.state.resource.resourceAllList.total / 10);
                    }
                }
                return pageSize;
            },
            showGeneral() {
                if (this.httpParam["sort"].price === "0" && this.httpParam["sort"].shelve_time === "0" && this.httpParam.sampling === "-1") {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            sortDefault() {
                this.httpParam["sort"].price = '0';
                this.price = '价格排序';
                this.httpParam["sort"].shelve_time = '0';
                this.ground = '上架时间';
                this.httpParam.sampling = '-1';
                this.sample = '是否供样';
                this.search();
            },
            peopleCommand(e) {
                let obj = {
                    0: '价格排序',
                    1: '由低到高',
                    2: '由高到低'
                }
                this.price = obj[e];
                this.httpParam["sort"].price = e;
                this.search();
            },
            groundCommand(e) {
                let obj = {
                    0: '上架时间',
                    1: '由旧到新',
                    2: '由新到旧'
                }
                this.ground = obj[e];
                this.httpParam["sort"].shelve_time = e;
                this.search();
            },
            timeCommand(e) {
                let obj = {
                    '-1': '是否供样',
                    '0': '不供样',
                    '1': '可供样'
                }
                this.sample = obj[e];
                this.httpParam.sampling = e;
                this.search();
            },
            search() {
                let obj = {
                    type: 'resource',
                    pn: 1
                };
                this.$emit('getData', obj);
            },
            minus() {
                if (this.httpParam.pn === 1) {
                    return
                } else {
                    this.httpParam.pn--;
                }
            },
            add() {
                if (this.httpParam.pn === this.pageTotal) {
                    return
                } else {
                    this.httpParam.pn++;
                }
            }
        }
}
</script>
