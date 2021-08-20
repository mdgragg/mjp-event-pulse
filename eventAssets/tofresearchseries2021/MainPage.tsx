import styled from 'styled-components';
import React, { useState } from 'react';
import { SolidColorHero } from 'components/Heroes';
import { Section } from 'components/Sections';
import DateParse from 'components/__Assets__/DateParse';
import SponsorMap from './SponsorMap';
import Before from './Before';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import Agenda from './Agenda';
const Wrap = styled.div`
  width: 95%;
  margin: 3rem auto;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 66% 34%;
  text-align: center;
  gap: 1rem;
  && .agenda__wrap {
    max-width: 550px;
    min-height: 600px;
    width: 100%;
    box-shadow: var(--mjp-shadow);
    background-color: white;
    justify-self: start;
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 100%;
    && .agenda__wrap {
      max-width: 768px;
      margin: auto;
      margin-top: 1rem;
    }
  }
`;

const PlayerBody = styled.div`
  align-self: start;
  width: 100%;
  /* min-height: 500px; */
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-around;

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
          <LinkBox__StickyTop__WithCountdown
            start={main_event.eventStartEnd.StartDateTime}
            offset={10}
            link={{
              href: main_event.streamLinks[0].url,
              allowed: true,
              errorText: 'Hello World!',
            }}
            prefix={<h2 style={{ fontSize: '2rem' }}>Join the Zoom Webinar</h2>}
            showBefore={
              <Before
                src={main_event?.HeaderImage?.url}
                main_event={main_event}
              />
            }
          />
        </PlayerBody>
        <div className="agenda__wrap">
          <Agenda initialTab={1} />
        </div>
      </Wrap>

      <Section>
        <SponsorMap eventId={main_event.id} />
      </Section>
    </>
  );
};

export default MainPage;
