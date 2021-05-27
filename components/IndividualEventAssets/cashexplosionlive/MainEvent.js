import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import Counter from 'components/Counters/Counter';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

const Nav = styled.div`
  position: relative;
  top: 0;

  width: 100%;
  width: 90%;
  display: grid;
  margin: 2rem auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  height: 220px;
  padding: 2.5rem;
  && .logo {
    max-height: 150px;
    width: auto;
  }
  @media all and (max-width: 768px) {
    padding: 2rem;
    height: 130px;
    && .logo {
      max-height: 80px;
    }
  }
`;

const ShowWrap = styled.div`
  position: relative;
  min-height: 700px;
  width: 90%;
  display: grid;
  margin: 2rem auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  grid-template-rows: 100%;
  justify-content: center;

  @media all and (max-width: 1200px) {
    grid-template-columns: 100%;
    grid-template-rows: min-content 680px;
    gap: 2rem;
    && .crowd-purr {
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
`;

const MainEvent = ({ main_event }) => {
  return (
    <>
      <Nav>
        <img
          src={main_event.KeyValue.find((kv) => kv.key === 'Logo').value}
          className="logo"
        />
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
        <Video__iFrame src={main_event.streamLinks[0].url} />
        <div className="crowd-purr">
          <Fluid__iFrame src={main_event.streamLinks[1].url} />
        </div>
      </ShowWrap>
    </>
  );
};

export default MainEvent;
