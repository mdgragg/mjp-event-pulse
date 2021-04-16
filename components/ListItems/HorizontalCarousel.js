import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { BlockName } from './BlockName';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// const marquee = keyframes`
//   0% {
//     transform: translate(0%, 0);
//   }
//   100% {
//     transform: translate(-100%, 0);
//   }
// `;

// const Carousel = styled.div`
//   display: flex;
//   width: unset;
//   overflow-x: scroll;
//   scroll-behavior: smooth;
//   /* animation: ${marquee} 10s linear infinite; */
//   &&::-webkit-scrollbar {
//     display: none;
//   }
//   && .carousel--item {
//     overflow-x: hidden;
//     display: block;
//     min-width: 400px;
//     will-change: transform;

//     text-align: center;
//   }
// `;

const HorizontalCarousel = ({ data }) => {
  return (
    <Carousel
      infiniteLoop
      interval={1000}
      centerMode
      centerSlidePercentage={33}
      autoPlay
      renderIndicator={false}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
    >
      {data.map((item, index) => (
        <div className="carousel--item" key={`carousel-item--map-${index}`}>
          {item}
        </div>
      ))}
    </Carousel>
  );
};

export default HorizontalCarousel;
