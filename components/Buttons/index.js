import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

const MakeButtonStyle = (type) => {
  return css`
    /* spread all the properties from the theme  */
    ${(props) => props.theme.buttons[type]}
    transition: all 0.2s ease;
    font-weight: 600;
    padding: 8px 18px;
    margin: 1rem auto;
    @media all and (max-width: 500px) {
      font-size: 1rem;
    }
  `;
};

const MakeButtonHoverStyle = () => {
  return css`
    background-color: ${(props) => props.theme.buttons.hover.backgroundColor};
    color: ${(props) => props.theme.buttons.hover.color};
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
  return <StyledButton__Primary {...props} />;
};

const Button__Secondary = (props) => {
  return <StyledButton__Secondary {...props} />;
};

const Button__Big = (props) => {
  return <StyledButton__Big {...props} />;
};
export { Button__Primary, Button__Secondary, Button__Big };
