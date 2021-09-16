import React, { useEffect, useState } from 'react';
import App from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/withApollo';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-dropzone-uploader/dist/styles.css';

import AppContextProvider from '../context/AppContext';
import { GlobalStyle } from 'components/__GLOBALS__/GlobalStyle';
import './global.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Router from 'next/router';
import cookies from 'next-cookies';
import detectIE from '../lib/utils/detectIE';
import * as gtag from '../lib/analytics';

import Meta from 'components/__GLOBALS__/Meta';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

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

  const [state, setState] = useState({ open: false, version: null });

  useEffect(() => {
    const { isIE, version } = detectIE(window.navigator.userAgent);
    if (isIE) {
      setState({ ...state, open: true, version: version });
    }
  }, []);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Meta />
        <GlobalStyle />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.open}
          onClose={handleClose}
          key={'topcenter'}
        >
          <Alert severity={'error'}>
            It looks like you are a using Internet Explorer{' '}
            {state.version && `Version ${state.version}`}. We cannot guarantee
            optimal performance on this browser as it is deprecated. Please try
            using Chrome, Safari, Edge or Firefox.
          </Alert>
        </Snackbar>
        <ToastContainer />
        <Component {...pageProps} />
      </AppContextProvider>
    </ApolloProvider>
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
