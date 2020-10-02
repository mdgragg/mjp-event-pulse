import React, { useRef } from "react";
import styled, { ThemeProvider, withTheme }  from  "styled-components";
import  NProgress  from 'nprogress'
import Router from 'next/router'
import template1Theme from './template1.theme'
import { StylesProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'

const StyledPage = styled.div`
  background: ${props=> props.theme.bg};
  color: black;
  min-height: 100vh;
  p{
    font-family: ${props => props.theme.pfont};
  }
`;

Router.onRouteChangeStart = () =>{
  NProgress.start()

}

Router.onRouteChangeComplete = () => {
  console.log("changing some stuff")
  NProgress.done()

}



const Page = (props) => {

    return (
      //Material ui style provider for this theme
      <CssBaseline> 
      <StylesProvider injectFirst> 
      <ThemeProvider theme={template1Theme}>
        <ThemeProvider theme={props.theme}>

          <h1>{props.title}</h1>
            <StyledPage>
              {props.children}
            </StyledPage>
        </ThemeProvider>
      </ThemeProvider>
      </StylesProvider>
      </CssBaseline>
   
    );
  
}

export default Page;
