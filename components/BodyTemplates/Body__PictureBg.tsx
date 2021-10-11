import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { BoxedCounter } from 'components/Counters';
import { useRouter } from 'next/router';

export const StyledSplash = styled.div`
  min-height: 100vh;
  height: auto;
  background-image: url('${(props) => props.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 20%;
  background-attachment: fixed;
  background-color: ${(props) => props.theme.palette.background.tertiary};
  @media all and (max-width: 1920px) {
    background-size: 120% auto;
  }
  @media all and (max-width: 1160px) {
    background-size: cover;
  }
`;

export const StyledInner = styled.div`
  /* padding: 3rem; */
  background-color: rgba(0, 0, 0, 0);
  color: white;
  width: 100%;
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

type BodyBg__Props = {
  imgSrc: any;
  children?: React.ReactNode;
  footerComponent?: React.ReactNode;
};
const BodyBg = ({ imgSrc, children, footerComponent }: BodyBg__Props): any => {
  const router = useRouter();
  return (
    <StyledSplash src={imgSrc}>
      <Box__XYCentered>
        <StyledInner>
          {children && children}
          <div>{footerComponent && footerComponent}</div>
        </StyledInner>
      </Box__XYCentered>
    </StyledSplash>
  );
};

BodyBg.propTypes = {};

export default BodyBg;
