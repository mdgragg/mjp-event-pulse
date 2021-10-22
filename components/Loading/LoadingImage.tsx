import React from 'react';
import styled, { keyframes } from 'styled-components';

export const load = keyframes`
0%{
  width: 0%;
  transform: skew(1deg, 2deg) ;
}

}
50%{
   width:75%;
   transform: skew(0deg, 0deg);
}
100%{
   width: 100%;
   transform: skew(-3deg, 3deg) ;
}
`;

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(
    126deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(230, 230, 230, 1) 10%
  );
  /* overflow: hidden; */
  position: relative;

  &&::after {
    position: absolute;
    background: linear-gradient(
      206deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(245, 245, 245, 1) 100%
    );
    transform-origin: center center;
    transition: all 0.2s;
    animation-name: ${load};
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    animation-delay: ${(props) => props.delay}ms;
    animation-duration: 3s;
    height: 100%;
    width: inherit;
    top: 0;
    content: ' ';
    left: 0;
    border-radius: 8px;
  }
`;

type LoadingImage__Props = {
  children?: React.ReactNode;
  delay?: number;
};
const LoadingImage = (props: LoadingImage__Props) => {
  return (
    <>
      <Loader delay={props.delay} />
      {props.children}
    </>
  );
};

export default LoadingImage;
