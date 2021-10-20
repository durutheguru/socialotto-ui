import Vue from 'vue';
import Validation from './components/util/Validation';
import App from './App.vue';
import router from './router';
import store from './store';
import Argon from "./plugins/argon-kit";
import VueVideoPlayer from 'vue-video-player';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false;

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri:  process.env.VUE_APP_GRAPHQL_URL,
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});





Validation();
Vue.use(Argon);
Vue.use(VueVideoPlayer);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#container');


// import Vue from 'vue';
// import Validation from './components/util/Validation';
// import App from './App.vue';
// import router from './router';
// import store from './store';
// import Argon from "./plugins/argon-kit";
// import VueVideoPlayer from 'vue-video-player';
// import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import VueApollo from 'vue-apollo'
// // import * as Sentry from "@sentry/vue";
// // import { Integrations } from "@sentry/tracing";

// Vue.config.productionTip = false;

// // HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri:  process.env.VUE_APP_BASE_URL + '/graphql',
// });

// // Cache implementation
// const cache = new InMemoryCache();

// // Create the apollo client
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// });

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// })


// Validation();
// Vue.use(Argon);
// Vue.use(VueVideoPlayer);
// Vue.use(VueApollo);


// new Vue({
//   router,
//   store,
//   apolloProvider,
//   render: (h) => h(App),
// }).$mount('#container');




