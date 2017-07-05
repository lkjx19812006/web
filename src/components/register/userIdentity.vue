<style lang="less" scoped>
.identity {
    width: 1200px;
    margin: auto;
    .title {
        display: flex;
        flex-direction: column;
        justify-conten: flex-start;
        align-items: center;
        .big_tit {
            font-size: 18px;
            color: #3A3A3A;
            margin-bottom: 20px;
        }
        .small_tit {
            font-size: 14px;
            color: #999999;
        }
    }
    .select_identity {
        margin-top: 20px;
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        .detail_wrap {
            flex: 0 0 auto;
            height: 257px;
            width: 177px;
            border: 1px solid #ebebeb;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            .icon {
                margin-bottom: 20px;
            }
            .title {
                font-size: 16px;
                color: #333333;
            }
            .select_icon {
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
        .detail_wrap_selected {
            border: 1px solid #FF8A00;
        }
    }
    .next_btn {
        margin: 45px 0;
        text-align: center;
        span {
            display: inline-block;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            height: 40px;
            width: 360px;
            line-height: 40px;
            text-align: center;
            border-radius: 4px;
            background-color: #FF8A00;
        }
    }
}
</style>
<template>
    <div class="identity">
        <div class="title">
            <span class="big_tit">
                请完善您的身份信息
            </span>
            <span class="small_tit">
                我们将更好的为您提供有价值的服务
            </span>
        </div>
        <div class="select_identity">
            <div @click="select(index + 1)" class="detail_wrap" :class="{'detail_wrap_selected': index + 1 === selected }" v-for="(item, index) in indentitys">
                <img class="icon" :src="item.icon">
                <span class="title">{{item.title}}</span>
                <img v-show="index + 1 === selected" class="select_icon" src="../../../static/icon/selectedUseruserIdentity.png">
            </div>
        </div>
        <div class="next_btn">
            <span @click.self.stop="nextStep">
                选好了，下一步
            </span>
        </div>
    </div>
</template>
<script>
let indentity = [{
    title: '我是买方',
    icon: require('../../../static/icon/userIdentity1.png')
}, {
    title: '我是卖方',
    icon: require('../../../static/icon/userIdentity2.png')
}, {
    title: '我是买卖方',
    icon: require('../../../static/icon/userIdentity3.png')
}]
import common from '../../common/httpService.js'
export default {
    data() {
            return {
                indentitys: indentity,
                selected: 0
            }
        },
        computed: {
            userType() {
                return this.$store.state.user.user.userType;
            }
        },
        created(){
            this.selected = this.userType;
        },
        methods: {
            nextStep() {
                if (this.selected === 0) {
                    this.$message({
                        message: '请选择您的身份！！！',
                        type: 'warning'
                    });
                    return;
                }
                //进入步骤3
                this.$emit('step', 3, this.selected);
            },
            select(index) {
                this.selected = index;
            },
        }
}
</script>
