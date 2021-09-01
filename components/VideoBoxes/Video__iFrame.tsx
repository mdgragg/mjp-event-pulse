import styled, { ThemeContext } from 'styled-components';
import { useState, useEffect, useRef, useContext } from 'react';
import {
  StyledIFrame,
  StyledPaper,
  StyledVideoBox,
  StyledVideoPlaceholder__Wrap,
} from './VideoBox__Styles';

type VideoBox__Props = {
  src: string;
};
const VideoBox = ({ src }: VideoBox__Props) => {
  const wrapperRef = useRef();
  return (
    <StyledVideoBox>
      <StyledIFrame
        src={src}
        // frameborder="0"
        webkitallowfullscreen={true}
        mozallowfullscreen={true}
        allow="fullscreen"
        allowfullscreen
        controls="false"
      />
    </StyledVideoBox>
  );
};

export default VideoBox;
