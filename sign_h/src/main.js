import Vue from 'vue'
import App from './App'
import store from '@/store';
import QQMapWX from "@/utils/qqmap-wx-jssdk.min";

Vue.config.productionTip = false
App.mpType = 'app'

const $map = new QQMapWX({
    key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
})
Vue.prototype.$store = store;
Vue.prototype.$map = $map;


const app = new Vue(App)
app.$mount()
