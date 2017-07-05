import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import resource from './modules/resource'
import orderlist from './modules/orderlist'
import search from './modules/search'
import release from './modules/release'
import reportPrice from './modules/reportPrice'
import address from './modules/address'
import authentication from './modules/authentication'
import news from './modules/news'
import marketlist from './modules/marketlist'
import preSale from './modules/preSale'
import publish from './modules/publish.js'
import message from './modules/message.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        resource,
        orderlist,
        search,
        release,
        reportPrice,
        address,
        authentication,
        news,
        marketlist,
        preSale,
        publish,
        message
    }
})
