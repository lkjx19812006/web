import httpService from '../../common/httpService'

const state = {
    messageTotal: '',
    messageType: [],
    messageIntention: { list: [], total: 0 },
    messageOfferList: { list: [], total: 0 },
    messageOlderList: { list: [], total: 0 },
    messageActivityList: { list: [], total: 0 },
    needIntentionInfo: {},
    resourceIntentionInfo: {}
};

const getters = {
    messageTotal: state => state.messageTotal,
    messageType: state => state.messageType,
    messageIntention: state => state.messageIntention,
    messageOfferList: state => state.messageOfferList,
    messageOlderList: state => state.messageOlderList,
    messageActivityList: state => state.messageActivityList,
    needIntentionInfo: state => state.needIntentionInfo,
    resourceIntentionInfo: state => state.resourceIntentionInfo,
};

const actions = {
    //求购意向详情
    getNeedIntentionInfo({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setNeedIntentionInfo', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //资源意向详情
    getResourceIntentionInfo({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setResourceIntentionInfo', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //清除意向详情
    clearIntentionInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('clearIntentionInfo');
            resolve();
        })
    },
    getMessageTotal({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setMessageTotal', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    clearMessageTotal({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('clearMessageTotal');
            resolve();
        })
    },
    getMessageType({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setMessageType', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //意向列表
    getIntentionList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setIntentionList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //报价列表
    getOfferList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setOfferList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //订单列表
    getOlderList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setOlderList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //活动列表
    getActivityList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('setActivityList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    updateMessage({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    deleteMessage({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    }

};

const mutations = {
    setNeedIntentionInfo(state, res) {
        state.needIntentionInfo = res.biz_result;
    },
    setResourceIntentionInfo(state, res) {
        state.resourceIntentionInfo = res.biz_result;
    },
    clearIntentionInfo(state, res) {
        state.needIntentionInfo = {};
    },
    setMessageTotal(state, res) {
        state.messageTotal = res.biz_result.total;
    },
    clearMessageTotal(state, res) {
        state.messageTotal = '';
    },
    setMessageType(state, res) {
        state.messageType = res.biz_result.list;
    },
    setIntentionList(state, res) {
        res.biz_result.list.forEach(function(item) {
            item.checked = false;
        });
        state.messageIntention.list = res.biz_result.list;

        state.messageIntention.total = res.biz_result.allTotal;
    },
    setOfferList(state, res) {
        res.biz_result.list.forEach(function(item) {
            item.checked = false;
        });
        state.messageOfferList.list = res.biz_result.list;

        state.messageOfferList.total = res.biz_result.allTotal;
    },
    setOlderList(state, res) {
        res.biz_result.list.forEach(function(item) {
            item.checked = false;
        });
        state.messageOlderList.list = res.biz_result.list;

        state.messageOlderList.total = res.biz_result.allTotal;
    },
    setActivityList(state, res) {
        res.biz_result.list.forEach(function(item) {
            item.checked = false;
        });
        state.messageActivityList.list = res.biz_result.list;

        state.messageActivityList.total = res.biz_result.allTotal;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
