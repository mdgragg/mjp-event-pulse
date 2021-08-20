import React from 'react';
import styled from 'styled-components';
import { load, Loader } from './LoadingImage';

const DivLoader = styled(Loader)``;

const MyDiv = styled.div`
  background-color: red;
  height: 100%;
`;
const LoadingDiv = () => {
  return <MyDiv />;
};

export default LoadingDiv;
