import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BoxedCounter } from 'components/Counters';

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

  && img {
    width: auto;
    height: 50%;
    max-height: 320px;
  }
  && .counter {
    max-width: 500px;
    margin: auto;
  }
  @media all and (max-width: 768px) {
    && img {
      display: none;
    }
    width: 60%;
    height: min-content;
  }
`;
const Before = ({ src, main_event }) => {
  return (
    <Wrap>
      <Inner>
        <img src={src} alt="logo" />
        <div className="counter">
          <BoxedCounter event={main_event} prefix={`Join Us Live In:`} />
        </div>
      </Inner>
    </Wrap>
  );
};

Before.propTypes = {};

export default Before;
