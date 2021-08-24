import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VideoBox__StickyTop from './Video__StickyTop';
import { calcHasStarted } from 'lib/helpers';
import {
  StyledPlaceholder__Inner,
  StyledVideoPlaceholder__Wrap,
} from './VideoBox__Styles';
import useCalculateStartWithOffset from 'hooks/useCalculateStartWithOffset';

const Video__StickyTop__WithCountdown = ({
  src,
  showMinutesBefore = 0,
  start,
  showBefore,
}) => {
  const videoShowing = useCalculateStartWithOffset(start, showMinutesBefore);

  if (videoShowing) {
    return <VideoBox__StickyTop src={src} isStarted={true} />;
  }
  return (
    <StyledVideoPlaceholder__Wrap>
      <StyledPlaceholder__Inner>
        {showBefore && showBefore}
      </StyledPlaceholder__Inner>
    </StyledVideoPlaceholder__Wrap>
  );
};

Video__StickyTop__WithCountdown.propTypes = {
  start: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isStarted: PropTypes.bool,
  showMinutesBefore: PropTypes.number,
};

export default Video__StickyTop__WithCountdown;
