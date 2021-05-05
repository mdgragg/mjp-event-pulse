import React from 'react';
import styled from 'styled-components';

const BGSection = styled.div`
  /* background-color: red; */
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  &&::before {
    content: '';
    position: absolute;
    background-image: url('${(props) => props.imgSrc}');
    background-size: auto 100%;
    background-position: center center;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
  }
`;

const Section__WithBG = ({
  children,
  imgSrc = 'https://placehold.co/1920x1080',
}) => {
  return <BGSection imgSrc={imgSrc}> {children}</BGSection>;
};

export default Section__WithBG;
