import React from 'react';
import styled from 'styled-components';
import Video__StickyTop__WithCoundown from '../../VideoBoxes/Video__StickyTop__WithCountdown';
import Chat__iFrame from '../../iFrames/Chat__iFrame';
import Total from './Total';
import Counter__JustNumbers from '../../Counters/Counter__JustNumbers';
import LeaderBoards from './LeaderBoards';
const TheBody = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  padding: 3rem 1rem;
  background-color: ${(props) => props.theme.green};
  background-size: 100% 100%;
  background-image: url('https://storage.googleapis.com/mjp-stream-public/house-of-mercy-game-show-gala/Green%20Dot%20Pattern.png');
  color: white;
  /* min-height: 100vh; */
  && > div {
    margin: 0 1rem;
  }
  && .donate-area {
    margin: 3rem auto;
  }
  && .about-buttons {
    max-width: 550px;
    margin: 2rem auto;
    justify-content: space-around;
    display: flex;
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 100%;
  }
`;

const VideoBox = styled.div``;

const StyledVideoBox = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  && > div.placeholder {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  && .counter,
  && .counter p {
    color: ${(props) => props.theme.green};
    font-size: 1.5rem;
    font-weight: 800;
    text-align: center;
    font-family: Avenir;
  }
  && .counter img {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    && .counter img {
      width: 60px;
    }
    && .counter p {
      font-size: 0.75rem;
    }
  }
`;

const GameShow__Body = ({ src, chatSrc, start, data, imgSrc }) => {
  return (
    <TheBody>
      <div>
        <VideoBox>
          <Video__StickyTop__WithCoundown
            src={src}
            showMinutesBefore={60}
            start={start}
            hasStarted={true}
            showBefore={
              <StyledVideoBox>
                <div className="placeholder">
                  <div className="counter">
                    <img src={imgSrc}></img>
                    <p>
                      Join us here LIVE in <br />{' '}
                      <Counter__JustNumbers start={start} />
                    </p>
                  </div>
                </div>
              </StyledVideoBox>
            }
          />
        </VideoBox>
        <div className="about-buttons">
          <a href="#about">
            <button>About</button>
          </a>
          <a href="#about">
            <button>Bidding Help</button>
          </a>
        </div>

        {/* <LeaderBoards data={data} /> */}
      </div>
      <div>
        <div className="donate-area">
          <button className="donate">Donate Now</button>
        </div>
        <div style={{ minHeight: '650px', margin: 'auto' }}>
          <Chat__iFrame src={chatSrc} iFrameStyle={{ padding: '1rem' }} />
        </div>
      </div>
    </TheBody>
  );
};

export default GameShow__Body;
