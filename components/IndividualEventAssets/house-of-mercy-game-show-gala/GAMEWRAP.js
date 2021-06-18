import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  font-family: Avenir;
`;
const GAMEWRAP = ({ children }) => {
  return <Wrap>{children} </Wrap>;
};

export default GAMEWRAP;
