<style scoped>
.my_title .title {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 25px;
    border: 1px solid #FFC741;
    font-size: 16px;
}

.my_title .title p {
    margin: 0;
    padding: 0;
    line-height: 35px;
    color: #333;
}

.my_title .title .content {
    line-height: 24px;
    font-size: 14px;
}
</style>
<template>
    <div class="my_title">
        <div class="title">
            <p>{{param.title}}</p>
            <p class="content" v-for="item in param.arr" :key="item.name">{{item.name}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        props: {
            param: {}
        },
        components: {

        },
        methods: {

        }
}
</script>
