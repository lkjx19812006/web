<style lang="less" scoped>
.helpSeek {
    width: 1200px;
    margin: auto;
    margin-bottom: 100px;
    .orange {
        color: #FA8435;       
        margin: 35px 0;
    }
    .step {
        .title {
            font-size: 20px;
            color: #555555;
            padding: 35px 0;
        }
    }
}
</style>
<template>
    <div class="helpSeek">
        <titleView :title="title"></titleView>      
        <div class="step">
           <div class="title">
               方法一、打开药材买卖网网页，找到右手边的<span style="color: #E83F3F">找货助手</span>，填写需求委托药材买卖网帮您找货
           </div> 
           <div class="img_wrap">
               <img src="../../../static/icon/howFindGoods1.png" height="492" width="1200">
           </div>
        </div> 
         <div class="step">
           <div class="title">
               方法二、打开药材买卖网网页，找到LOGO右边的<span style="color: #E83F3F">搜索栏</span>或者热门服务里的<span style="color: #E83F3F">卖药材</span>搜索，输入您所需要的产品。点击搜索自主找货
           </div> 
           <div class="img_wrap">
               <img src="../../../static/icon/howFindGoods2.png" height="695" width="1200">
           </div>
        </div> 
    </div>
</template>
<script>
import titleView from '../../../components/about/title.vue'
export default {
    data() {
            return {
                title: {
                    enTitle: 'HOW TO FIND GOODS',
                    zhTitle: '如何找货'
                }
            }
        },
        components: {
            titleView
        }
}
</script>
