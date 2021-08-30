import PropTypes from 'prop-types';
import styled, { keyframes, ThemeContext } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from 'components/Counters/Counter';
import { Fragment } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useContext } from 'react';

const breatheAnimation = keyframes`
0% { transform: scale(1.2) }
50% {transform: scale(1.3) }
100% {transform: scale(1.2) }
`;

const HeroWrap = styled.div`
  min-height: min-content;
  max-height: max-content
  width: clamp(100vw, 100vw, 1200px);
  z-index: -1;
  overflow: hidden;
  text-align: center;
`;

const HeroBgImage = styled.img`
  width: 100%;
  margin: auto;
  height: auto;
  /* max-height: 500px; */
  /* position: fixed; */
  z-index: -1;
`;

const HeaderInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  /* text-align: center; */
  && img.inner-image {
    margin-left: auto;
    max-width: 70%;
    max-height: 250px;
    margin-right: auto;
    margin-top: 3rem;
    z-index: 3;
    @media all and (max-width: 900px) {
      max-width: 95%;
    }
  }
  && .counter-with-image {
    z-index: 100;
    margin: auto;
    width: min-content;
    position: relative;
  }
`;

type HeroWithImage__Props = {
  bgImage?: string;
  // This is an optional image to display in the center of the header
  imgSrc?: string;
  children?: React.ReactNode;
};

const HeroWithImage = ({ bgImage, imgSrc, children }: HeroWithImage__Props) => {
  const theme = useContext(ThemeContext);
  return (
    <HeroWrap>
      <HeroBgImage src={bgImage || theme.header_image} />
    </HeroWrap>
  );
};

export default HeroWithImage;
