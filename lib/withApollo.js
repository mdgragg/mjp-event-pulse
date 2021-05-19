// lib/withApollo.js
import withApollo from 'next-with-apollo';
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjEyOTIxNDIyLCJleHAiOjE2NDQ0NTc0MjJ9.sn6CXXs5VKaqA6o39g-0sG15SislKB1MmCFneJfY13w`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
