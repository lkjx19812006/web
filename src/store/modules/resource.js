import httpService from '../../common/httpService'
// initial state
// shape: [{ id, quantity }]
const state = {
    needList: { list: [] },
    resourceList: { list: [] },
    userNeedList: { list: [] },
    userResourceList: { list: [] },
    needAllList: { list: [] },
    resourceAllList: { list: [] }
}

// getters
const getters = {
    needList: state => state.needList,
    resourceList: state => state.resourceList,
    userNeedList: state => state.userNeedList,
    userResourceList: state => state.userResourceList,
    needAllList: state => state.needAllList,
    resourceAllList: state => state.resourceAllList
}

// actions
const actions = {
    getResourceList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getResourceListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getUserResourceList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getUserResourceListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getNeedList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getNeedListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getUserNeedList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getUserNeedListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getNeedAllList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getNeedAllListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getResourceAllList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getResourceAllListMutations', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    allot({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
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
    getNeedListMutations(state, res) {     
        state.needList = res.biz_result;
    },
    getResourceListMutations(state, res) {
        state.resourceList = res.biz_result;
    },
    getUserNeedListMutations(state, res) {
        state.userNeedList = res.biz_result;
    },
    getUserResourceListMutations(state, res) {
        state.userResourceList = res.biz_result;
    },
    getNeedAllListMutations(state, res) {
        if(!res.biz_result.total){
            res.biz_result.total = 1;
        }
        state.needAllList = res.biz_result;
    },
    getResourceAllListMutations(state, res) {
        state.resourceAllList = res.biz_result;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
