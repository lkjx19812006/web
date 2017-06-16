<style scoped>
ul li {
    list-style: none;
}

.logistics_box {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 30px;
}

.logistics_box ul {
    width: 100%;
    padding: 0;
    margin: 0;
    float: left;
    padding-bottom: 10px;
}

.logistics_box ul li {
    width: 100%;
    position: relative;
    float: left;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
}

.logistics_box ul li .box {
    flex: 1;
}

.logistics_box ul li img {
    float: left;
    margin: 0;
}

.logistics_box ul li .box {
    display: flex;
    flex-direction: column;
    padding: 0 0 2px 0;
}

.logistics_box ul li .context {
    margin: 3px 0 0 10px;
}

.logistics_box ul li .emtry {
    flex: 1;
}


/* .now {
    background: url('../../assets/images/ct.png') no-repeat 14px 120%;
    background-position: 0% 0%;
} */

.logistics_box ul li .time {
    margin-left: 10px;
}
</style>
<template>
    <div class="logistics_box">
        <div v-if="param.arr.length == 0">抱歉~暂无物流信息</div>
        <ul>
            <li v-for="(item,index) in param.arr" v-if="index == 0" class="now" :key="item.index">
                <img src="../../assets/images/ct.png">
                <div class="box">
                    <div class="context">{{item.context}}</div>
                    <div class="emtry"></div>
                    <div class="time">{{item.time}}</div>
                </div>
            </li>
            <li v-for="(item,index) in param.arr" v-if="index > 0" :key="item.index">
                <img src="../../assets/images/unct.png">
                <div class="box">
                    <div class="context">{{item.context}}</div>
                    <div class="emtry"></div>
                    <div class="time">{{item.time}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {

    data() {
            return {

            }
        },
        props: {
            param: {

            }
        },
        methods: {
            cancel() {
                this.param.show = false;
            }
        }
}
</script>
