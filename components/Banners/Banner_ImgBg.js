import React from 'react';
import { MyBanner } from './Banner';
import styled from 'styled-components';

const TheBanner = styled(MyBanner)`
  position: relative;
  overflow: hidden;
  height: inherit;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 4rem 0;
  && .children {
    position: relative;
    z-index: 100;
    top: 0;
    left: 0;
    margin: auto;
    height: inherit;
    text-align: center;
    width: inherit;
  }
  && img.bg {
    position: absolute;
    height: auto;
    width: 100%;
    top: 0;
    left: 0;
  }

  @media all and (max-width: 1000px) {
    && img.bg {
      height: 100%;
      width: auto;
    }
  }
`;

const Banner_ImgBg = (props) => {
  const { imgSrc, imgAlt } = props;
  return (
    <TheBanner>
      <div className="children"> {props.children} </div>
      <img src={imgSrc} className="bg" alt={'banner background ' + imgAlt} />
    </TheBanner>
  );
};

export default Banner_ImgBg;
