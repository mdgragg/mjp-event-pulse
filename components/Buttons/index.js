import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

const MakeButtonStyle = (type) => {
  return css`
    transition: all 0.2s ease;
    font-family: ${(props) => props.theme.buttons[type].fontFamily};
    font-size: ${(props) => props.theme.buttons[type].fontSize};
    letter-spacing: ${(props) => props.theme.buttons[type].letterSpacing};
    line-height: ${(props) => props.theme.buttons[type].lineHeight};
    background-color: ${(props) => props.theme.buttons[type].backgroundColor};
    color: ${(props) => props.theme.buttons[type].fontColor};
    border: ${(props) => props.theme.buttons[type].border};
    @media all and (max-width: 500px) {
      font-size: 1rem;
    }
  `;
};

const MakeButtonHoverStyle = (type) => {
  return css`
    background-color: ${(props) => props.theme.buttons.hover.backgroundColor};
    color: ${(props) => props.theme.buttons.hover.fontColor};
  `;
};

const StyledButton__Primary = styled(Button)`
  ${MakeButtonStyle('primary')}
  &&:hover {
    ${MakeButtonHoverStyle()}
  }
`;

const StyledButton__Secondary = styled(Button)`
  ${MakeButtonStyle('secondary')}
  &&:hover {
    ${MakeButtonHoverStyle()}
  }
`;

const StyledButton__Big = styled(Button)`
  ${MakeButtonStyle('big')};
  &&:hover {
    ${MakeButtonHoverStyle()}
  }
  padding: 1rem;
`;

const Button__Primary = (props) => {
  return <StyledButton__Primary {...props}></StyledButton__Primary>;
};

const Button__Secondary = (props) => {
  return <StyledButton__Secondary {...props} />;
};

const Button__Big = (props) => {
  return <StyledButton__Big {...props} />;
};
export { Button__Primary, Button__Secondary, Button__Big };
