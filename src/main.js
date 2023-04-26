
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import VueCookies from 'vue-cookies' 
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/reset.css"
import './assets/css/iconfont.css'
import './assets/css/iconfont.eot'
import './assets/css/iconfont.svg'
import './assets/css/iconfont.ttf'
import './assets/css/iconfont.woff'
import qs from 'qs'

import store from './store' 
//每一个vue实例都可以访问stone
// import axios from 'axios'

// import Axios from './request/axios';
//配置api封装url
//跨域
// axios.defaults.withCredentials = true;
// Vue.config.productionTip = false
// Vue.config.devtools = true;
//设置cross跨域 并设置访问权限 容许跨域携带cookie信息
// axios.withCredentials = true

const app = createApp(App).use(ElementPlus).use(router).use(store)
app.config.globalProperties.$qs = qs
// app.config.globalProperties.$axios=axios
app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$red = false;
// app.config.globalProperties.$store = store
app.mount('#app')
