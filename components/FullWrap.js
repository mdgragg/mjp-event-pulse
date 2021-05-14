import styled from 'styled-components';

import React from 'react';

const Wrap = styled.div`
  filter: blur(0px);
  &&.blurred {
    filter: blur(18px);
  }
`;

const FullWrap = ({ children, className }) => {
  return <Wrap className={className}>{children}</Wrap>;
};

export default FullWrap;
