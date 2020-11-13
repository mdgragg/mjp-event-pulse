import React, { createContext, useState } from 'react';
import App, { Container } from 'next/app';
import Meta from 'components/globals/Meta';
import { GlobalStyle } from 'components/globals/GlobalStyle';
import UserContext from 'lib/context/UserContext';
import cookies from 'next-cookies';
import UserContextProvider from '../lib/context/UserContext';
import { login } from '../lib/fetchCalls/login';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Meta />
        <GlobalStyle />
        <UserContextProvider creds={this.props.creds}>
          <Component {...pageProps} />
        </UserContextProvider>
      </>
    );
  }
}
// import withApollo from "next-with-apollo";
// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient, { InMemoryCache } from "apollo-boost";

// const App = ({ Component, pageProps, apollo }) => (
//   <ApolloProvider client={apollo}>
//     <Component {...pageProps} />
//   </ApolloProvider>
// );

// export default withApollo(({ initialState }) => {
//   return new ApolloClient({
//     uri: process.env.NEXT_PUBLIC_STRAPI_API_URL,
//     cache: new InMemoryCache().restore(initialState || {}),
//   });
// })(App);

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  const appProps = await App.getInitialProps(appContext);
  let { creds } = cookies(appContext.ctx);

  if (creds === undefined) {
    creds = {};
  }

  // const loggedIn = await login(creds);
  // console.log(loggedIn);
  return { ...appProps, creds };
};

export default MyApp;
