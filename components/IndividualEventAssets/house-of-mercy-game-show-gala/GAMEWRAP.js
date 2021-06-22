import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  font-family: Avenir;
  button {
    background-color: ${(props) => props.theme.purple};
    min-height: 60px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 800;
    min-width: 200px;
  }
  button:hover {
    background-color: ${(props) => props.theme.lightGreen};
    border: 8px solid ${(props) => props.theme.green};
    color: ${(props) => props.theme.green};
  }
  button.donate {
    position: relative;
    background-color: ${(props) => props.theme.purple};
    min-height: 50px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 800;
    min-width: 200px;
    border: 8px solid ${(props) => props.theme.lightOrange};
    box-sizing: content-box;
    animation: bounce 1s ease infinite;
  }

  button.donate::after {
    content: '';
    border: 5px dotted white;
    height: 103%;
    width: 102%;
    top: -6px;
    left: -7px;
    position: absolute;
  }

  button.donate:hover {
    background-color: ${(props) => props.theme.lightGreen};
    border: 8px solid ${(props) => props.theme.green};
    color: ${(props) => props.theme.green};
  }
`;
const GAMEWRAP = ({ children }) => {
  return <Wrap>{children} </Wrap>;
};

export default GAMEWRAP;
