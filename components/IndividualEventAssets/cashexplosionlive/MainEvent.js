import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import Counter from 'components/Counters/Counter';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import TwoPanel from 'components/TabPanels/TwoPanel';
const Nav = styled.div`
  position: relative;
  top: 0;
  width: 95%;
  display: grid;
  margin: 2rem auto 0 auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  height: 280px;
  padding: 0.5rem 1.5rem;
  && .logo {
    height: auto;
    max-height: 280px;
    width: auto;
  }

  @media all and (max-width: 1265px) {
    grid-template-columns: 50% 50%;
    padding: 1rem;
    height: 180px;
    && .logo {
      max-height: 180px;
      width: auto;
    }
  }

  @media all and (max-width: 880px) {
    margin: auto;

    align-items: center;
    justify-content: center;
  }
  @media all and (max-width: 550px) {
    grid-template-columns: 1fr;
    height: 220px;
  }
`;

const ShowWrap = styled.div`
  position: relative;
  width: 95%;
  display: grid;
  margin: 2rem auto 6rem auto;
  gap: 2%;
  grid-template-columns: 75% 25%;
  grid-template-rows: 100%;
  justify-content: center;
  align-items: stretch;
  && .chat {
    display: none;
  }
  && button.MuiTab-root {
    font-size: 1.5rem;
    font-family: ${(props) => props.theme.fontFamily};
  }
  /* prettier-ignore */
  && span.MuiTabs-indicator {
    background-color: ${(props) => props.theme.pink};
  }
  @media all and (max-width: 1265px) {
    grid-template-columns: 50% 50%;
    margin: 5% auto 20% auto;
    justify-content: center;
    grid-template-rows: min-content auto;
    gap: 10px;
    && .video {
      grid-column: 1/3;
      width: 100%;
      max-width: 900px;
      justify-self: center;
    }
    && .crowd-purr {
      grid-column: 1/3;
      grid-row: 2/3;
      width: 100%;
      max-width: 450px;
      margin: auto;
      height: 100%;
    }
    && .chat {
      /* grid-column: 2/3; */
      /* grid-row: 2/3; */
      width: 95%;
      max-width: 500px;
      margin: auto;
      display: block;
      height: 100%;
    }
  }
`;

const CountWrap = styled.div`
  background-color: ${(props) => props.theme.pink};
  color: white;
  font-family: House-Gothic;
  justify-self: center;
  align-self: center;
  text-align: center;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 2.5rem;
  letter-spacing: 4px;
  padding: 4px 30px;
  width: max-content;
  @media all and (max-width: 880px) {
    font-size: 1rem;
  }
`;

const CrowdPurr = styled.div`
  min-height: 1100px;
`;

const ChatWrap = styled.div`
  min-height: 80vh;
`;
const MainEvent = ({ main_event }) => {
  return (
    <>
      <Nav>
        <img
          src={main_event.LogoLink[0].Media.url}
          className="logo"
          alt="Cash Explosion Live Logo"
        />
        <CountWrap>Live Now!</CountWrap>
      </Nav>
      <ShowWrap>
        <div className="video">
          <Video__iFrame src={main_event.streamLinks[0].url} />
        </div>
        <div className="crowd-purr">
          <TwoPanel
            data={[
              {
                title: `${main_event.streamLinks[1].Service}`,
                content: (
                  <CrowdPurr>
                    <Fluid__iFrame src={main_event.streamLinks[1].url} />
                  </CrowdPurr>
                ),
              },
              {
                title: `${main_event.streamLinks[2].Service}`,
                content: (
                  <ChatWrap>
                    <Fluid__iFrame src={main_event.streamLinks[2].url} />{' '}
                  </ChatWrap>
                ),
              },
            ]}
          />
          {/* */}
        </div>
        {/* <div className="chat">
          <Fluid__iFrame src={main_event.streamLinks[2].url} />
        </div> */}
      </ShowWrap>
    </>
  );
};

export default MainEvent;
