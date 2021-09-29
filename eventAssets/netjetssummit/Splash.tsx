import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { Card } from '@material-ui/core';
import { BoxedCounter } from 'components/Counters';

export const StyledSplash = styled.div`
  min-height: 100vh;
  height: auto;
  background-image: url('${(props) => props.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;
  background-color: ${(props) => props.theme.palette.background.tertiary};
  @media all and (max-width: 1920px) {
    background-size: 100% auto;
  }
  @media all and (max-width: 1160px) {
    background-size: cover;
  }
`;

export const StyledInner = styled.div`
  padding: 3rem;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  min-width: 765px;
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  && img {
    width: 65%;
    max-width: 350px;
  }
`;

export const LogoBelow = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  && img {
    width: 40%;
    margin: 0 3rem;
    max-width: 250px;
  }
`;
type Splash__Props = {
  main_event: any;
  children?: React.ReactNode;
  noHeader?: boolean;
};
const Splash = ({ main_event, children, noHeader }: Splash__Props): any => {
  return (
    <StyledSplash src={main_event.HeaderImage.url}>
      <Box__XYCentered>
        <StyledInner>
          {noHeader ? null : (
            <div>
              <img src={main_event.LogoLink[0]?.Media?.url} />
              <BoxedCounter event={main_event} />
            </div>
          )}
          {children && children}
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
