import styled, { ThemeContext } from 'styled-components';
import { useState, useEffect, useRef, useContext } from 'react';
import { StyledVideoBox, StyledIFrame, StyledPaper } from './VideoBox__Styles';

const VideoBox = (props) => {
  const [vidShow, setVidShow] = useState(true);
  const wrapperRef = useRef();
  return (
    <VideoPlaceholder ref={wrapperRef}>
      <StyledPaper>
        <StyledVideoBox>
          <FilterVideo vidShow={vidShow} src={props.src} />
        </StyledVideoBox>
      </StyledPaper>
    </VideoPlaceholder>
  );
};

const FilterVideo = (props) => {
  return (
    <StyledIFrame
      src={props.src}
      // frameborder="0"
      webkitallowfullscreen={true}
      mozallowfullscreen={true}
      allow="fullscreen"
      allowfullscreen
      controls="false"
    />
  );
};

export default VideoBox;
