import React from 'react';
import styled from 'styled-components';
import VideoBox__StickyTop from '../VideoBoxes/Video__StickyTop';
import Fluid__iFrame from '../iFrames/Fluid__iFrame';
const BodyWrap = styled.div`
  min-height: calc(100vh - ${(props) => props.theme.heroHeight}px);
  background-color: unset;
  position: relative;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const BG = styled.div`
  background-image: url(${(props) => props.src});
  background-size: 100% auto;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;
const VideoBox = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  width: 100%;
  margin: auto;
  background-color: none;
  z-index: 2;
  @media all and (max-width: 1300px) {
    justify-content: flex-start;
    width: 96%;
    height: auto;
  }
`;

type CenteredPlayer__Props = {
  videoUrl: string;
  showing?: boolean;
  hasStarted: boolean;
  style?: {};
  videoComponent: React.ReactNodes;
};
const CenteredPlayer = ({
  videoUrl,
  showing = true,
  hasStarted,
  style = {},
  videoComponent,
}: CenteredPlayer__Props) => {
  return (
    <>
      <BodyWrap style={{ ...style }}>
        <VideoBox>
          <div className="video-holder">
            {showing &&
              (videoComponent ? (
                videoComponent
              ) : (
                <VideoBox__StickyTop
                  src={videoUrl}
                  isStarted={hasStarted}
                ></VideoBox__StickyTop>
              ))}
          </div>
        </VideoBox>
      </BodyWrap>
    </>
  );
};

export default CenteredPlayer;
