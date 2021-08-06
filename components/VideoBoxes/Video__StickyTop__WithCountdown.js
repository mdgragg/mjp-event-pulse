import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VideoBox__StickyTop from './Video__StickyTop';
import { calcHasStarted } from 'lib/helpers';

const StyledVideoBox = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: var(--mjp-shadow);
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  && > div.placeholder {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Video__StickyTop__WithCountdown = ({
  src,
  isStarted,
  showMinutesBefore = 0,
  start,
  showBefore = () => {
    <></>;
  },
}) => {
  const [videoShowing, setVideoShowing] = useState(false);

  const calculateShowing = () => {
    const startDate = Date.parse(start);
    const now = new Date();
    const minutes = startDate - now;
    const minutesLeft = Math.ceil(minutes / 1000 / 60);
    if (minutesLeft <= showMinutesBefore) {
      setVideoShowing(true);
    }
  };
  useEffect(() => {
    calculateShowing();
    const interval = setInterval(calculateShowing, 1000);
    return () => clearInterval(interval);
  }, []);

  if (videoShowing) {
    return <VideoBox__StickyTop src={src} isStarted={isStarted} />;
  }
  return (
    <StyledVideoBox>
      <div className="placeholder">{showBefore} </div>
    </StyledVideoBox>
  );
};

Video__StickyTop__WithCountdown.propTypes = {
  start: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isStarted: PropTypes.bool,
  showMinutesBefore: PropTypes.number,
};

export default Video__StickyTop__WithCountdown;
