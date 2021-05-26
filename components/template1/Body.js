import styled from 'styled-components';
import React from 'react';

const StyledBody = styled.div`
  /* padding: 2em; */
  width: 100%;
  min-height: calc(1080px - ${(props) => props.theme.headerHeight});
  background-color: ${(props) => props.theme.bg};
  z-index: 20;
`;

const Body = (props) => {
  return <StyledBody>{props.children}</StyledBody>;
};

export default Body;
