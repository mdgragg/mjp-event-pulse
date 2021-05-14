import styled from 'styled-components';

import React from 'react';

const Wrap = styled.div`
  filter: blur(0px);
  &&.blurred {
    filter: blur(25px);
  }
`;

const FullWrap = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default FullWrap;
