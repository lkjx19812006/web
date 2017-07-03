import httpService from '../../common/httpService'


const state = {
    user: { name: "", idnumber: "" },
    userTypeMap: [],
    srcUrl: '',
    targetUrl: '',
    userFlag: false,
    userList: { list: [] },
    userDetail: {},
    employeeList: {},
    addressList: [],
    myResource: [],
    myNeed: [],
    mySuggest: []
}

// getters
const getters = {
    user: state => state.user,
    userTypeMap: state => state.userTypeMap,
    srcUrl: state => state.srcUrl,
    targetUrl: state => state.targetUrl,
    userList: state => state.userList,
    userDetail: state => state.userDetail,
    employeeList: state => state.employeeList,
    myResource: state => state.myResource,
    myNeed: state => state.myNeed,
    mySuggest: state => state.mySuggest,
    userFlag: state => state.userFlag
}

// actions
const actions = {
    changeFlag({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('changeFlag', param);
            resolve();
        })
    },
    getUserInformation({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('initUser', res);
                    resolve(res);
                    //console.log(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    getUserTypeMap({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('initUserTypeMap', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    getSuggest({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getSuggest', res);
                    resolve(res);
                    console.log(1, res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    getMyResource({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getMyResource', res);
                    resolve(res);
                    //console.log(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    getMyNeed({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getMyNeed', res);
                    resolve(res);
                    //console.log(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    login({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        })
    },
    setUrl({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('setUrl', param);
            resolve();
        });
    },
    getEmployee({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonGet(param)
                .then(function(response) {
                    commit('initEmployeeList', response);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        })
    },
    quitWeb({ commit, state }) {
        commit('quit')
    },
    getUserAddressList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(response) {
                    commit('initUserAddressList', response);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        })
    }
}

// mutations
const mutations = {
    setUrl(state, res) {
        state.srcUrl = res;
    },
    initUser(state, res) {
        state.user = res.biz_result;
    },
    initUserTypeMap(state, res) {
        state.userTypeMap = res.biz_result.list;
    },
    initUserList(state, res) {
        state.userList = res.biz_result;
    },
    initUserDetail(state, res) {
        state.userDetail = state.userList.list.find((item) => item.id == res);
    },
    initEmployeeList(state, res) {
        state.employeeList = res.result.list;
    },
    quit(state) {
        state.user = '';
    },
    initUserAddressList(state, res) {
        res.biz_result.list.forEach(item => {
            item.operateShow = false;
            item.selectShow = false;
            if (item.type === 1) {
                item.selectShow = true;
            }
        })
        state.addressList = res.biz_result.list;
    },
    getMyResource(state, res) {
        state.myResource = res.biz_result;
    },
    getMyNeed(state, res) {
        state.myNeed = res.biz_result;
    },
    getSuggest(state, res) {
        state.mySuggest = res.biz_result;
    },
    changeFlag(state, res) {
        state.userFlag = res;
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
