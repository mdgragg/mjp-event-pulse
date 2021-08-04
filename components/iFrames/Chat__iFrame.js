import React from 'react';
import styled from 'styled-components';

const FrameWrap = styled.div`
  position: relative;
  height: 100%;
  min-height: 625px;
  background-color: white;
  width: 100%;
  max-width: 450px;
  margin: auto;
  && iframe {
    padding: 0 1rem;
    height: 100%;
    width: 100%;
    min-height: inherit;
  }
`;
const Chat__iFrame = ({ src = '/', options }) => {
  return (
    <FrameWrap>
      <iframe src={src} frameBorder="0"></iframe>
    </FrameWrap>
  );
};

export default Chat__iFrame;
