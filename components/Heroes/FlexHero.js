import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from 'components/Counters/Counter';
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const breatheAnimation = keyframes`
0% { transform: scale(1.2) }
50% {transform: scale(1.3) }
100% {transform: scale(1.2) }
`;

const HeroHolder = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.theme.heroHeight || '35vh'};
  background-color: ${(props) => props.theme.headerBgColor};
  overflow: hidden;
  color: white;

  && ::before {
    height: 100%;
    width: 100%;
    content: '';
    top: 0;
    position: absolute;
    background-image: url('${(props) =>
      props.theme.header_image || props.header_image}');
    opacity: ${(props) => props.theme.headerOpacity || 1};
    background-attachment: inherit;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  @media all and (max-width: 768px) {
    height: min-content;
    padding-bottom: 1rem;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  margin: auto;
  width: 90%;
  height: inherit;
  /* text-align: center; */
  && h1,
  && h2 {
    color: ${(props) => props.theme.headerFontColor};
    font-family: ${(props) => props.theme.headerFont};
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
    margin: auto;
  }
  @media all and (max-width: 768px) {
    && h1,
    && h2 {
      font-size: 1.5rem !important;
    }
  }
`;

export default function Hero(props) {
  const { theme } = props;

  return (
    <HeroHolder bgImage={props.bgImage}>
      <HeaderInner className="header--inner ">{props.children}</HeaderInner>
    </HeroHolder>
  );
}
