import Meta from "./Meta";

import React, { Component } from "react";
import styled, { ThemeProvider }  from  "styled-components";


const theme = {
    red: '#FF0000'
}

const StyledPage = styled.div`
  background: blue;
  color: black;
`;

const Page = (props) => {
 
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
             {props.children}
        </StyledPage>
      </ThemeProvider>
    );
  
}

export default Page;
