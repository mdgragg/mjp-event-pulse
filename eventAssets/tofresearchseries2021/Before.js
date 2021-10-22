import React from 'react';
import PropTypes from 'prop-types';
import styled, {ThemeContext} from 'styled-components';
import { BoxedCounter, Counter__JustNumbers } from 'components/Counters';
import { useContext } from 'react';

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
const Before = ({ src, main_event }) => {
  const theme = useContext(ThemeContext)
  return (
    <Wrap>
      <Inner>
        <img src={src} alt="logo" />
        <div className="counter counter1">
          <BoxedCounter event={main_event} prefix={`Join Us Live In:`}  styles={{textColor: theme.palette.text.secondary, titleColor: theme.palette.text.primary}}/>
        </div>
        <div className="counter counter2">
          <Counter__JustNumbers event={main_event} />
        </div>
      </Inner>
    </Wrap>
  );
};

Before.propTypes = {};

export default Before;
