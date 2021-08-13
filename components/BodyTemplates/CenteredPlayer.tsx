import React from 'react';
import styled from 'styled-components';
import VideoBox__StickyTop from '../VideoBoxes/Video__StickyTop';
import Fluid__iFrame from '../iFrames/Fluid__iFrame';
const BodyWrap = styled.div`
  min-height: 50vh;
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
  margin: auto;
  background-color: none;
  z-index: 2;
`;

type CenteredPlayer__Props = {
  videoUrl: string;
  showing?: boolean;
  hasStarted: boolean;
  style?: {};
};
const CenteredPlayer = ({
  videoUrl,
  showing = true,
  hasStarted,
  style = {},
}: CenteredPlayer__Props) => {
  return (
    <>
      <BodyWrap style={{ ...style }}>
        <VideoBox>
          <div className="video-holder">
            {showing && (
              <VideoBox__StickyTop
                src={videoUrl}
                isStarted={hasStarted}
              ></VideoBox__StickyTop>
            )}
          </div>
        </VideoBox>
      </BodyWrap>
    </>
  );
};

export default CenteredPlayer;
