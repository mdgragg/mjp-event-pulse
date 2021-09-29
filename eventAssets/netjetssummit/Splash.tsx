import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { Card } from '@material-ui/core';
import { BoxedCounter } from 'components/Counters';

const StyledSplash = styled.div`
  min-height: 100vh;
  background-image: url('${(props) => props.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;

  @media all and (max-width: 1920px) {
    background-size: 100% auto;
  }
  @media all and (max-width: 1160px) {
    background-size: cover;
  }
`;

const StyledInner = styled.div`
  padding: 3rem;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  max-width: 550px;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  && img {
    width: 90%;
  }
`;

const LogoBelow = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  && img {
    width: 40%;
    margin: 0 3rem;
  }
`;
const Splash = ({ main_event }) => {
  return (
    <StyledSplash src={main_event.HeaderImage.url}>
      <Box__XYCentered>
        <StyledInner>
          <div>
            <img src={main_event.LogoLink[0]?.Media?.url} />

            <BoxedCounter event={main_event} />
          </div>
          <LogoBelow>
            <img src={main_event.LogoLink[1]?.Media?.url} />
            <img src={main_event.LogoLink[2]?.Media?.url} />
          </LogoBelow>
        </StyledInner>
      </Box__XYCentered>
    </StyledSplash>
  );
};

Splash.propTypes = {};

export default Splash;
