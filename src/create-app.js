/* eslint-disable no-console */
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import { createRouter } from './router/index'
import { createStore } from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/scss/index.scss'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseHost = 'http://203.195.168.79:3200/api'
} else {
  axios.defaults.baseHost = 'http://localhost:3000'
}

axios.defaults.withCredentials = true
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('./common/images/default.png')
})

Vue.use(ElementUI)

export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}