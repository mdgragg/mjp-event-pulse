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
  @media all and (max-width: 768px) {
    display: none;
  }
  && ::before {
    height: 100%;
    width: 100%;
    content: '';
    top: 0;
    position: absolute;
    background-image: url('${(props) =>
      props.theme.header_image || props.header_image}');
    opacity: ${(props) => props.theme.headerOpacity || 1};
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  width: 90%;
  height: inherit;
  /* text-align: center; */
  && h1,
  && h2 {
    color: ${(props) => props.theme.headerFontColor};
    font-family: ${(props) => props.theme.headerFont};
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
