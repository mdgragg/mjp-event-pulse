import React from 'react';
import styled from 'styled-components';

const TheBox = styled.div`
  height: 450px;
  width: 90%;
  max-width: 450px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  justify-content: flex-end;
  transition: all 0.2s;
  && .title-text {
    max-width: 380px;
    transition: all 0.2s;
    margin: 0 auto;
    text-align: center;
    color: ${(props) => props?.titleTextColor || 'red'};
    font-size: 1.5rem;
    font-weight: 800;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 15px;
  }
  && button {
    background-color: ${(props) => props.buttonColor};
    color: ${(props) => props.buttonTextColor};
    width: 200px;
    border-radius: 80px;
    font-size: 1.5rem;
    padding: 10px 0px;
    font-weight: 800;
    z-index: 2;
  }

  &&:hover {
    cursor: pointer;
    img {
      opacity: 1;
    }
    && .title-text {
      background-color: rgba(255, 255, 255, 0.95);
      color: black;
    }
  }
  @media all and (max-width: 868px) {
    height: 85vw;
    margin-top: 4rem;
    && .title-text {
      position: absolute;
      font-size: 1rem;
      bottom: 0rem;
      cursor: pointer;
    }
    && button {
      font-size: 1rem;
      position: absolute;
      bottom: -70px;
      cursor: pointer;
    }
  }
`;

const MainImage = styled.img`
  position: absolute;
  z-index: 1;
  width: auto;
  height: 100%;
  top: 0%;
  opacity: 0.4;
  transition: all 0.2s;
  filter: saturate(0);
  &&:hover {
    opacity: 1;
    filter: saturate(1);
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
}) => {
  return (
    <>
      <TheBox
        onClick={() => {
          if (link) {
            window.location.href = link;
          }
        }}
        titleTextColor={titleTextColor}
        buttonColor={buttonColor}
        buttonTextColor={buttonTextColor}
      >
        <div className="title-text">{titleText}</div>
        <button>{buttonText}</button>
        <MainImage src={imgSrc} alt={imgSrc} />
      </TheBox>
    </>
  );
};

export default SingleBox;
