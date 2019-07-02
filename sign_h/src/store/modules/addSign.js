import { addSign } from "@/api";
const state = {
    addInfo: {
        company: '', // 公司名称
        phone: '', // 电话
        start_time: '', // 时间
        address: '', // 地址
        description: '' // 备注
    }
}

const getters = {

}

const actions = {
    async submit(state, payload){
        console.log('payload...',payload);
        return new Promise(async (resolve,reject)=>{
            // 填充经纬度
            payload.latitude = payload.address.location.lat;
            payload.longitude = payload.address.location.lng;
            // 序列号地址
            payload.address = JSON.stringify(payload.address);
            let data = await addSign(payload);
            resolve(data)
        })
    }
}

const mutations = {
    initAddInfo(state, payload){
        state.addInfo = {...state.addInfo, ...payload}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}