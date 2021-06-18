import React from 'react';
import styled from 'styled-components';

const WRAP = styled.div`
  font-family: Futura Bold;
  button {
    background-color: ${(props) => props.theme.orange};
    color: white;
    text-transform: uppercase;
    font-weight: 800;
    min-height: 45px;
    min-width: 220px;
  }
  button:hover {
    background-color: grey;
  }
  h3 {
    font-family: Futura Bold;
    text-transform: uppercase;
    font-size: 2.25rem;
    color: ${(props) => props.theme.orange};
  }
  p {
    font-family: Avenir;
    font-size: 1.25rem;
  }
`;
const YWCA_STYLE = ({ children }) => {
  return <WRAP> {children}</WRAP>;
};

export default YWCA_STYLE;
