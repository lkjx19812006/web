import httpService from '../../common/httpService'


const state = {
    types: '',
    userValidate: {},
    companyType: '',
    companyValidate: {},

}

// getters
const getters = {
    types: state => state.person
}

// actions
const actions = {
    //个人认证
    personAuthen({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('personAuthen', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //企业认证
    personAuthenCompany({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('personAuthenCompany', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
}

// mutations
const mutations = {
    //个人认证
    personAuthen(state, res) {
        state.types = res.biz_result.authenType;
        state.userValidate = res.biz_result;
    },
    //企业认证
    personAuthenCompany(state, res) {
        state.companyType = res.biz_result.authenType;
        state.companyValidate = res.biz_result;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
