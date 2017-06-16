<style scoped>
.contact {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    float: left;
    height: 100%;
    width: 100%;
    position: relative;
}

.contact .top {
    width: 100%;
    float: left;
    box-sizing: border-box;
    margin-top: 80px;
}

.contact .top .box {
    float: left;
    width: 25%;
    box-sizing: border-box;
}

.contact .top .box .title {
    font-weight: 600;
    font-size: 18px;
    color: #000;
    margin-bottom: 15px;
}

.contact .top .box .content {
    font-size: 14px;
    color: #333;
}

.contact .map {
    margin-top: 45px;
    float: left;
    width: 100%;
}

.contact .map img {
    width: 100%;
}
</style>
<template>
    <div class="contact">
        <div class="top">
            <div class="box" v-for="item in arr">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.content}}</div>
            </div>
        </div>
        <div class="map">
            <img src="../../static/icon/compang-map.png">
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                arr: [{
                    title: '我们的地址',
                    content: '上海市虹口区宝隆一方大厦910室'
                }, {
                    title: '邮编',
                    content: '200437'
                }, {
                    title: '传真',
                    content: '021-33194522'
                }, {
                    title: '邮箱',
                    content: 'service@yaocaimaimai.com'
                }]
            }
        },

}
</script>
