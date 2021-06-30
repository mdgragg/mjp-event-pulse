import React from 'react';
import styled from 'styled-components';
import Video__StickyTop__WithCoundown from '../../VideoBoxes/Video__StickyTop__WithCountdown';
import Chat__iFrame from '../../iFrames/Chat__iFrame';
import Total from './Total';
import Counter__JustNumbers from '../../Counters/Counter__JustNumbers';
import LeaderBoards from './LeaderBoards';
import NameList from './NameList';
const TheBody = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  padding: 3rem 1rem;
  background-color: #f8991b;
  background-image: radial-gradient(#ef7e22 25%, transparent 26%),
    radial-gradient(#ef7e22 10%, transparent 11%);
  background-size: 20px 20px;
  background-position: 0 0, 0px 0px;
  background-repeat: repeat;
  color: white;
  /* min-height: 100vh; */
  && > div {
    margin: 0 1rem;
  }
  && .donate-area {
    margin: 0 auto 2rem auto;
  }
  && .about-buttons {
    max-width: 550px;
    margin: 2rem auto;
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
  }
  @media all and (max-width: 1000px) {
    padding: 1rem 0.5rem;
    grid-template-columns: 100%;
    && > div {
      margin: 0 0.25rem;
    }
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

const GameShow__Body = ({
  src,
  chatSrc,
  start,
  imgSrc,
  realtimeSrc,
  showVid,
}) => {
  return (
    <TheBody>
      <div>
        <VideoBox>
          {showVid ? (
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
          ) : (
            <div style={{ height: '500px', backgroundColor: 'black' }}>
              <div className="placeholder">
                Video Not Showing so as to not interfere with program
                audio/bandwidth
              </div>
            </div>
          )}
        </VideoBox>
        <div className="about-buttons">
          <a href="#about">
            <button className="btn">About</button>
          </a>
          <a
            href="https://www.mercyone.org/desmoinesfoundation/news/2021-game-show-gala-giving-instructions"
            target="_blank"
          >
            <button className="btn">Donation Help</button>
          </a>
        </div>
        <NameList url={realtimeSrc} />
      </div>
      <div>
        <div className="donate-area">
          <a
            href="https://gameshowgala2021.ggo.bid/bidding/package-browse"
            target="_blank"
          >
            <button className="btn donate">Donate Now</button>
          </a>
        </div>
        <div style={{ minHeight: '650px', margin: 'auto' }}>
          <Chat__iFrame src={chatSrc} iFrameStyle={{ padding: '1rem' }} />
        </div>
      </div>
    </TheBody>
  );
};

export default GameShow__Body;
