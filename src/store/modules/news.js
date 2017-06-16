import httpService from '../../common/httpService'


const state = {
    newsList: [],
    total: '',
    newIndex:'1'
}

// getters
const getters = {
    newsList: state => state.newsList,
    total: state => state.total,
    newIndex:state => state.newIndex
}

// actions
const actions = {
    //获取新闻列表
    getNewsList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getNews', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //获取index
    getNewsIndex({ commit, state }, param){
        commit('getNewsIndex',param);
    }
}

// mutations
const mutations = {
    //获得新闻列表
    getNews(state, res) {
        state.newsList = res.biz_result.list;
        state.total = res.biz_result.total;
    },
    getNewsIndex(state,param){
        state.newIndex = param;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
