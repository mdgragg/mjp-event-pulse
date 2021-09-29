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
  background-size: 100% auto;
  background-position: 50% 50%;
  max-width: 1920px;
  @media all and (max-width: 768px) {
    background-size: auto 100%;
  }
`;

const StyledInner = styled.div`
  padding: 3rem;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  min-width: 550px;
  min-height: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Splash = ({ main_event }) => {
  return (
    <StyledSplash src={main_event.HeaderImage.url}>
      <Box__XYCentered>
        <StyledInner>
          <div>
            <h2>Net Jets 2021</h2>
            <h2>Join Us Live In</h2>
          </div>
          <div>
            <BoxedCounter event={main_event} />
          </div>
        </StyledInner>
      </Box__XYCentered>
    </StyledSplash>
  );
};

Splash.propTypes = {};

export default Splash;
