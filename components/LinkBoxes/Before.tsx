import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BoxedCounter, Counter__JustNumbers } from '../Counters';

const Wrap = styled.div`
  background-color: white;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Inner = styled.div`
  width: 70%;
  height: 70%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  && img {
    width: auto;
    height: 50%;
    max-height: 300px;
  }
  && .counter {
    max-width: 500px;
    margin: auto;
  }
  && .counter2 {
    display: none;
    font-weight: 800;
    color: ${(props) => props.theme.colors.tertiary};
  }
  @media all and (max-width: 768px) {
    && .counter1 {
      display: none;
    }
    && .counter2 {
      display: block;
    }
    width: 60%;
    height: 100%;
  }
`;

type Before__Props = {
  imgSrc: string;
  main_event: {};
  [x: string]: any;
};
const Before = ({ imgSrc, main_event, counterProps }: Before__Props) => {
  // test s
  return (
    <Wrap>
      <Inner>
        {imgSrc && <img src={imgSrc} alt="logo" />}
        <div className="counter counter1">
          <BoxedCounter
            event={main_event}
            prefix={`Join Us Live In:`}
            {...counterProps}
          />
        </div>
        <div className="counter counter2">
          <Counter__JustNumbers event={main_event} prefix={`Join Us Live In`} />
        </div>
      </Inner>
    </Wrap>
  );
};

Before.propTypes = {};

Before.defaultProps = {
  imgSrc: 'https://placehold.co/250x250',
};
export default Before;
