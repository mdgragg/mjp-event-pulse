import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BlockName } from './BlockName';

const marquee = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
`;

const Carousel = styled.div`
  display: flex;
  width: unset;
  overflow-x: scroll;
  &&::-webkit-scrollbar {
    display: none;
  }
  && .carousel--item {
    display: block;
    min-width: 400px;
    will-change: transform;
    animation: ${marquee} 5s linear infinite;
    text-align: center;
  }
`;

const HorizontalCarousel = ({ data }) => {
  return (
    <Carousel>
      {data.map((item, index) => (
        <div className="carousel--item" key={`carousel-item--map-${index}`}>
          {item}
        </div>
      ))}
    </Carousel>
  );
};

export default HorizontalCarousel;
