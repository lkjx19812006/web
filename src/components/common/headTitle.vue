<style scoped>
.title_head {
    position: relative;
}

.title_head .title {
    font-size: 20px;
    color: #333333;
    height: 45px;
    border-bottom: 1px solid #999;
    margin-bottom: 15px;
    position: relative;
}

.title_head .title p {
    width: 90px;
    height: 100%;
    border-bottom: 1px solid #FA8435;
}

.title_head .title .orange {
    color: #FC8535;
}

.title_head .title .box {
    margin-top: 10px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
}

.title_head .title img {
    width: 20px;
    height: 17px;
    margin-right: 8px;
}
</style>
<template>
    <div class="title_head">
        <div class="title">
            <p>{{param.name}}</p>
            <div class='box' v-if='param.title' @click='back'>
                <img src="../../static/icon/back-list.png">
                <div class="orange">{{param.title}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
export default {
    data() {
            return {

            }
        },
        props: {
            param: {
                name: '',
                title: ''
            },

        },
        computed: {

        },
        components: {

        },
        methods: {
            back() {
                let _self = this;
                this.$emit('empty')
                _self.param.title = '';
            } 
        }
}
</script>
