import styled, { keyframes } from 'styled-components';
import {
  Grid,
  Card,
  AppHeader,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Counter from './Counter';
import { Fragment } from 'react';

const breatheAnimation = keyframes`
0% { transform: scale(1.2) }
50% {transform: scale(1.5) }
100% {transform: scale(1.2) }
`;

const HeroHolder = styled.div`
  position: relative;

  width: 100%;
  height: ${(props) => props.theme.heroHeight};
  background-color: rgba(0, 0, 0, 1);
  overflow: hidden;
  color: white;
  @media all and (max-width: 768px) {
    display: none;
  }
`;

const StyledTypography = styled(Typography)`
  z-index: 99;
  position: absolute;
  top: 25%;
  text-align: center;
  max-width: 900px;
  left: 0;
  right: 0;
  font-weight: 800;
  margin-left: auto;
  margin-right: auto;
`;

export default function Hero(props) {
  const StyledHero = styled.div`
    height: ${(props) => props.theme.heroHeight};
    background-image: url('${props.bgImage}');
    opacity: ${(props) => props.theme.headerOpacity || 0.65};

    /* animation-name: ${breatheAnimation}; */
    animation-iteration-count: infinite;
    animation-duration: 20s;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: repeat;
    background-position: center -400px;
    transform: scale(1.2);
    /* position: inherit; */
    text-align: center;
    margin: -5px -10px -10px -5px;
    z-index: 99;

    filter: blur(${props.blur}px);
    ::after {
      background-color: black;
      filter: blur(0px);
      position: absolute;
    }
  `;

  return (
    <HeroHolder>
      <StyledHero></StyledHero>
      <StyledTypography variant="h2">
        {props.title} <br />
      </StyledTypography>
      {!props.hasStarted ? (
        <Counter hasStarted={props.hasStarted} start={props.start} />
      ) : (
        ''
      )}
    </HeroHolder>
  );
}
