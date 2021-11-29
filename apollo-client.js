import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    ssrMode: true,
    uri: 'https://b2cdemo.getswift.asia/graphql',
    cache: new InMemoryCache()
});

export default client;