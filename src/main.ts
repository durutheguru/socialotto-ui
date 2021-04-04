import Vue from 'vue';
import Validation from './components/util/Validation';
import App from './App.vue';
import router from './router';
import store from './store';
import Argon from "./plugins/argon-kit";

Vue.config.productionTip = false;

Validation();
Vue.use(Argon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#container');



