import Meta from "./Meta";

import React, { Component } from "react";
import { ThemeProvider, styled } from "styled-components";


const theme = {
    red: '#FF0000'
}

const StyledPage = styled.div`
  background: blue;
  color: black;
`;

const Page = () => {
 
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
         {this.props.children}
        </StyledPage>
      </ThemeProvider>
    );
  
}

export default Page;
