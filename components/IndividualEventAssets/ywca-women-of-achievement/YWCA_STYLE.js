import React from 'react';
import styled from 'styled-components';

const WRAP = styled.div`
  button {
    background-color: ${(props) => props.theme.orange};
    color: white;
    text-transform: uppercase;
    font-weight: 800;
    min-height: 60px;
    min-width: 220px;
  }
  button:hover {
    background-color: grey;
  }
  h3 {
    font-family: Futura-Bold;
    text-transform: uppercase;
    font-size: 2.25rem;
    color: ${(props) => props.theme.orange};
  }
`;
const YWCA_STYLE = ({ children }) => {
  return <WRAP> {children}</WRAP>;
};

export default YWCA_STYLE;
