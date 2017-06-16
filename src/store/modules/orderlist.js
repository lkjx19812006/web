import httpService from '../../common/httpService'


const state = {
    userOrderList: [],
    userTotalNum: '',
    preOrderList: [],
    preTotalNum: '',
    preOrderDetail: '',
    preOrderDetailOther: '',
    companys: []
}

// getters
const getters = {
    userOrderList: state => state.userOrderList,
    userTotalNum: state => state.userTotalNum,
    preOrderList: state => state.preOrderList,
    preTotalNum: state => state.preTotalNum,
    preOrderDetail: state => state.preOrderDetail,
    preOrderDetailOther: state => state.preOrderDetailOther,
    companys: state => state.companys

}

// actions
const actions = {
    getUserOrderList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    //console.log(res)
                    commit('getUserOrderList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getPreOrderList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    //console.log(res)
                    commit('getPreOrderList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getPreOrderDetail({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    //console.log(res)
                    commit('getPreOrderDetail', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    },
    getCompanys({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    
                    commit('getCompanys', res);
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
    getUserOrderList(state, res) {
        for (var i = 0; i < res.biz_result.list.length; i++) {
            if (res.biz_result.list[i].ctime) res.biz_result.list[i].ctime = res.biz_result.list[i].ctime.split(' ')[0];
        }
        state.userOrderList = res.biz_result.list;
        state.userTotalNum = res.biz_result.total;
    },
    getPreOrderList(state, res) {
        for (var i = 0; i < res.biz_result.list.length; i++) {
            if (res.biz_result.list[i].ctime) res.biz_result.list[i].ctime = res.biz_result.list[i].ctime.split(' ')[0];
            if (res.biz_result.list[i].arriveTime) res.biz_result.list[i].arriveTime = res.biz_result.list[i].arriveTime.split(' ')[0];
        }
        state.preOrderList = res.biz_result.list;
        state.preTotalNum = res.biz_result.total;
    },
    getPreOrderDetail(state, res) {
        //console.log(res.biz_result);
        state.preOrderDetail = res.biz_result.goodsArray[0];
        state.preOrderDetailOther = res.biz_result;
    },
    getCompanys(state, res) {
        let arr  = res.biz_result.list;
        for (var i = 0; i < arr.length; i++) {
            arr[i].value = arr[i].id;
            arr[i].label = arr[i].name;
        }
        state.companys = arr;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
