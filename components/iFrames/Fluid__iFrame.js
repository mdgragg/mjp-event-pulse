import React from 'react';
import styled from 'styled-components';

const FrameWrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  && iframe {
    height: 100%;
    width: 100%;
  }
`;
const Fluid__iFrame = ({ src = '/', options }) => {
  return (
    <FrameWrap>
      <iframe src={src} frameborder="0"></iframe>
    </FrameWrap>
  );
};

export default Fluid__iFrame;
