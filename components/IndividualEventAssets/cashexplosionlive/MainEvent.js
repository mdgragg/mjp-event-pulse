import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import PublicChat from 'components/Chat/PublicChat';
import Counter from 'components/Counters/Counter';
const Nav = styled.div`
  position: relative;
  top: 0;

  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 220px;
  padding: 2.5rem;
  && .logo {
    max-height: 150px;
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
    grid-template-rows: auto 680px;
    gap: 2rem;
    && .crowd-purr {
      width: 100%;
      max-width: 450px;
      margin: auto;
      height: 100%;
    }
  }
`;

const MainEvent = ({ main_event }) => {
  return (
    <>
      <Nav>
        <img
          src={main_event.KeyValue.find((kv) => kv.key === 'logo').value}
          className="logo"
        />
        <Counter
          start={main_event.eventStartEnd.StartDateTime}
          fontSize={`1rem`}
          shadow={`none`}
          hasStarted={true}
          afterStarted={
            <h2
              style={{
                backgroundColor: '#ff5ef4',
                color: 'white',
                fontSize: '2.5rem',
                padding: '8px 30px',
              }}
            >
              LIVE!
            </h2>
          }
        />
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
