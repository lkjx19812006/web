import httpService from '../../common/httpService'


const state = {
    addressList: [],
    addressTotal: ''

}

// getters
const getters = {
    addressList: state => state.addressList,
    addressTotal: state => state.totalNum,
    show: state => state.show
}

// actions
const actions = {
    //获取地址列表
    getAddressList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    console.log(res)
                    commit('getAddressList', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    }

}

// mutations
const mutations = {
    getAddressList(state, res) {
        console.log(res);
        let arr = res.biz_result.list;
        if (arr.length == 1) res.biz_result.list[0].type = 1;
        state.addressList = res.biz_result.list;
        state.addressTotal = res.biz_result.total;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
