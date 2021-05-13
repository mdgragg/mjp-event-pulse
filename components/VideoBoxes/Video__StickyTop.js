import styled, { ThemeContext } from 'styled-components';
import { useEffect, useMemo, useRef, useState } from 'react';

const VideoPlaceholder = styled.div`
  /* height: inherit; */
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &&.fixed {
    height: auto;
    padding-top: 56.25%; /* 16:9 */
    display: block;
  }

  &&.fixed > div {
    position: fixed;
    top: 2%;
    left: 2%;
    width: 350px;
    height: auto;
    z-index: 100;
    padding: 0;
    border-radius: 0;
    /* &&.fixed > div {
      height: 200px;
    } */
  }
`;

const StyledPaper = styled.div`
  min-width: inherit;
  padding: 0;
  border: none;
  border-radius: 0;

  &&.fixed {
    position: fixed;
    top: 2%;
    left: 2%;
    width: 350px;
    height: auto;
    z-index: 100;
    padding: 0;
    border-radius: 0;
    /* &&.fixed > div {
      height: 200px;
    } */
  }

  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: none;
    margin: -1px -1px -1px -1px;
  }
`;

const CustomFrame = styled.iframe`
  border: none;
`;

const StyledVideoBox = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  && > iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const VideoBox__StickyTop = ({ src, isStarted }) => {
  const [video_src, set_src] = useState();

  const themeContext = React.useContext(ThemeContext);
  const offsetVideoHeight = themeContext.videoBreakPoint;

  const wrapperRef = useRef();

  useMemo(() => set_src(src), [src]);

  function calculateFixed(e) {
    if (window.pageYOffset >= offsetVideoHeight) {
      wrapperRef.current.classList.add('fixed');
    } else {
      wrapperRef.current.classList.remove('fixed');
    }
  }
  useEffect(() => {
    console.log('remount');
    if (isStarted) {
      window.addEventListener('scroll', calculateFixed, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', calculateFixed);
    };
  }, []);

  return (
    <VideoPlaceholder ref={wrapperRef}>
      <StyledPaper>
        <StyledVideoBox>
          <CustomFrame
            src={video_src}
            frameborder="0"
            allowfullscreen
            webkitallowfullscreen={true}
            mozallowfullscreen={true}
            allow="fullscreen"
          />
        </StyledVideoBox>
      </StyledPaper>
    </VideoPlaceholder>
  );
};

export default VideoBox__StickyTop;
