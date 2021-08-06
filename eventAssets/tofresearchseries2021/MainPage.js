import styled from 'styled-components';
import React, { useState } from 'react';
import { SolidColorHero } from 'components/Heroes';
import { Section } from 'components/Sections';
import DateParse from 'components/assets/DateParse';
import SponsorMap from './SponsorMap';
import Before from './Before';
import LoadingImage from 'components/Loading/LoadingImage';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import Agenda from './Agenda';
const Wrap = styled.div`
  width: 95%;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 66% 34%;
  text-align: center;
  gap: 2rem;
  && .agenda__wrap {
    width: auto;
    box-shadow: var(--mjp-shadow);
    background-color: white;
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const PlayerBody = styled.div`
  align-self: start;
  width: 100%;
  min-height: 500px;
  max-width: 1200px;
  margin: 5rem auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;

  @media all and (max-width: 1200px) {
    max-width: 768px;
  }
  @media all and (max-width: 768px) {
    max-width: 95%;
    margin-top: 3rem;
    min-height: auto;
  }
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 3rem auto;
  background-color: white;
  max-width: 600px;
  margin: auto;
  color: ${(props) => props.theme.colors.tertiary};
  && img {
    width: 80%;
    margin: auto;
  }
  && h1 {
    max-width: 400px;
  }
  && .date {
    margin-top: 1.5rem;
  }
`;

const MainPage = ({ main_event }) => {
  return (
    <>
      <SolidColorHero>
        <HeroInner>
          <img src={main_event?.HeaderImage?.url} />
          <h1>{main_event.EventName}</h1>
          <div className="date">
            <strong>Next Showing: </strong>
            <DateParse date={main_event.eventStartEnd.StartDateTime} />
          </div>
        </HeroInner>
      </SolidColorHero>
      <Wrap>
        <PlayerBody>
          <Video__StickyTop__WithCountdown
            isStarted={true}
            start={main_event.eventStartEnd.StartDateTime}
            showMinutesBefore={30}
            showBefore={
              <Before
                src={main_event?.HeaderImage?.url}
                main_event={main_event}
              />
            }
            src={main_event.streamLinks[0].url}
          />
        </PlayerBody>
        <div className="agenda__wrap">
          <h2>Agenda</h2>
          <Agenda />
        </div>
      </Wrap>

      <Section>
        <SponsorMap eventId={main_event.id} />
      </Section>
    </>
  );
};

export default MainPage;
