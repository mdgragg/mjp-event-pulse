import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import Counter from 'components/Counters/Counter';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

const Nav = styled.div`
  position: relative;
  top: 0;
  width: 95%;
  display: grid;
  margin: 2rem auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  height: 300px;
  padding: 0.5rem 2.5rem;
  && .logo {
    height: auto;
    max-height: 280px;
    width: auto;
  }

  @media all and (max-width: 1265px) {
    grid-template-columns: 50% 50%;
  }

  @media all and (max-width: 880px) {
    margin: auto;
    grid-template-columns: 80%;
    padding: 2rem;
    height: 100%;
    align-items: center;
    justify-content: center;
    && .logo {
      /* max-height: 180px; */
      height: auto;
      width: 95%;
    }
  }
  @media all and (max-width: 550px) {
    grid-template-columns: 100%;
  }
`;

const ShowWrap = styled.div`
  position: relative;
  min-height: 816px;
  width: 95%;
  display: grid;
  margin: 2rem auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  grid-template-rows: 100%;
  justify-content: center;

  @media all and (max-width: 1265px) {
    grid-template-columns: 50% 50%;
    margin: 5% auto;
    justify-content: center;
    grid-template-rows: min-content 880px;
    gap: 2rem;
    && .video {
      grid-column: 1/3;
    }
    && .crowd-purr {
      grid-row: 2/3;
      width: 100%;
      max-width: 450px;
      margin: auto;
      height: 100%;
    }
  }
`;

const CountWrap = styled.div`
  background-color: #ff5ef4;
  color: white;
  height: min-content;
  align-self: center;
  font-family: Avenir;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.25rem;
  letter-spacing: 3px;
  padding: 8px 30px;
  @media all and (max-width: 550px) {
    font-size: 1rem;
  }
`;

const MainEvent = ({ main_event }) => {
  return (
    <>
      <Nav>
        <img src={main_event.LogoLink[0].Media.url} className="logo" />

        <CountWrap>
          <Counter__JustNumbers
            start={main_event.eventStartEnd.StartDateTime}
            start={main_event.eventStartEnd.EndDateTime}
            afterStarted={'LIVE!'}
            afterEnded={
              <>
                Thanks for Attending!
                <br /> This event has ended.
              </>
            }
            prefix={'The Event Starts In'}
          />
        </CountWrap>
      </Nav>
      <ShowWrap>
        <div className="video">
          <Video__iFrame src={main_event.streamLinks[0].url} />
        </div>
        <div className="crowd-purr">
          <Fluid__iFrame src={main_event.streamLinks[1].url} />
        </div>
      </ShowWrap>
    </>
  );
};

export default MainEvent;
