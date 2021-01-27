import styled from 'styled-components';
import React from 'react';
import { Grid, Button } from '@material-ui/core';

const StyledSection = styled.div`
  padding: 3em;
  padding-bottom: 80px;
  width: 100%;
  min-height: ${(props) => props.minHeight || 'auto'};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  :nth-child(even) {
    background-color: #f2f2f2;
  }
  && .header-text {
    font-size: 3rem;
    color: ${(props) => props.headerColor};
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  && h2 {
    font-size: 2rem;
    margin-top: 20px;

    color: ${(props) => props.headerColor};
  }
  && h2 ::after {
    width: 350px;
    display: block;
    height: 20px;
    content: ' ';
    border-bottom: 2px solid ${(props) => props.headerColor || 'black'};
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
    <StyledSection minHeight={props.minHeight} headerColor={props.headerColor}>
      <div className="header-text"> {props.headerText}</div>
      <InnerContent>
        <center>{props.title && <h2>{props.title} </h2>}</center>
        {props.children}
        {props.showButton ? (
          <center>
            {' '}
            <Button className="seeAll">See All {props.title}</Button>
          </center>
        ) : (
          ''
        )}
      </InnerContent>
    </StyledSection>
  );
};

export default Section;
