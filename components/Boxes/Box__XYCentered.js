import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  min-height: ${(props) => props.minHeight || '100vh'};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Box__XYCentered = ({ minHeight, children }) => {
  return <StyledBox minHeight={minHeight}>{children}</StyledBox>;
};

export default Box__XYCentered;
