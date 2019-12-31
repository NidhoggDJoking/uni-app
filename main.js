import Vue from 'vue'
import App from './App'
import { getSrc } from "@/common/public.js";
Vue.config.productionTip = false
Vue.prototype.getSrc=getSrc;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
