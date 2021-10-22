import React, { useEffect, useState } from 'react';
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
  const [i, seti] = useState(0);

  useEffect(() => {
    let t = 0;
    const loadInt = setInterval(() => {
      t++;
      seti(t);
    }, 50);
    return () => clearInterval(loadInt);
  }, []);
  return (
    <Screen>
      <ProgressHolder>
        <LinearProgress variant="buffer" value={i} valueBuffer={1 * 0.8} />
        <p style={{ color: 'white' }}>{props.message}</p>
      </ProgressHolder>
    </Screen>
  );
};

LoadingScreen.propTypes = {};

export default LoadingScreen;
