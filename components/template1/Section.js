import styled from 'styled-components';
import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

const StyledSection = styled.div`
  padding: 2em;
  padding-bottom: 80px;
  width: 100%;
  min-height: ${(props) => props.minHeight || 'auto'};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  &&:nth-child(even) {
    background-color: #f2f2f2;
  }
  z-index: 99;
  && .header-text {
    font-size: 3rem;
    color: ${(props) => props.headerColor};
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  && h2 {
    font-size: 2.5rem;
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
  max-width: ${(props) => props.theme.maxSectionWidth || '1200px'};
  margin-left: auto;
  margin-right: auto;
`;

const Section = ({
  minHeight,
  headerColor,
  headerText,
  children,
  showButton,
  title,
  secondary,
}) => {
  return (
    <StyledSection minHeight={minHeight} headerColor={headerColor}>
      <div className="header-text">
        {headerText && (
          <center>
            <h2>{headerText}</h2>
          </center>
        )}
      </div>
      <InnerContent>
        {children}
        {showButton ? (
          <center>
            {' '}
            <Button className="seeAll">See All {title}</Button>
          </center>
        ) : (
          ''
        )}
      </InnerContent>
    </StyledSection>
  );
};

export default Section;
