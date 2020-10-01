import Meta from "./Meta";

import React from "react";
import styled, { ThemeProvider, withTheme }  from  "styled-components";

import template1Theme from './template1.theme'

const StyledPage = styled.div`
  background: ${props=> props.theme.bg};
  color: black;
  min-height: 100vh;
  padding: 2em;
`;

const Page = (props) => {
    return (

      <ThemeProvider theme={template1Theme}>
        <ThemeProvider theme={props.theme}>
          <h1>{props.title}</h1>
          <Meta/>
            <StyledPage>
              {props.children}
            </StyledPage>
        </ThemeProvider>
      </ThemeProvider>
   
    );
  
}

export default Page;
