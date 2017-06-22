import httpService from '../../common/httpService'
// 公共模块 搜索列子组件
// 将所有能够通过头部搜索 组件的列表全部放这里
const state = {
    isTabNum: 1, //监听该值的变化时不是从tab过来的链接 如果是 清除搜索选项
    showHot: false,
    customerList: { list: [] }, //货主列表 
    breedList: { list: [] }, //品名ID
    namePpl: { list: [] }, //分词品名列表
    depotPpl: { list: [] }, //仓库列
    noPpl: { list: [] }, //单号
    customerPpl: { list: [] },
    depotList: { list: [] }, //仓库列表
    siteList: { list: [] }, //仓库对应的库位点列表
    searchValue: {
        needValue: '',
        resourceValue: ''
    },
    drugList: [],
    HotList: [],
    marketList: [],
    needList: [],
    resourceList: [],
    preSellList: [],
    drugsEnyc: {},
    cityList: [],
    cityNameList: [],
    countryList: []
}

// getters
const getters = {
    isTabNum: state => state.isTabNum,
    customerList: state => state.customerList,
    breedList: state => state.breedList,
    namePpl: state => state.namePpl,
    depotPpl: state => state.depotPpl,
    noPpl: state => state.noPpl,
    customerPpl: state => state.customerPpl,
    depotList: state => state.depotList,
    siteList: state => state.siteList,
    cityList: state => state.cityList,
    countryList: state => state.countryList
}

// actions
const actions = {
    addIsTabNum({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('addIsTabNum', param);
            resolve();
        })
    },
    //热门搜索显示
    showHot({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('showHot', param);
            resolve();
        })
    },
    //药材百科搜索详情
    sch_getDrugsEnycInfo({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('getDrugsEnycInfo', param);
            resolve(param);
        })
    },
    //药材百科搜索详情
    sch_clearDrugsEnycInfo({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('clearDrugsEnycInfo');
            resolve()
        })
    },
    //获取城市列表 ID型
    sch_getCityList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('sch_getCityList', param);
            resolve(param)
        })
    },
    //获取国家列表
    sch_getCountryList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('sch_getCountryList', param);
            resolve();
        })
    },
    //获取货主列表
    sch_getCustomerList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getCustomerList_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //获取药品列表
    getBreedList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getBreedList_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //获取仓库列表
    getDepotList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getDepotList_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //获取库位点列表
    getSiteList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getSiteList_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //药品id搜索
    sch_getInitNamePpl({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getInitNamePpl_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //仓库搜索
    sch_getInitDepotPpl({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getInitDepotPpl_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //单号搜索
    getInitNoPpl({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getInitNoPpl_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    //货主搜索
    sch_getInitCustomerPpl({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('sch_getInitCustomerPpl_my', res);
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    },
    setSearchValue({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            if (param.type === 0) {
                state.searchValue.resourceValue = param.value;
            } else {
                state.searchValue.needValue = param.value;
            }
            resolve('success');
        })
    },
    drugList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('drugList', param);
            resolve()
        })
    },
    HotList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('HotList', param);
            resolve()
        })
    },
    marketList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('marketList', param);
            resolve()
        })
    },
    needList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('needList', param);
            resolve()
        })
    },
    resourceList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('resourceList', param);
            resolve()
        })
    },
    preSellList({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            commit('preSellList', param);
            resolve()
        })
    },

}

// mutations
const mutations = {
    addIsTabNum(state, res) {
        state.isTabNum += res;
    },
    sch_getCityList(state, res) {
        state.cityList = res;
    },
    sch_getCountryList(state, res) {
        state.countryList = res;
    },
    drugList(state, res) {
        state.drugList = res;
    },
    HotList(state, res) {
        state.HotList = res;
    },
    marketList(state, res) {
        state.marketList = res;
    },
    needList(state, res) {
        state.needList = res;
    },
    resourceList(state, res) {
        state.resourceList = res;
    },
    preSellList(state, res) {
        state.preSellList = res;
    },
    showHot(state, res) {
        state.showHot = res;
    },
    sch_getCustomerList_my(state, res) {
        state.customerList = res.biz_result;
    },
    sch_getBreedList_my(state, res) {
        state.breedList = res.biz_result;
    },
    sch_getInitNamePpl_my(state, res) {
        for (let i = 0; i < res.biz_result.list.length; i++) {
            let item = res.biz_result.list[i];
            //设置列表显示的值
            item.value = item.keyWord + '(' + item.breedName + ')';
        }
        state.namePpl = res.biz_result;
    },
    sch_getInitDepotPpl_my(state, res) {
        for (let i = 0; i < res.biz_result.list.length; i++) {
            let item = res.biz_result.list[i];
            //设置列表显示的值
            item.keyWord = item.name
            item.value = item.name;
        }
        state.depotPpl = res.biz_result;
    },
    sch_getInitNoPpl_my(state, res) {
        for (let i = 0; i < res.biz_result.list.length; i++) {
            let item = res.biz_result.list[i];
            //设置列表显示的值
            item.keyWord = item.name
            item.value = item.name;
        }
        state.noPpl = res.biz_result;
    },
    sch_getInitCustomerPpl_my(state, res) {
        for (let i = 0; i < res.biz_result.list.length; i++) {
            let item = res.biz_result.list[i];
            //设置列表显示的值
            item.keyWord = item.name
            item.value = item.name;
        }
        state.customerPpl = res.biz_result;
    },
    sch_getDepotList_my(state, res) {
        state.depotList = res.biz_result;
    },
    sch_getSiteList_my(state, res) {
        for (let i = 0; i < res.biz_result.depotSites.length; i++) {
            let item = res.biz_result.depotSites[i];
            //设置列表显示的值
            item.keyWord = item.name;
            item.value = item.name;
        }
        state.siteList.list = res.biz_result.depotSites;
    },
    getDrugsEnycInfo(state, res) {
        state.drugsEnyc = res;
    },
    clearDrugsEnycInfo(state) {
        state.drugsEnyc = {};
    },


}

export default {
    state,
    getters,
    actions,
    mutations
}
