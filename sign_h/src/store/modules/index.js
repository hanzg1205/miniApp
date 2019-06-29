const state = {
    longitude: '80',
    latitude: '122',
}

const getters = {

}

const actions = {
    getLocation({commit}, payload){
        wx.getLocation({
            type: 'wgs84',
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