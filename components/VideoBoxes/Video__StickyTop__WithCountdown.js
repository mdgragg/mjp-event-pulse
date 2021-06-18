import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoBox__StickyTop from './Video__StickyTop';
import { calcHasStarted } from 'lib/helpers';
const Video__StickyTop__WithCountdown = ({
  src,
  isStarted,
  showMinutesBefore,
  start,
  showBefore = () => {
    <></>;
  },
}) => {
  const [videoShowing, setVideoShowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const startDate = Date.parse(start);
      const now = new Date();

      const minutes = startDate - now;
      const minutes_left = Math.ceil(minutes / 1000 / 60);

      if (minutes_left <= showMinutesBefore) {
        setVideoShowing(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (videoShowing) {
    return <VideoBox__StickyTop src={src} isStarted={isStarted} />;
  }
  return showBefore;
};

Video__StickyTop__WithCountdown.propTypes = {};

export default Video__StickyTop__WithCountdown;
