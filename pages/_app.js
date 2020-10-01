import React from "react";
import App, { Container } from "next/app";
import { ApolloProviderComp } from "./ApolloProviderComp";
import withData from "../lib/withData";
import Meta from "./globals/Meta";
import { GlobalStyle } from './globals/GlobalStyle'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
     
        <ApolloProviderComp>
          <GlobalStyle />
          <Component {...pageProps} />
        </ApolloProviderComp>

    );
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default withData(MyApp);
