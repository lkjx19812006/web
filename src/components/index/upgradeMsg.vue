<style lang="less" scoped>
.upgradeMsg {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: rgba(102, 102, 102, .5);
    z-index: 99999999;
    .msg_box {
        width: 906px;
        padding: 9px;
        height: 471px;
        box-sizing: border-box;
        margin: 248px auto;
        background: url('../../assets/images/biankuang.png') no-repeat center;
        .logo {
            float: left;
            width: 226px;
            padding-left: 80px;
            padding-top: 48px;
            img {
                vertical-align: center;
            }
        }
        .content {
            padding-left: 306px;
            height: 100%;
            .text_img {
                width: 100%;
                height: 107px;
                padding-top: 140px;
                text-align: center;
                img {
                    margin: auto;
                }
            }
            .btn_wrap {
                margin-top: 32px;
                padding-left: 55px;
                div {
                    height: 48px;
                    width: 175px;
                    line-height: 48px;
                    font-family: '微软雅黑';
                    font-size: 22px;
                    font-weight: 700;
                    color: #fff;
                    display: inline-block;
                    text-align: center;
                    cursor: pointer;
                }
                .like_info {
                    background-color: #f49c0a;
                    border: 1px solid #f4890a;
                    margin-right: 50px;
                }
                .close {
                    background-color: #d3d3d3;
                    border: 1px solid #c9c9c9;
                }
            }
        }
    }
}
</style>
<template>
    <div class="upgradeMsg">
        <div class="msg_box">
            <div class="logo">
                <img src="../../assets/images/jixiangwu.png">
            </div>
            <div class="content">
                <div class="text_img">
                    <img src="../../assets/images/text.png">
                </div>
                <div class="btn_wrap">
                    <div class="like_info" @click="linkTo">
                        了解详情
                    </div>
                    <div class="close" @click="close">
                        忽略
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'upgrade',
    data() {
        return {

        }
    },
    methods: {
    	linkTo(){
    		this.$router.push('/info');
    	},
    	close(){
    		this.$emit('show', false);
    	}
    }
}
</script>
