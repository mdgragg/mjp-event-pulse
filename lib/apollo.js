import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { endpoint } from '../config';

const apolloClient = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
  cache: new InMemoryCache()
});
 
export default withApollo(apolloClient)