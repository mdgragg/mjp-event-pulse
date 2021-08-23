import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from 'components/Counters/Counter';
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const HeroHolder = styled.div`
  position: relative;
  width: 100%;
  min-height: ${(props) => props.theme.heroHeight || '30vh'};
  background-color: ${(props) => props.theme.heroBgColor};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  && > div {
    text-align: center;
  }
  && ::before {
    height: 100%;
    width: 100%;
    content: '';
    top: 0;
    position: absolute;
    background-image: url(${(props) =>
      props.header_image || props.theme.header_image || 'none'});
    opacity: ${(props) => props.theme.headerOpacity || 1};
    background-attachment: inherit;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  @media all and (max-width: 1200px) {
    height: min-content;
    padding: 2% 0;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  vertical-align: center;
  display: grid;
  grid-template-columns: ${(props) => props.columns || '20% 60% 20%'};
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 90%;
  height: inherit;
  && img {
    width: 100%;
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 100%;
    row-gap: 1rem;
    margin: 0 auto;
    && img {
      width: 50%;
      margin: 0 auto;
    }
  }
`;

export default function Hero(props) {
  return (
    <HeroHolder bgImage={props.bgImage} style={{ ...props.style }}>
      <HeaderInner className="header--inner" columns={props.columns}>
        {props.children}
      </HeaderInner>
    </HeroHolder>
  );
}
