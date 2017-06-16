<style lang="less" scoped>
@width: 1200px;
.head_content {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #FA8435;
    align-items: center;
    min-height: 100px;
    padding:30px;
    .head_logo {
        position:relative;
        width: @width;
        height: 106px;
        align-items: center;
        display: flex;
        .flext_item {
            flex: 0 1 auto;
        }
        .left_image {
            max-height: 80px;
        }
        .center_image {
            margin: 0 40px;
        }
        .right_font {
            color: #FA8435;
            font-size: 28px;
        }
        .flex_end {
            flex: 1 1 auto;
            justify-content: flex-end;
            display: flex;
            flex-direction: row;
            .el-select {
                width: 100px;
            }
            .el-input {
                width: 350px;
            }
            .el-input__inner {
                border: 1px solid red;
            }
        }
        .right{
            position:absolute;
            right:0;
        }
    }
}
</style>
<template>
    <div class="head_content">
        <div class="head_logo">
            <img src="../static/icon/entrance-logo.png" class="flext_item left_image">
            <img src="../static/icon/left-logo.png" class='right'>
        </div>
    </div>
</template>
<script>
import httpService from '../common/httpService.js'
import tabView from '../components/tab.vue'
export default {
    name: 'head-view',
    data() {
        return {           
            isShowUserInfo: false,
            search: {
                type: '0',
                value: ''
            },
            needParam: {
                sort: {
                    "offer": "0",
                    "duedate": "0",
                    "shelve_time": "0"
                },
                location: [],
                keyWord: '',
                pn: 1,
                pSize: 10,
                spec: ''
            },
            resourceParam: {
                sort: {
                    "shelve_time": "0",
                    "price": "0"
                },
                location: [],
                sampling: '-1',
                pn: 1,
                pSize: 10,
                spec: '',
                keyWord: ''
            }
        }
    },
    props: {
        title: '',
        tab: ''
    },
    computed: {
        user() {
            return this.$store.state.user.user
        },
        flag(){
            return this.$store.state.user.userFlag
        }
    },
    mounted() {
        let _self = this;
        this.search.value = this.$store.state.search.searchValue.resourceValue;
        if (window.localStorage.KEY) {
            httpService.KEY = window.localStorage.KEY;
            httpService.SID = window.localStorage.SID;
            httpService.getDate(
                function() {
                    let url = httpService.urlCommon + httpService.apiUrl.most
                    let body = {
                        biz_module: 'userService',
                        biz_method: 'queryUserInfo'
                    }
                    url = httpService.addSID(url);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
                    body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    _self.$store.dispatch('getUserInformation', {
                        body: body,
                        path: url
                    }).then(() => {
                        _self.getAddress();
                    }, () => {

                    });
                }
            );
        };  
        let path =  this.$route.matched[0].path;
        if (this.user.phone && !this.user.fullname && path != '/member' && !this.flag) {
            this.$confirm('您还未完善个人信息,是否现在去完善？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.$router.push('/member/personalInformation')
            }).catch(() => {
                this.$store.dispatch('changeFlag', true);
            });
        };      
    },
    components: {
        tabView
    },
    methods: {
        selectType() {
            if (this.search.type === '0') {
                this.search.value = this.$store.state.search.searchValue.resourceValue;
            } else {
                this.search.value = this.$store.state.search.searchValue.needValue;
            }
        },
        searchResource() {
            let _self = this;
            if (this.search.type === '1') {
                this.$store.dispatch('setSearchValue', {
                    type: 1,
                    value: _self.search.value
                }).then(() => {
                    _self.needParam.keyWord = _self.search.value;
                    _self.$store.dispatch('getNeedAllList', {
                        body: {
                            biz_module: 'intentionService',
                            biz_method: 'queryBegBuyList',
                            biz_param: _self.needParam
                        },
                        path: httpService.urlCommon + httpService.apiUrl.most
                    })
                }, () => {});
                _self.$router.push('/need');
            } else if (this.search.type === '0') {
                this.$store.dispatch('setSearchValue', {
                    type: 0,
                    value: _self.search.value
                }).then(() => {
                    _self.resourceParam.keyWord = _self.search.value;
                    _self.$store.dispatch('getResourceAllList', {
                        body: {
                            biz_module: 'intentionService',
                            biz_method: 'querySupplyList',
                            biz_param: _self.resourceParam
                        },
                        path: httpService.urlCommon + httpService.apiUrl.most
                    })
                }, () => {})
                _self.$router.push('/resource');
            }
        },
        getAddress() {
            let url = httpService.urlCommon + httpService.apiUrl.most
            let body = {
                biz_module: 'userAddressService',
                biz_method: 'queryUserAddressList'
            }
            url = httpService.addSID(url);
            body.version = 1;
            body.time = Date.parse(new Date()) + parseInt(httpService.difTime);
            body.sign = httpService.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getUserAddressList', {
                body: body,
                path: url
            }).then(() => {

            }, () => {

            });
        },
        jumpCenter(path) {
            let _self = this;
            if (httpService.KEY) {
                _self.$router.push(path);
            } else {
                _self.$message({
                    showClose: true,
                    message: '请先登录',
                    type: 'warning'
                });
                _self.$router.push('/login')
            }

        },
        jump(path) {
            let _self = this;
            console.log(path)
            _self.$router.push(path);
        },
        getCookie(name) {
            let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        clearCookie(name) {
            // this.setCookie(name, "", -1);
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
            }
        },
        setCookie(name, value, days) {
            var exp = new Date();
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        quit() {
            let _self = this;
            this.$confirm('是否要退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                httpService.KEY = '';
                httpService.SID = '';
                httpService.customerId = '';
                window.localStorage.KEY = '';
                window.localStorage.SID = '';
                _self.clearCookie('KEY');
                _self.clearCookie('SID');
                _self.$store.dispatch('quitWeb')
                    .then(() => {
                        _self.$router.push('/');
                    }, () => {

                    });

            }).catch(() => {

            });


        }
    }
}
</script>
