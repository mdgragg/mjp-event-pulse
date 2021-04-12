import React from 'react';
import styled from 'styled-components';

const MainWrap = styled.div`
  min-height: 100vh;
  font-family: Avenir;
  font-weight: 600;
  width: 100%;
  display: flex;
  position: relative;

  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: black;
  &&::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    background-image: url('${(props) => props.theme.body_bg}');
    background-position: center center;
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
`;

const Wrap = ({ children }) => {
  return <MainWrap>{children}</MainWrap>;
};

export default Wrap;
