import React from 'react';
import styled from 'styled-components';

const TheBox = styled.div`
  height: 300px;
  width: 90%;
  max-width: 400px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  transition: all 0.2s;
  && .title-text {
    max-width: 380px;
    margin: auto;
    text-align: center;
    color: ${(props) => props?.titleTextColor || 'red'};
    font-size: 1.5rem;
    font-weight: 800;
  }
  && button {
    background-color: ${(props) => props.buttonColor};
    color: ${(props) => props.buttonTextColor};
    width: 200px;
    border-radius: 80px;
    font-size: 1.5rem;
    padding: 10px 0px;
    font-weight: 800;
  }
  && img {
    position: absolute;
    width: inherit;
    z-index: -1;
    width: auto;
    height: 100%;
    top: 0%;
    opacity: 0.4;
    transition: all 0.2s;
  }
  &&:hover {
    img {
      opacity: 1;
    }
    && .title-text {
      background-color: rgba(255, 255, 255, 0.75);
      padding: 10px 1rem;
    }
  }

  @media all and (max-width: 868px) {
    height: 200px;

    && .title-text {
      font-size: 1rem;
    }
  }
`;
const SingleBox = ({
  titleText = 'titleText',
  buttonText = 'buttonText',
  imgSrc,
  titleTextColor,
  buttonColor,
  buttonTextColor,
}) => {
  return (
    <TheBox
      titleTextColor={titleTextColor}
      buttonColor={buttonColor}
      buttonTextColor={buttonTextColor}
    >
      <div className="title-text">{titleText}</div>
      <button>{buttonText}</button>
      <img src={imgSrc} />
    </TheBox>
  );
};

export default SingleBox;
