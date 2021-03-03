import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from 'components/Counters/Counter';
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const scroll = keyframes`
0% { transform: translateY(1%) }

100% {transform: translateY(-80%) }
`;

const ScrollerHolder = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 2rem;
  color: #181818;
  text-align: center;
  margin: 0 auto 1rem auto;
`;

const ScrollerInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation-name: ${scroll};
  color: black;
  animation-duration: ${(props) => props.length}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  z-index: 100;
`;
export default function NameScroller({ children, length, title = 'Title' }) {
  return (
    <>
      <Title>{title}</Title>
      <ScrollerHolder>
        <ScrollerInner length={length}> {children}</ScrollerInner>
      </ScrollerHolder>
    </>
  );
}
