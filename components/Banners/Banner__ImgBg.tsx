import React, { useEffect, useState } from 'react';
import { MyBanner } from './Banner';
import styled from 'styled-components';
import { useDynamicBreakwidth } from '../../hooks';

const TheBanner = styled(MyBanner)`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  && img.bg {
    position: relative;
    height: auto;
    width: 100%;
    object-position: center center;
    z-index: -1;
  }
  && .children {
    position: absolute;
    z-index: 1000;
    left: 0;
    right: 0;
    text-align: center;
  }

  @media all and (max-width: ${(props) => props.breakWidth}px) {
    && img.bg {
      height: auto;
      width: ${(props) => props.breakWidth}px;
    }
  }
`;

const Banner_ImgBg = (props) => {
  const { imgSrc, imgAlt, children } = props;

  const { breakWidth, imageHeight } = useDynamicBreakwidth(1080, imgSrc);

  return (
    <TheBanner breakWidth={breakWidth} imageHeight={imageHeight}>
      <img src={imgSrc} className="bg" alt={'banner background ' + imgAlt} />
      <div className="children"> {children} </div>
    </TheBanner>
  );
};

export default Banner_ImgBg;
