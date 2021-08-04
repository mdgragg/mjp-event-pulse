import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
const TheBox = styled.div`
  height: 350px;
  width: 90%;
  max-width: 350px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  justify-content: flex-end;
  transition: all 0.2s;
  && .child {
    position: absolute;
    z-index: 100;
    bottom: -3rem;
  }
  && .title-text {
    max-width: 380px;
    transition: all 0.2s;
    margin: 0 auto;
    text-align: center;
    color: ${(props) => props?.titleTextColor || 'black'};
    font-size: 1.25rem;
    font-weight: 800;
    z-index: 4;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 15px;
  }
  && button {
    background-color: ${(props) => props.buttonColor};
    color: ${(props) => props.buttonTextColor};
    width: 200px;
    border-radius: 80px;
    font-size: 1rem;
    padding: 10px 0px;
    font-weight: 800;
    z-index: 100;
    position: relative;
  }
  && button:hover {
    background-color: ${(props) => props.theme.blue};
  }

  &&:hover {
    cursor: pointer;
    img {
      opacity: 1;
      filter: saturate(1);
      z-index: 0;
    }
    && .title-text {
      background-color: rgba(255, 255, 255, 0.95);
      color: black;
    }
  }
  @media all and (max-width: 868px) {
    height: 400px;
    margin-top: 4rem;
    text-align: center;
    && .title-text {
      position: absolute;
      font-size: 1rem;
      bottom: 0rem;
      cursor: pointer;
    }
    && .button,
    && button {
      font-size: 1rem;
      width: 80%;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      bottom: -25px;
      z-index: 100;
      cursor: pointer;
    }
    && .child {
      bottom: -100px;
    }
  }
`;

const MainImage = styled.img`
  position: absolute;
  z-index: 1;
  width: auto;
  height: 100%;
  top: 0%;
  opacity: 1;
  transition: all 0.2s;
  filter: saturate(0.8);
  @media all and (max-width: 868px) {
    width: inherit;
    height: auto;
  }
`;

const SingleBox = ({
  titleText = 'titleText',
  buttonText = 'buttonText',
  imgSrc = 'https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/default-thumb-2.png',
  titleTextColor,
  buttonColor,
  buttonTextColor,
  link,
  children,
}) => {
  return (
    <>
      <TheBox
        titleTextColor={titleTextColor}
        buttonColor={buttonColor}
        buttonTextColor={buttonTextColor}
      >
        <div className="title-text">{titleText}</div>{' '}
        <a href={link} target="_blank" class="button">
          <button>{buttonText}</button>
        </a>
        <div className="child"> {children}</div>
        <MainImage src={imgSrc} alt={imgSrc} />
      </TheBox>
    </>
  );
};

export default SingleBox;
