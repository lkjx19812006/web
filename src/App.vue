<style scoped lang="less">
</style>
<template>
    <div>     
        <transition :name="transitionName" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            transitionName: ''
        }
    },
}
</script>
