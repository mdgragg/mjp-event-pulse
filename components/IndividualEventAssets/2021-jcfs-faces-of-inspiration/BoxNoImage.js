import React from 'react';
import styled from 'styled-components';

const TheBox = styled.div`
  height: auto;
  border-radius: 25px;
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
  background-color: ${(props) => props.theme.blue};
  && .title-text {
    max-width: 380px;
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 800;
    z-index: 2;
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
    button {
      background-color: white;
      color: ${(props) => props.theme.blue};
      transform: scale(1.05);
    }
  }
  @media all and (max-width: 868px) {
    height: 200px;
    && .title-text {
      font-size: 1rem;
    }
  }
  @media all and (max-width: 550px) {
    height: auto;
    && .title-text {
      font-size: 1rem;
    }
  }
`;

const BoxNoImage = ({
  titleText = 'titleText',
  buttonText = 'buttonText',
  imgSrc,
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
      </TheBox>
    </>
  );
};

export default BoxNoImage;
