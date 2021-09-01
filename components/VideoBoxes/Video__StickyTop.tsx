import styled, { ThemeContext } from 'styled-components';
import { useEffect, useMemo, useRef, useState, useContext } from 'react';
import {
  StyledIFrame,
  StyledVideoBox,
  StyledPaper,
  StyledStickyTopVideoPlaceholder,
} from './VideoBox__Styles';

const VideoBox__StickyTop = ({ src, isStarted }) => {
  const [video_src, set_src] = useState();

  const themeContext: any = useContext(ThemeContext);
  const offsetVideoHeight = themeContext.videoBreakPoint;

  const wrapperRef: any = useRef();

  useMemo(() => set_src(src), [src]);

  function calculateFixed(e) {
    if (window.pageYOffset >= offsetVideoHeight && offsetVideoHeight > 0) {
      wrapperRef?.current.classList.add('fixed');
    } else {
      wrapperRef?.current.classList.remove('fixed');
    }
  }
  useEffect(() => {
    console.log('video break point', offsetVideoHeight);
    if (isStarted) {
      window.addEventListener('scroll', calculateFixed, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', calculateFixed);
    };
  }, [isStarted]);

  return (
    <StyledStickyTopVideoPlaceholder ref={wrapperRef}>
      <StyledPaper>
        <StyledVideoBox>
          <StyledIFrame
            src={video_src}
            frameborder="0"
            allowfullscreen
            webkitallowfullscreen={true}
            mozallowfullscreen={true}
            allow="fullscreen"
            showControls
          />
        </StyledVideoBox>
      </StyledPaper>
    </StyledStickyTopVideoPlaceholder>
  );
};

export default VideoBox__StickyTop;
