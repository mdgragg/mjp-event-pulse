import React, { useState } from 'react';
import styled from 'styled-components';
import { useCalculateIfStarted } from 'hooks';

import { DateParse } from 'components/assets';
import { Button__Big } from 'components/Buttons';
import { CircleCounter } from 'components/Counters';
import ExternalLink from 'components/Modals/ExternalLink';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
const BG = styled.div`
  background-image: url('${(props) => props.theme.header_image}');
  background-color: ${(props) => props.theme.colors.primary};
  height: 100vh;
  padding: 2rem 0;
  min-height: 1080px;
  width: 100%;
  background-repeat: repeat-y;
  position: relative;
  background-size: 100% auto;
  @media all and (max-width: 768px) {
    background-size: cover;
  }
`;

const Header = styled.div`
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 768px) {
    /* height: auto; */
    margin: 2rem auto;
  }
`;
const Inner = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  && .date {
    font-size: 1rem;
    color: white;
    text-align: center;
    font-family: Futura Bold;
    line-height: 2rem;
  }
  && .title > h2 {
    background-color: white;
    color: ${(props) => props.theme.colors.primary};
    font-size: 2rem;
    font-family: 'Futura Bold';
    padding: 1.5rem;
    text-align: center;
    width: max-content;
    margin: auto;
  }
  && .logo-holder {
    width: 50%;
    min-width: 200px;
    height: 100%;
    margin: 1rem auto;
    text-align: center;
    justify-self: end;
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    /* row-gap: 1rem; */
    && .title > h2 {
      font-size: 1.5rem;
      padding: 1rem;
      width: auto;
    }
    && .date {
      grid-row: -1;
    }
    && .title {
      grid-row: 2;
    }
    && .logo-holder {
      width: 60%;
      max-width: 350px;

      grid-row: 1;
      justify-self: center;
    }
  }
`;

const PlayerBody = styled.div`
  min-height: 500px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  && h2 {
    font-size: clamp(3rem, 3vw, 10vw);
    color: white;
    font-family: Futura Bold;
  }
  @media all and (max-width: 1200px) {
    max-width: 768px;
  }
  @media all and (max-width: 768px) {
    max-width: 95%;
    margin-top: 3rem;
    min-height: auto;
  }
`;
const MainPage = ({ main_event, hasAuth }) => {
  const hasStartEnd = useCalculateIfStarted(main_event);

  return (
    <BG>
      <Header>
        <Inner>
          <div className="date"></div>
          <div className="title">
            <h2>{main_event.EventName}</h2>
            <div className="date" style={{ margin: '2rem' }}>
              <i>
                <DateParse
                  date={main_event.eventStartEnd.StartDateTime}
                  format={`dddd, MMMM D, YYYY`}
                ></DateParse>
              </i>
            </div>
          </div>
          <div className="logo-holder">
            <img
              src={`https://storage.googleapis.com/mjp-stream-public/biglots/BL_Stacked_Logo-01.png`}
              alt="Big Lots logo stacked"
            />
          </div>
        </Inner>
      </Header>

      <PlayerBody>
        {true && (
          <Video__StickyTop__WithCountdown
            isStarted={true}
            start={main_event.eventStartEnd.StartDateTime}
            showMinutesBefore={30}
            showBefore={
              <div>
                <h2>Join Us Live In</h2>
                <CircleCounter
                  event={main_event}
                  style={{ margin: '1rem auto' }}
                />
              </div>
            }
            src={main_event.streamLinks[0].url}
          />
        )}
      </PlayerBody>
    </BG>
  );
};

export default MainPage;
