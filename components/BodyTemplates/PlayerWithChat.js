import React from 'react';
import styled from 'styled-components';
import VideoBox__StickyTop from '../VideoBoxes/Video__StickyTop';
import Fluid__iFrame from '../iFrames/Fluid__iFrame';
const BodyWrap = styled.div`
  min-height: 50vh;
  display: grid;
  grid-template-columns: 8fr 4fr;

  gap: 2rem;
  @media all and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
const VideoBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  && .children {
    margin-top: 2rem;
  }
`;

const ChatBox = styled.div`
  height: 100%;
  min-height: 550px;
  max-width: 450px;
  border: 2px solid rgba(203, 203, 203, 0.35);
  @media all and (max-width: 1000px) {
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
  }
`;

const PlayerWithChat = ({ videoUrl, chatUrl, hasStarted, children }) => {
  return (
    <BodyWrap>
      <VideoBox>
        <div className="video-holder">
          <VideoBox__StickyTop
            isStarted={hasStarted}
            src={videoUrl}
          ></VideoBox__StickyTop>
        </div>
        <div className="children">{children}</div>
      </VideoBox>
      <ChatBox>
        <Fluid__iFrame src={chatUrl}></Fluid__iFrame>
      </ChatBox>
    </BodyWrap>
  );
};

export default PlayerWithChat;
