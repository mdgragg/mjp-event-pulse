import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import '../globals.css.module';
const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #181818;
  animation: load 1s ease infinite;
`;
const ProgressHolder = styled.div`
  width: 90%;
  margin: auto;
`;
const LoadingScreen = (props) => {
  return (
    <Screen>
      <ProgressHolder>
        <LinearProgress variant="buffer" value={40} valueBuffer={80} />
      </ProgressHolder>
    </Screen>
  );
};

LoadingScreen.propTypes = {};

export default LoadingScreen;
