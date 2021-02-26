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

export default function Hero(props) {
  const { theme } = props;

  return (
    <HeroHolder bgImage={props.bgImage}>
      <HeaderInner className="header--inner ">
        <img className="inner-image" src={props.imgSrc} />
        {!props.hasStarted ? (
          <div className="counter-with-image">
            <Counter hasStarted={props.hasStarted} start={props.start} />
          </div>
        ) : (
          ''
        )}
        {props.children}
      </HeaderInner>
    </HeroHolder>
  );
}
