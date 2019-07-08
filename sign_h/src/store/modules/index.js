const state = {
    longitude: 116.29845,
    latitude: 39.95933,
}

const getters = {

}

const actions = {
    getLocation({commit}, payload){
        wx.getLocation({
            type: 'gcj02',
            success(res){
                commit('updateLocation',res)
            }
        })
    }
}

const mutations = {
    updateLocation(state, payload){
        state.longitude = payload.longitude
        state.latitude = payload.latitude
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}