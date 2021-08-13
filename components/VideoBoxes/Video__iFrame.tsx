import styled, { ThemeContext } from 'styled-components';
import { useState, useEffect, useRef, useContext } from 'react';
import {
  StyledIFrame,
  StyledPaper,
  StyledVideoPlaceholder__Wrap,
} from './VideoBox__Styles';

const VideoBox = (props) => {
  const [vidShow, setVidShow] = useState(true);
  const wrapperRef = useRef();
  return (
    <StyledVideoPlaceholder__Wrap ref={wrapperRef}>
      <StyledPaper>
        <FilterVideo vidShow={vidShow} src={props.src} />
      </StyledPaper>
    </StyledVideoPlaceholder__Wrap>
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
