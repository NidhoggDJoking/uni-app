import Vue from 'vue'
import App from './App'
import { getSrc } from "@/common/public.js";
import http from "@/common/base.js";
// import "@/static/icon/iconfont.css";
Vue.config.productionTip = false
Vue.prototype.getSrc = getSrc;
Vue.prototype.baseUrl = http.baseUrl;
Vue.prototype.areaCode = http.areaCode;
Vue.prototype.httpRequest = http.httpRequest;
Vue.prototype.httpTokenRequest = http.httpTokenRequest;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
