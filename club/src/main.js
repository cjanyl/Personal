// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

//ant design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

//moment 时间处理
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

//axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);


import store from './store';
import router from './router';
//cookie
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
