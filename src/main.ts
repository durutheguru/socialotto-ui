import Vue from 'vue';
import Validation from './components/util/Validation';
import App from './App.vue';
import router from './router';
import store from './store';
import Argon from "./plugins/argon-kit";
import VueVideoPlayer from 'vue-video-player';
import VueApollo from 'vue-apollo';
import apolloProvider from './services/graphql/providerInit';


Vue.config.productionTip = false;

Validation();
Vue.use(Argon);
Vue.use(VueVideoPlayer);
Vue.use(VueApollo);



new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#container');


