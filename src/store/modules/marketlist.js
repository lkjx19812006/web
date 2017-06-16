import httpService from '../../common/httpService'


const state = {
    name: '',
    marketList: [],
    marketTotalNum: ''
}

// getters
const getters = {
    marketList: state => state.marketList,
    marketTotalNum: state => state.marketTotalNum
}

// actions
const actions = {
    getMarketList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getMarketList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    setMarketName({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('setMarketName', param);
            resolve();
        })
    },
    clearsMarketName({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('clearsMarketName');
            resolve();
        })
    },
}

// mutations
const mutations = {
    getMarketList(state, res) {
        for (var i = 0; i < res.biz_result.list.length; i++) {

            if (res.biz_result.list[i].ctime) res.biz_result.list[i].ctime = res.biz_result.list[i].ctime.split(' ')[0];
        }
        state.marketList = res.biz_result.list;
        state.marketTotalNum = res.biz_result.total;
    },
    setMarketName(state, res) {
        state.name = res;
    },
    clearsMarketName(state, res) {
        state.name = '';
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
