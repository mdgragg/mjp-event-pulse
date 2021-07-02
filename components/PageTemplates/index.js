import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Footer from '../Footers';
import { default_theme } from '../Themes/default.theme';
import { StylesProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const StyledPage = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fontColor};
  min-height: 100vh;
  z-index: 0;
  min-width: 100vw;
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
    color: unset;
    font-weight: 600;
  }
`;

const Page = ({ theme, children, showFooter = true }) => {
  const whole_theme = { ...default_theme, ...theme };
  //Material ui style provider for this theme

  return (
    <CssBaseline>
      <StylesProvider injectFirst>
        <ThemeProvider theme={whole_theme}>
          <StyledPage>
            {children}
            {showFooter && <Footer />}
          </StyledPage>
        </ThemeProvider>
      </StylesProvider>
    </CssBaseline>
  );
};

export default Page;
