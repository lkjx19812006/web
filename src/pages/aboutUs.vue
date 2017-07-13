<style scoped>
  .content {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .content .tab {
    margin-left: 360px;
  }

  .content .main .side_top {
    padding: 0 360px;
    background-color: #FBFAF6;
  }

  .content .main {
    width: 100%;
    margin: auto;
    min-height: 850px;
  }

  .content .main .center {
    padding: 0 360px;
    width: 100%;
    box-sizing: border-box;
  }

  .content .main .center .home_content {
    width: 100%;
  }

  .content .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
<template>
  <div class="content">
    <MainHeader title='关于我们' tab='9'></MainHeader>
    <div class="main">
      <div class="side_top">
        <member-nav :base="'/aboutUs'"></member-nav>
      </div>
      <div class="center">
        <div class="home_content">
          <router-view></router-view>
        </div>
      </div>
      <!-- <div style="clear:both"></div> -->
    </div>
    <div class="footer">
      <MainFooter></MainFooter>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
    } from 'vuex'

  import MainHeader from '../components/header.vue';
  import MainFooter from '../components/foot.vue';
  import memberNav from '../components/common/about-nav.vue';
  import common from '../common/httpService.js';
  export default {
    name: 'aboutUs_view',
    data()
  {
    return {
      httpParam: {
        employee: '',
        name: '',
        region: '',
        status: '',
        pn: 1,
        pSize: 20
      },

    }
  }
  ,
  components: {
    MainHeader,
      memberNav,
      MainFooter
  }
  ,
  mounted()
  {
    common.KEY = window.localStorage.KEY;
    common.SID = window.localStorage.SID;
  }
  }
</script>
