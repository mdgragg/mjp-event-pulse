import React, { useRef } from "react";
import styled, { ThemeProvider, withTheme }  from  "styled-components";
import  NProgress  from 'nprogress'
import Router from 'next/router'
import { template1Theme } from './template1.theme'
import { StylesProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles';
import Header from './Header'
const StyledPage = styled.div`
  background: ${props=> props.theme.bg};
  color: ${props => props.theme.fontColor};
  min-height: 100vh;
  z-index: 0;
  p{
    font-family: ${props => props.theme.pfont};
  }


`;

Router.onRouteChangeStart = () =>{
  NProgress.start()

}
Router.onRouteChangeComplete = () => {
 
  NProgress.done()

}

const Page = (props) => {

    return (
      //Material ui style provider for this theme
      <CssBaseline> 
      <StylesProvider injectFirst> 
      {/* <uiThemeProvider theme={{theme}}>  */}
      <ThemeProvider theme={template1Theme}>
        <ThemeProvider theme={props.theme}>
            <StyledPage>
              { props.children }
            </StyledPage>
        </ThemeProvider>
      </ThemeProvider>
      {/* </uiThemeProvider> */}
      </StylesProvider>
      </CssBaseline>
   
    );
  
}

export default Page;
