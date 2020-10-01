import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { GlobalStyle } from './globals/GlobalStyle'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }
  
  render() {
    return (
      <Html>
        <Head>{this.props.styleTags}</Head>
        <GlobalStyle />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
