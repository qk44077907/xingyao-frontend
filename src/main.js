import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './initMethods'
import { Loading } from 'element-ui';

Vue.config.productionTip = false

Vue.use(Loading.directive,{ size: 'small' });

Vue.prototype.$loading = Loading.service;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
