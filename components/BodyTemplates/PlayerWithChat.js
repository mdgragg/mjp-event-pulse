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
`;

const ChatBox = styled.div`
  height: 100%;
  min-height: 550px;
`;

const PlayerWithChat = ({ videoUrl, chatUrl }) => {
  return (
    <BodyWrap>
      <VideoBox>
        <div className="video-holder">
          <VideoBox__StickyTop src={videoUrl}></VideoBox__StickyTop>
        </div>
      </VideoBox>
      <ChatBox>
        <Fluid__iFrame src={videoUrl}></Fluid__iFrame>
      </ChatBox>
    </BodyWrap>
  );
};

export default PlayerWithChat;
