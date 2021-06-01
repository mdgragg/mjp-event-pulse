import React from 'react';
import styled from 'styled-components';

const MainWrap = styled.div`
  min-height: 100vh;
  font-family: Avenir;
  font-weight: 600;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: black;
  &&::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    background-image: url('${(props) => props.theme.body_bg}');
    background-position: center center;
    background-size: 100% auto;
    background-attachment: fixed;
    top: 0;
    opacity: 0.85;
  }
  /* && * {
    position: relative;
  } */
  && h1,
  h2 {
    font-family: House-Gothic;
  }
  && h2,
  && h1,
  && h3 {
    color: white;
  }
  && button {
    background-color: ${(props) => props.theme.purple};
  }
  && button.Mui-selected {
    background-color: ${(props) => props.theme.green};
  }
`;

const Wrap = ({ children }) => {
  return <MainWrap>{children}</MainWrap>;
};

export default Wrap;
