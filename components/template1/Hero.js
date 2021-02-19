import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from './Counter';
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
  height: ${(props) => props.theme.heroHeight};
  background-color: white;
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
    background-image: url('${(props) => props.theme.bgImage || props.bgImage}');
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }
`;

const StyledTypography = styled(Typography)`
  z-index: 2;
  position: absolute;
  top: 25%;
  text-align: center;
  max-width: 900px;
  padding: 5px 15px;
  width: max-content;
  left: 0;
  right: 0;
  font-weight: 800;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.headerBgColor || 'none'};
  font-family: ${(props) => props.theme.headerFont};
`;

const StyledHero = styled.div`
  height: ${(props) => props.theme.heroHeight};
  /* background-image: url('${(props) => props.theme.bgImage}'); */
  opacity: ${(props) => props.theme.headerOpacity || 0.65};
  top: 0;
  margin-top: 80px;
  height: 100%;
  width: 100%;
  /* animation-name: ${breatheAnimation}; */
  animation-iteration-count: infinite;
  animation-duration: 40s;
  background-size: cover;

  background-position: center center;
  transform: scale(1.2);
  /* position: inherit; */
  text-align: center;
  margin: -5px -10px -10px -5px;
  z-index: 2;

  filter: blur(${(props) => props.blur || 0}px);
  /* ::after {
    background-color: black;
    filter: blur(0px);
    position: absolute;
    top: 0;
  } */
`;

export default function Hero(props) {
  const { theme } = props;

  return (
    <HeroHolder bgImage={props.bgImage}>
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
