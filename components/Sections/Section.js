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
`;

const Section = ({ minHeight, headerColor, children }) => {
  return (
    <StyledSection minHeight={minHeight} headerColor={headerColor}>
      {children}
    </StyledSection>
  );
};

export default Section;
