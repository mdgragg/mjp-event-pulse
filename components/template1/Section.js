import styled from "styled-components";
import React from "react";
import { Grid, Button } from "@material-ui/core";

const StyledSection = styled.div`
  padding: 2em;
  width: 100%;
  min-height: ${(props) => props.minHeight || "60vh"};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    padding: 2em;
  }
  :nth-child(even) {
    background-color: #f2f2f2;
  }
  h1 {
    margin-top: 20px;
    margin-bottom: 50px;
  }
  Button.seeAll {
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: ${(props) => props.theme.secondary};
    font-weight: bold;
    color: white;
    :hover {
      background-color: ${(props) => props.theme.hover};
    }
  }
`;

const InnerContent = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = (props) => {
  return (
    <StyledSection minHeight={props.minHeight}>
      <InnerContent>
        <center>
          {" "}
          <h1>{props.title} </h1>
        </center>
        {props.children}
        {props.showButton ? (
          <center>
            {" "}
            <Button className="seeAll">See All {props.title}</Button>
          </center>
        ) : (
          ""
        )}
      </InnerContent>
    </StyledSection>
  );
};

export default Section;
