import React, { useState } from 'react';
import styled from 'styled-components';
import { useCalculateIfStarted } from 'hooks';

import { DateParse } from 'components/__Assets__';
import Before from 'components/LinkBoxes/Before';
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
    padding: 0.5rem 0;
    padding-bottom: 50%;
    background-size: cover;
    height: auto;
    min-height: unset;
  }
`;

const Header = styled.div`
  min-height: 250px;
  @media all and (max-width: 768px) {
    /* height: auto; */
    margin: 1rem auto;
  }
`;
const Inner = styled.div`
  width: 95%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  && .date {
    font-size: 1rem;
    color: white;
    text-align: center;
    font-family: Futura Bold;
    line-height: 2rem;
    margin: 1rem;
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
    margin-bottom: 1rem;
  }
  && .title > h3 {
    font-size: 1.5rem;
    color: white;
    text-align: center;
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
    padding: 0;
    grid-template-columns: 100%;
    grid-template-rows: repeat(3, min-content);
    && .title > h2 {
      font-size: 1.25rem;
      padding: 0.5rem;
      margin: 0;
      margin-bottom: 1rem;
      width: auto;
    }
    && .title > h3 {
      font-size: 1.25rem;
    }

    && .date {
      grid-row: -1;
      font-size: 0.85rem;
    }
    && .title {
      grid-row: 2;
    }
    && .logo-holder {
      width: 50%;
      margin: 0;
      max-width: 250px;
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
            <h3> Bigger Together: Grow With Us </h3>
            <div className="date">
              <DateParse
                date={main_event.eventStartEnd.StartDateTime}
                format={`dddd, MMMM DD`}
              ></DateParse>{' '}
              at 1:00 PM EST
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
            showMinutesBefore={1}
            showBefore={
              <Before
                imgSrc={main_event?.LogoLink[1]?.Media.url}
                main_event={main_event}
              />
            }
            src={main_event.streamLinks[0].url}
          />
        )}
      </PlayerBody>
    </BG>
  );
};

export default MainPage;
