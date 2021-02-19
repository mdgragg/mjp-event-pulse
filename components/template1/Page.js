import React, { useContext, useRef } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import { template1Theme } from './template1.theme';
import { StylesProvider, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import AppContextProvider, { AppContext } from 'lib/context/AppContext';
import LoadingScreen from '../globals/Loading';
const StyledPage = styled.div`
  /* background: ${(props) => props.theme.bg}; */
  color: ${(props) => props.theme.fontColor};
  min-height: 100vh;
  z-index: 0;
  width: 100vw;
  /* overflow: hidden; */
  p {
    font-family: ${(props) => props.theme.pfont};
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
  const { loading } = useContext(AppContext);

  const whole_theme = { ...template1Theme, ...props.theme };

  //Material ui style provider for this theme

  {
    if (loading.loading) {
      return (
        <CssBaseline>
          <StylesProvider injectFirst>
            <ThemeProvider theme={whole_theme}>
              <StyledPage>
                <LoadingScreen message={loading.message} />
              </StyledPage>
            </ThemeProvider>
          </StylesProvider>
        </CssBaseline>
      );
    } else
      return (
        <CssBaseline>
          <StylesProvider injectFirst>
            <ThemeProvider theme={whole_theme}>
              <StyledPage>{props.children}</StyledPage>
            </ThemeProvider>
          </StylesProvider>
        </CssBaseline>
      );
  }
};

export default Page;
