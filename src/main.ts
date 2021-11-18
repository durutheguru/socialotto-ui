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

// Vue.directive('clickoutside', {
//   inserted: (el, binding, vnode) => {
// // assign event to the element
//     el.clickOutsideEvent = function (event : Event) {
//       // here we check if the click event is outside the element and it's children
//       if (!(el == event.target || el.contains(<Node>event.target))) {
//         // if clicked outside, call the provided method
//         vnode.context[binding.expression](event)
//       }
//     }
// // register click and touch events
//     document.body.addEventListener('click', el.clickOutsideEvent)
//     document.body.addEventListener('touchstart', el.clickOutsideEvent)
//   },
//   unbind: function (el) {
// // unregister click and touch events before the element is unmounted
//     document.body.removeEventListener('click', el.clickOutsideEvent)
//     document.body.removeEventListener('touchstart', el.clickOutsideEvent)
//   },
//   stopProp(event: Event) {
//     event.stopPropagation()
//   },
// })



new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#container');


