import React, { useEffect } from 'react';
import App, { Container } from 'next/app';
import { useRouter } from 'next/router';
import Meta from 'components/globals/Meta';
import { GlobalStyle } from 'components/globals/GlobalStyle';
import 'react-dropzone-uploader/dist/styles.css';
import './global.css';
import cookies from 'next-cookies';
import UserContextProvider from '../lib/context/UserContext';
import AppContextProvider from '../lib/context/AppContext';
import * as gtag from '../lib/analytics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps, loginData }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Meta />
      <GlobalStyle />
      <AppContextProvider>
        <UserContextProvider loginData={loginData}>
          <ToastContainer />
          <Component {...pageProps} />
        </UserContextProvider>
      </AppContextProvider>
    </>
  );
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
  // console.log(appContext.ctx.req);

  creds === undefined ? (creds = {}) : null;

  return {
    ...appProps,
    loginData: { cookie_creds: creds },
  };
};

export default MyApp;
