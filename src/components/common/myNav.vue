<style scoped>
.mynav {
    box-sizing: border-box;
    width: 180px;
    height: 400px;
}

.mynav .top {
    height: 50px;
    line-height: 50px;
    background-color: #A89D96;
    color: #fff;
    font-size: 24px;
    text-align: center;
    margin-top: 46px;
}

.mynav .main {
    height: 350px;
    width: 100%;
    background-color: #FBFBF6;
    box-sizing: border-box;
}

.mynav .main .item {
    height: 40px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #666666;
    text-align: left;
    box-sizing: border-box;
    cursor: pointer;
    padding: 13px 0px 13px 15px;
}

.mynav .main .active {
    background: url('../../static/icon/arrows.png') no-repeat 90% 50%;
    background-color: white;
    border-left:2px solid #F98435;
}
.mynav .main .item{
    
}
</style>
<template>
    <div class="mynav">
        <div class="top">{{param.title}}</div>
        <div class="main">
            <div class="item" v-bind:class="{active:show == 1}" @click="selectIt(1)">{{param.first_item}}</div>
            <div class="item" v-bind:class="{active:show == 2}" @click="selectIt(2)">{{param.second_item}}</div>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'my-nav-view',
    data() {
        return {
            
        }
    },
    props: {
        param: {}
    },
    components: {

    },
    computed:{
        show(){
            return this.$store.state.news.newIndex;
        }
    },
    methods: {
        selectIt(index) {
            let _self = this;
            _self.show = index;
            this.$emit('selectIt', index);
        }
    },
    mounted() {

    }
}
</script>
