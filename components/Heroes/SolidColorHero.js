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
  min-height: ${(props) => props.theme.heroHeight || '400px'};
  background-color: ${(props) => props.theme.heroBgColor};
  overflow: hidden;
  padding: 3rem 0;
`;

export default function SolidColorHero({ children }) {
  return <HeroHolder>{children}</HeroHolder>;
}
