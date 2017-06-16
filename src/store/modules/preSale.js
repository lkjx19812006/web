import httpService from '../../common/httpService'


const state = {
    userPreIntentList: [], //预售意向列表
    userPreIntentTotal: '', //预售意向列表总数
    userPreIntentWords: [], //预售意向留言
    userPreIntentWordsTotal: '', //预售留言总条数
    presellList: { list: [] }
}

// getters
const getters = {
    userPreIntentList: state => state.userPreIntentList, //预售意向列表
    userPreIntentTotal: state => state.userPreIntentTotal, //预售意向列表总数
    userPreIntentWords: state => state.userPreIntentWords, //预售意向留言
    userPreIntentWordsTotal: state => state.userPreIntentWordsTotal,
    presellList: state => state.presellList
}

// actions
const actions = {
    //预售意向列表
    getUserIntentList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    //console.log(res)
                    commit('getUserIntentListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },

    //预售意向留言
    getUserPreIntentWords({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getUserPreIntentWordsMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },

    getPresellList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getPresellListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    }

}

// mutations
const mutations = {
    //预售意向列表
    getUserIntentListMutations(state, res) {
        state.userPreIntentList = res.biz_result.list;
        state.userPreIntentTotal = res.biz_result.total;
    },
    //预售意向留言
    getUserPreIntentWordsMutations(state, res) {
        state.userPreIntentWords = res.biz_result.list;
        state.userPreIntentWordsTotal = res.biz_result.total;
    },

    getPresellListMutations(state, res) {
        state.presellList = res.biz_result;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
