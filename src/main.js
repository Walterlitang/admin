import Vue from 'vue'
import App from './App.vue'
import router from './router'
import utils from '@/utils/utils';
import store from './store'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.utils=utils;
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this;
  }
}).$mount('#app')
