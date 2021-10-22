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

type Box__XYCentered = {
  minHeight?: string;
  children: React.ReactNode;
};
const Box__XYCentered = ({ minHeight, children }: Box__XYCentered): any => {
  return <StyledBox minHeight={minHeight}>{children}</StyledBox>;
};

export default Box__XYCentered;
