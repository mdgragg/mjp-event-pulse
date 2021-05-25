import React from 'react';
import styled from 'styled-components';
import VideoBox__StickyTop from '../VideoBoxes/Video__StickyTop';
import Fluid__iFrame from '../iFrames/Fluid__iFrame';
const BodyWrap = styled.div`
  min-height: 50vh;
  background-color: unset;
`;
const VideoBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  margin: auto;
  background-color: none;
`;

const ChatBox = styled.div`
  height: 100%;
  min-height: 550px;
`;

const CenteredPlayer = ({ videoUrl, showing = true }) => {
  return (
    <BodyWrap>
      <VideoBox>
        <div className="video-holder">
          {showing && (
            <VideoBox__StickyTop src={videoUrl}></VideoBox__StickyTop>
          )}
        </div>
      </VideoBox>
    </BodyWrap>
  );
};

export default CenteredPlayer;
