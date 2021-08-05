import styled from 'styled-components';
import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

const StyledSection = styled.div`
  padding: 2em;
  min-height: 80vh;
  width: 100%;
  min-height: ${(props) => props.minHeight || 'auto'};
  background-color: ${(props) => props.bgColor || 'white'};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = (props) => {
  return <StyledSection {...props}>{props.children}</StyledSection>;
};

export default Section;
