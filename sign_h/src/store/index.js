import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 引入子模块
import index from './modules/index';
import addSign from "./modules/addSign";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        info: {}  // 用户信息
    },
    modules: {
        index,
        addSign
    },
    mutations: {
        // 更新全局的state
        updateState(state, payload){
            state.info = payload;
        }
    },
    plugins: [createLogger()]
})