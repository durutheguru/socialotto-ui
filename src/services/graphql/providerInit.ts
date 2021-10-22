import store from '@/store';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';



const gqlOptions = {
    uri: process.env.VUE_APP_GRAPHQL_URL
};

const anonymousClient = new ApolloClient({
    ...gqlOptions
});

const secureClient = new ApolloClient({
    ...gqlOptions,
    headers: {
        Authorization: store.getters['authToken/apiToken'],
    }
});

const apolloProvider = new VueApollo({
    clients: {
        secureClient,
        anonymousClient,
    },

    defaultClient: secureClient,
});


export default apolloProvider;


