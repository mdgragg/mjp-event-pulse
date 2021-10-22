// lib/withApollo.js

import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjI2NDY1MzY4LCJleHAiOjE2NTgwMDEzNjh9.7uAbRn3uXFFmZRE70Sf5nB0GwiwVr33tc2sOWcasDto`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
