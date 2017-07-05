<style lang="less" scoped>
.userInfo {
    width: 1200px;
    margin: auto;
    .title {
        display: flex;
        flex-direction: column;
        justify-conten: flex-start;
        align-items: center;
        .big_tit {
            height: 24px;
            line-height: 24px;
            font-size: 18px;
            color: #3A3A3A;
            margin-bottom: 20px;
        }
        .small_tit {
            font-size: 14px;
            color: #999999;
        }
    }
    .select_userInfo {
        width: 720px;
        padding: 20px 0;
        margin: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            flex: 0 0 auto;
            width: 156px;
            font-size: 18px;
            height: 156px;
            background: url('../../../static/icon/selectBtn.png') no-repeat center;
            line-height: 156px;
            text-align: center;
            color: #333333;
            cursor: pointer;
        }
        .item_selected {
            color: #fff;
            background: url('../../../static/icon/selectedBtn.png') no-repeat center;
        }
    }
    .btn_wrap {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 45px 0;
        span {
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            height: 38px;
            line-height: 38px;
            padding: 0 50px;
            text-align: center;
            border-radius: 4px;
        }
        .back_btn {
            background-color: #fff;
            color: #FF8A00;
            border: 1px solid #FF8A00;
            margin-right: 32px;
        }
        .next_btn {
            background-color: #FF8A00;
            border: 1px solid #FF8A00;
        }
    }
}
</style>
<template>
    <div class="userInfo">
        <div class="title">
            <span class="big_tit">
                {{userTit(user.userType)}}
            </span>
            <span class="small_tit">
                根据您的信息，我们为您做了精准的分类，请完善您的具体身份信息
            </span>
        </div>
        <div class="select_userInfo">
            <span @click="selectUserInfo(item)" class="item" :class="{'item_selected': selectId ===  item.id}" v-for="(item, index) in userTypeMap">
               {{item.name}}
           </span>
        </div>
        <div class="btn_wrap">
            <span class="back_btn" @click.self.stop="backStep">
                返回选择身份
            </span>
            <span class="next_btn" @click.self.stop="nextStep">
                下一步
            </span>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    data() {
            return {
                select: {},
                selectId: ''
            }
        },
        computed: {
            user() {
                return this.$store.state.user.user;
            },
            userTypeMap() {
                return this.$store.state.user.userTypeMap;
            }
        },
        methods: {
            userTit(type) {
                let str = '';
                switch (type) {
                    case 1:
                        str = '我是买方';
                        break;
                    case 2:
                        str = '我是卖方';
                        break;
                    case 3:
                        str = '我是买卖方';
                        break;
                }
                return str;
            },
            backStep() {
                this.$emit('step', 2)
            },
            nextStep() {
                if (this.selectId === '') {
                    this.$message({
                        message: '请选择您的身份类型',
                        type: 'warning'
                    });
                    return;
                }
                this.$emit('step', 4, this.selectId)
            },
            selectUserInfo(item) {
                if (this.selectId === item.id) {
                    this.selectId = '';
                } else {
                    this.selectId = item.id
                }
            },
            getInfoList() {
                let _self = this;
                let url = common.urlCommon + common.apiUrl.most
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryCustomerTypeMap',
                    biz_param: {
                        userType: this.user.userType
                    }
                }
                url = common.addSID(url);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                this.$store.dispatch('getUserTypeMap', {
                    path: url,
                    body: body
                }).then(() => {
                    let result = _self.$store.state.user.userTypeMap;
                    let manageType = _self.$store.state.user.user.manageType;
                    _self.selectId = '';
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].id === manageType) {
                            _self.selectId = manageType;
                            break;
                        }
                    };
                }, () => {})
            }
        },
        created() {
            this.getInfoList()
        }

}
</script>
