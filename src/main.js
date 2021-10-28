import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from '@/utils/event-bus'
import mixin from '@/mixins'
import Vant from 'vant';
import 'vant/lib/index.css';

import '@/utils/inject'
import * as filters from '@/filters'

// import dayjs from 'dayjs'; //导入模块
// dayjs.locale('zh-cn'); //设置语言 或 dayjs.lang('zh-cn');
// Vue.prototype.$dayjs = dayjs;//赋值使用

// 重置样式
import '@/assets/scss/reset.scss'
// 重置 饿了么样式
import '@/assets/scss/reset-vant-ui.scss'

Vue.config.productionTip = false

// 挂载eventBus
Vue.prototype.$bus = Bus


// 挂载全局组件
Vue.use(Vant);


// 挂载全局mixin
Vue.mixin(mixin)


// 挂载全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
