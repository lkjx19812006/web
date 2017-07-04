import httpService from '../../common/httpService'

const state = {
    messageTotal: 0,
    messageType: [],
    messageIntention: { list: [], total: 0 },
    messageOfferList: { list: [], total: 0 },
    messageOlderList: { list: [], total: 0 },
    messageActivityList: { list: [], total: 0 }
};

const getters = {
    messageTotal: state => state.messageTotal,
    messageType: state => state.messageType,
    messageIntention: state => state.messageIntention,
    messageOfferList: state => state.messageOfferList,
    messageOlderList: state => state.messageOlderList,
    messageActivityList: state => state.messageActivityList,
};

const actions = {
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
    setMessageTotal(state, res) {
        state.messageTotal = res.biz_result.total;
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
