import React from 'react';
import styled from 'styled-components';
import Video__StickyTop__WithCoundown from '../../VideoBoxes/Video__StickyTop__WithCountdown';
import Chat__iFrame from '../../iFrames/Chat__iFrame';
import Total from './Total';
import LeaderBoards from './LeaderBoards';
const TheBody = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  padding: 2rem 1rem;
  background-color: ${(props) => props.theme.green};
  color: white;
  min-height: 100vh;
  && > div {
    margin: 0 1rem;
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
    background-color: black;
  }
  @media (max-width: 768px) {
    width: 100%;

    border-radius: 0;
  }
`;

const GameShow__Body = ({ src, chatSrc, start, data }) => {
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
                {' '}
                <div className="placeholder"></div>
              </StyledVideoBox>
            }
          />
        </VideoBox>
        <LeaderBoards data={data} />
      </div>
      <div>
        {/* <Total data={data} /> */}
        <div>
          <button>Donate Now</button>
        </div>

        <div style={{ minHeight: '650px', margin: 'auto' }}>
          <Chat__iFrame src={chatSrc} iFrameStyle={{ padding: '1rem' }} />
        </div>
      </div>
    </TheBody>
  );
};

export default GameShow__Body;
