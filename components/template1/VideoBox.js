import clsx from 'clsx';
import styled, { ThemeContext } from 'styled-components';
import { Grid, Paper, Card } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect, useRef } from 'react';

import MenuIcon from '@material-ui/icons/Menu';

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
    &&.fixed > div {
      height: 200px;
    }
  }

  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: none;
    margin: -1px -1px -1px -1px;
  }
`;

const VideoBox = (props) => {
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

  const [vidShow, setVidShow] = useState(true);

  const themeContext = React.useContext(ThemeContext);

  const offsetVideoHeight = themeContext.videoBreakPoint;
  const wrapperRef = useRef();

  function calculateFixed(e) {
    if (window.pageYOffset >= offsetVideoHeight) {
      wrapperRef.current.classList.add('fixed');
    } else {
      wrapperRef.current.classList.remove('fixed');
    }
  }
  useEffect(() => {
    console.log('video mount');
    if (props.isStarted) {
      window.addEventListener('scroll', calculateFixed, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', calculateFixed);
    };
  }, []);

  return (
    <StyledPaper ref={wrapperRef}>
      <StyledVideoBox>
        <FilterVideo vidShow={vidShow} src={props.src} />
      </StyledVideoBox>
    </StyledPaper>
  );
};

const CustomFrame = styled.iframe`
  border: none;
`;

const FilterVideo = (props) => {
  useEffect(() => {
    console.log('remounted');
  }, []);
  if (props.vidShow) {
    return <CustomFrame src={props.src} frameborder="0" allowfullscreen />;
  } else {
    return <div>No video...</div>;
  }
};

export default VideoBox;
