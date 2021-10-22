import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import { default_theme } from '../Themes/default.theme';
import { StylesProvider, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const StyledPage = styled.div`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fontColor};
  min-height: 100vh;
  z-index: 0;
  width: 100vw;
  /* overflow: hidden; */
  p {
    font-family: ${(props) => props.theme.pfont};
  }
  h1 {
    ${(props) => props.theme.h1}
  }
  h2 {
    ${(props) => props.theme.h2}
  }
  h3 {
    ${(props) => props.theme.h3}
  }
  h4 {
    ${(props) => props.theme.h4}
  }
  h5 {
    ${(props) => props.theme.h5}
  }

  a {
    text-decoration: none;
    color: navy;
    font-weight: 600;
    margin-left: 2px;
  }
  a:hover {
    color: grey;
  }
`;

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

const Page = (props) => {
  const whole_theme = { ...default_theme, ...props.theme };
  //Material ui style provider for this theme

  return (
    <CssBaseline>
      <StylesProvider injectFirst>
        <ThemeProvider theme={whole_theme}>
          <StyledPage>{props.children}</StyledPage>
        </ThemeProvider>
      </StylesProvider>
    </CssBaseline>
  );
};

export default Page;
