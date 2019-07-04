import { getList, getDetail, updateDetail } from "@/api";
import moment from "moment";

const state = {
    signList: [], // 面试列表
    signDetail: {}, // 详情
    pageSize: 10,
    page: 1
}

const getters = {

}

const actions = {
    // 获取面试列表
    async getList({state,commit}, payload={}){       
        payload.pageSize = state.pageSize;
        payload.page = state.page;
        let {data} = await getList(payload);      
        data.forEach(item => {
            item.address = JSON.parse(item.address);
            item.start_time = formatTime(item.start_time);
        })
        // 判断是替换还是追加
        if (state.page === 1){
            commit('updateList',{signList: data})
        }else{
            commit('updateList',{signList: [...state.signList, ...data]})
        }
        // commit('updateList',data)
    },
    // 获取面试详情
    async getDetail({commit}, payload){
        let {data} = await getDetail(payload);
        data.address = JSON.parse(data.address);
        data.start_time = formatTime(data.start_time);
        commit('updateDetail',data)
    },
    // 修改面试状态
    async updateDetail({commit,dispatch}, payload){
        let data = await updateDetail(payload);
        if(data.code===0){
            dispatch('getDetail', payload.id);
        }
        return data;
    }
}

const mutations = {
    updateList(state,payload){
        state.signList = payload.signList
    },
    updateDetail(state, payload){
        state.signDetail = payload
    },
    updatePage(state,payload){
        state.page = payload
    }
}

// 处理时间
function formatTime(start_time){
    return moment(start_time*1).format('YYYY-MM-DD HH:mm');
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}