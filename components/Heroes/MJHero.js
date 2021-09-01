import React, { useContext } from 'react';
import CircleCounter from '../Counters/CircleCounter';
import DateParse from '../__Assets__/DateParse';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
const Hero = styled.div`
  min-height: 550px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 4rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  && .inner {
    text-align: center;
  }
`;

const BGImage = styled.img`
  position: fixed;
  height: auto;
  width: 100%;
  z-index: -1;
`;
const MJHero = ({ main_event }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Hero>
      <div className="inner">
        <h1>{main_event.EventName}</h1>
        <span style={{ color: 'white' }}>
          {' '}
          <DateParse date={main_event.eventStartEnd.StartDateTime} />
        </span>
        <div style={{ margin: '3rem auto' }}>
          <CircleCounter event={main_event} />
        </div>
      </div>
      <BGImage src={themeContext.header_image} />
    </Hero>
  );
};

export default MJHero;
