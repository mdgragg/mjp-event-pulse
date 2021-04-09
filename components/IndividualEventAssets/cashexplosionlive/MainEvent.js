import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
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
`;

const ShowWrap = styled.div`
  position: relative;
  /* min-height: 80vh; */
  width: 90%;
  display: grid;
  margin: 2rem auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  grid-template-rows: 100%;
  justify-content: center;
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

        <PublicChat slug={main_event.slug} />
      </ShowWrap>
    </>
  );
};

export default MainEvent;
