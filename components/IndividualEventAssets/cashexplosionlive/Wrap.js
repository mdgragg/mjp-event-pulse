import React from 'react';
import styled from 'styled-components';

import { event_theme } from '../../../pages/cashexplosionlive/index';
const MainWrap = styled.div`
  background-color: red;
  min-height: 100vh;
`;

const Wrap = ({ children }) => {
  return <MainWrap>{children}</MainWrap>;
};

export default Wrap;
