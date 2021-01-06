// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import {myAddress,myAddressBack} from "@/assets/js/address";

Vue.prototype.$http=axios;
Vue.prototype.myAddress=myAddress
Vue.prototype.myAddressBack=myAddressBack
//example
// Vue.prototype.myAddress='http://127.0.0.1:80/blog'
// Vue.prototype.myAddressBack='http://127.0.0.1:80/blog/admin'

// 组件传值需要的vue对象
Vue.prototype.EventBus=new Vue()
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
