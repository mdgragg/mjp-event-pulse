import React, { JSXElementConstructor } from 'react';
import styled from 'styled-components';

const FrameWrap = styled.div`
  position: relative;
  height: 100%;
  min-height: ${(props) => props?.minHeight || 'inherit'};
  width: 100%;
  && iframe {
    height: 100%;
    width: 100%;
    min-height: inherit;
  }
`;

type Fluid__IFrame__Props = {
  src: string;
  minHeight?: string;
  iFrameStyle?: {};
};
const Fluid__iFrame = ({
  src = '/',
  minHeight,
  iFrameStyle,
}: Fluid__IFrame__Props) => {
  return (
    <FrameWrap minHeight={minHeight}>
      <iframe src={src} frameBorder="0" style={{ ...iFrameStyle }}></iframe>
    </FrameWrap>
  );
};

export default Fluid__iFrame;
