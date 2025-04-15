import Vue from 'vue'
import ElementUI from "element-ui";
import * as echarts from "echarts";
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/font/font-fzhzgbjianti.css'
import './styles/element-variables.scss'
import '@/styles/index.scss'
import '@/assets/custom-theme/index.css'
import App from './App.vue';
import store from './store';
import router from './router'
import directive from './directive'
import './permission';

Vue.use(directive)
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus=this;
  }
}).$mount('#app')
