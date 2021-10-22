import React, { useContext } from 'react';
import CircleCounter from '../Counters/CircleCounter';
import DateParse from '../__Assets__/DateParse';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
const HeroWrap = styled.div`
  min-height: 550px;
  position: relative;
`;
const HeroContent = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  && .inner {
    display: grid;
    grid-template-rows: auto 200px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
const BGImage = styled.div`
  position: fixed;
  top: 0;
  height: 550px;
  width: 100%;
  z-index: 0;
  background-image: url('${(props) => props.theme.header_image}');
`;
const MJHero = ({ main_event }) => {
  return (
    <HeroWrap>
      <BGImage />
      <HeroContent>
        <div className="inner">
          <div>
            <h1>{main_event.EventName}</h1>
            <span style={{ color: 'white' }}>
              <DateParse date={main_event.eventStartEnd.StartDateTime} />
            </span>
          </div>
          <div style={{ margin: '2rem auto' }}>
            <CircleCounter event={main_event} />
          </div>
        </div>
      </HeroContent>
    </HeroWrap>
  );
};

export default MJHero;
