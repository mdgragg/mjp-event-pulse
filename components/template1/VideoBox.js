import clsx from 'clsx';
import styled, { ThemeContext } from 'styled-components';
import { Grid, Paper, Card } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import MenuIcon from '@material-ui/icons/Menu';

const StyledPaper = styled(Paper)`
  background-color: black;
  padding: 0;
  border: none;
  border-radius: 0;
  &&.fixed {
    position: fixed;
    top: 2%;
    left: 2%;
    width: 350px;
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

const CustomFrame = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

const VideoBox = (props) => {
  const StyledVideoBox = styled.div`
    height: ${(props) => props.theme.videoBoxHeight};
    background-color: rgba(0, 0, 0, 0);

    @media (max-width: 768px) {
      width: 100%;
      height: 350px;
      border-radius: 0;
    }
  `;

  const [vidShow, setVidShow] = useState(true);
  const [isFixed, setFixed] = useState('');
  const themeContext = React.useContext(ThemeContext);

  const offsetVideoHeight = themeContext.videoBreakPoint;

  function calculateFixed(e) {
    if (this.pageYOffset >= offsetVideoHeight) {
      setFixed('fixed');
    } else {
      setFixed('');
    }
  }
  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', calculateFixed);
    }
    if (props.isStarted) {
      watchScroll();
    }
    return () => {
      window.removeEventListener('scroll', calculateFixed);
    };
  });

  return (
    <StyledPaper className={props.isStarted ? isFixed : ''}>
      <StyledVideoBox>
        <FilterVideo vidShow={vidShow} />
      </StyledVideoBox>
    </StyledPaper>
  );
};

const FilterVideo = (props) => {
  if (props.vidShow) {
    return (
      <CustomFrame
        src={``}
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      />
    );
  } else {
    return <h1> YED!</h1>;
  }
};

export default VideoBox;
