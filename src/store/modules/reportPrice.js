import httpService from '../../common/httpService'
import { getDay } from '../../filters/index.js'

const state = {
    userReportPriList: [],
    userReportTotal: ''
}

// getters
const getters = {
    userReportPriList: state => state.userReportPriList,
    userReportTotal: state => state.userReportTotal
}

// actions
const actions = {
    //获取我的报价列表
    userReportPri({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            httpService.commonPost(param.path, param.body)
                .then(function(res) {
                    commit('getUserReportPri', res);
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
    //我的报价列表
    getUserReportPri(state, res) {
        console.log(res.biz_result.list);
        let arr = res.biz_result.list;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].pubdate) arr[i].pubdate = arr[i].pubdate.split(' ')[0];
            if (arr[i].duedate) {
                arr[i].days = getDay(new Date(arr[i].duedate));
                if (arr[i].days <= 0) {
                    arr[i].days = 0;
                }
            }
            arr[i].number = arr[i].number + arr[i].unit;

        }
        for (var i = 0; i < arr.length; i++) {
            let obj = arr[i];
            obj.showEWM = false;
            obj.showtips = false;
        }
        state.userReportPriList = arr;
        state.userReportTotal = res.biz_result.total;

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
