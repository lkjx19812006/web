<style lang="less" scoped>
.title {
    padding-top: 25px;
    margin-bottom: 10px;
    .en_tit {
        font-size: 23px;
        color: #e6e6e6;
        line-height: 40px;
    }
    .zh_tit {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 26px;
        color: #fa8435;
        font-weight: 700;
        padding-top: 10px;
        span {
            flex: 0 0 auto;
            margin-right: 20px;
        }             
        div {
            overflow: hidden;
            flex: 1;          
        }   
    }
}
</style>
<template>
    <div class="title">
        <div class="en_tit">
            <span>{{title.enTitle}}</span>
        </div>
        <div class="zh_tit">
            <span>{{title.zhTitle}}</span>
            <div>
                <img src="../../static/icon/about_xieline.png" height="10">
            </div>                        
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
    	title: {    		
    	}
    }
}
</script>
