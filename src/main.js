import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue(); // Global bus

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
