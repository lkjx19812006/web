import httpService from '../../common/httpService'


const state = {
    spec: [],
    location: [],
    units: [],
    priceUnit: [],
    myInfor: ''
}

// getters
const getters = {
    specList: state => state.spec,
    loactionList: state => state.location,
    units: state => state.units,
    priceUnit: state => state.priceUnit,
    myInfor: state => state.myInfor
}

// actions
const actions = {
    //获取固定药材对应的产地和规格
    getBreedInfor({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getBreedInfor', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //获取单位
    getUnit({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getUnit', res);
                    console.log(1, res)
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //个人留言页面获取个人信息
    getInfor({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getInfor', res);
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
    getBreedInfor(state, res) {
        let spec = res.biz_result.specList;
        let local = res.biz_result.localList;
        for (var i = 0; i < spec.length; i++) {
            spec[i].value = spec[i].name;
            spec[i].label = spec[i].name;
        }
        for (var i = 0; i < local.length; i++) {
            local[i].value = local[i].name;
            local[i].label = local[i].name;
        }
        state.spec = spec;
        state.location = local;
        console.log(state.location)
    },
    getUnit(state, res) {
        let myUnit = res.biz_result.list;
        let myPriceUnit = res.biz_result.list;

        for (var i = 0; i < myUnit.length; i++) {
            myUnit[i].value = myUnit[i].id;
            myUnit[i].label = myUnit[i].name;
        }
        /*for (var i = 0; i < myPriceUnit.length; i++) {
            myPriceUnit[i].value = '选项' + i;
            myPriceUnit[i].label = myPriceUnit[i].name + '/元';
        }*/
        state.units = myUnit;
        /*state.priceUnit = myPriceUnit;*/
    },
    getInfor(state, res) {
        state.myInfor = res.biz_result;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
