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
                    color: #fff;
                    background-color: #FA8435;
                    cursor: pointer;
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
                        <p>{{people}}</p>
                        <img src="../../assets/images/sort_gray.png" v-show="people==='报价人数'">
                        <img src="../../assets/images/sort_up.png" v-show="people==='由少到多'">
                        <img src="../../assets/images/sort_down.png" v-show="people==='由多到少'">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">默认</el-dropdown-item>
                        <el-dropdown-item command="1">由少到多</el-dropdown-item>
                        <el-dropdown-item command="2">由多到少</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="timeCommand" class="left_select_detail">
                    <div class="command_wrap">
                        <p>{{time}}</p>
                        <img src="../../assets/images/sort_gray.png" v-show="time==='剩余时间'">
                        <img src="../../assets/images/sort_up.png" v-show="time==='由长到短'">
                        <img src="../../assets/images/sort_down.png" v-show="time==='由短到长'">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">默认</el-dropdown-item>
                        <el-dropdown-item command="2">由长到短</el-dropdown-item>
                        <el-dropdown-item command="1">由短到长</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="indentTypeCommand" class="left_select_detail">
                    <div class="command_wrap">
                        <p>{{indentType}}</p>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="-1">默认</el-dropdown-item>
                        <el-dropdown-item command="0">药厂求购</el-dropdown-item>
                        <el-dropdown-item command="1">普通求购</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="right_page">
                <p>共{{total}}条求购</p>
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
                time: '剩余时间',
                people: '报价人数',
                indentType: '求购类型'
            }
        },
        props: {
            httpParam: {}
        },
        computed: {
            total() {
                return this.$store.state.resource.needAllList.total
            },
            pageTotal() {
                let pageSize = 1;
                if (this.$store.state.resource.needAllList.total) {
                    if (this.$store.state.resource.needAllList.total % 10 > 0) {
                        pageSize = 1 + parseInt(this.$store.state.resource.needAllList.total / 10);
                    } else {
                        pageSize = parseInt(this.$store.state.resource.needAllList.total / 10);
                    }
                }
                return pageSize;
            },
            showGeneral() {
                if (this.httpParam["sort"].offer === "0" && this.httpParam["sort"].shelve_time === "0" && this.httpParam["sort"].duedate === "0" && this.httpParam.indentType === '-1') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            sortDefault() {
                this.httpParam["sort"].offer = '0';
                this.people = '报价人数';
                this.httpParam["sort"].shelve_time = '0';
                this.ground = '上架时间';
                this.httpParam["sort"].duedate = '0';
                this.time = '剩余时间';
                this.indentType = '求购类型';
                this.httpParam.indentType = '-1';
                this.search();
            },
            peopleCommand(e) {
                let obj = {
                    0: '报价人数',
                    1: '由少到多',
                    2: '由多到少'
                }
                this.people = obj[e];
                this.httpParam["sort"].offer = e;
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
                    0: '剩余时间',
                    1: '由短到长',
                    2: '由长到短'
                }
                this.time = obj[e];
                this.httpParam["sort"].duedate = e;
                this.search();
            },
            indentTypeCommand(e) {
                let obj = {
                    '-1': '求购类型',
                    0: '药厂求购',
                    1: '普通求购'
                }
                this.indentType = obj[e];
                this.httpParam.indentType = e;
                this.search();
            },
            search() {
                let obj = {
                    type: 'need',
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
