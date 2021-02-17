import Vue from 'vue';
import Validation from './components/util/Validation';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Validation();


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#container');



