<style lang="less" scoped>
.helpRegister {
    width: 1200px;
    margin: auto;
    margin-bottom: 100px; 
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
    <div class="helpRegister">
        <titleView :title="title"></titleView>      
        <div class="step">
           <div class="title">
               步骤一、打开药材买卖网网页，点击左上方【免费注册】
           </div> 
           <div class="img_wrap">
               <img src="../../../static/icon/register1.png" height="700" width="1200">
           </div>
        </div> 
         <div class="step">
           <div class="title">
               步骤二、填入正确的信息，提交完成账号注册
           </div> 
           <div class="img_wrap">
               <img src="../../../static/icon/register2.png" height="700" width="1200">
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
                    enTitle: 'REGISTRATION PROCESS',
                    zhTitle: '注册流程'
                }
            }
        },
        components: {
            titleView
        }

}
</script>
