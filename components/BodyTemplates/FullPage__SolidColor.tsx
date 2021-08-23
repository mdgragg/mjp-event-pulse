import { Container } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useDynamicBreakwidth } from '../../hooks';

const StyledPage = styled.div`
  min-height: calc(
    100vh - ${(props) => (props.noHero ? '0px' : props.theme.heroHeight)}
  );
  background-color: ${(props) => props.color || props.theme.colors.primary};
  width: 100%;
  padding-top: 1px;
  margin-top: -1px;
`;

type FullPage__SolidColor__Props = {
  noHero?: boolean;
  children: React.ReactNode;
  color?: string;
};

const FullPage__SolidColor = ({
  children,
  noHero,
  color,
}: FullPage__SolidColor__Props): any => {
  return (
    <StyledPage color={color} noHero={noHero}>
      {children}
    </StyledPage>
  );
};

export default FullPage__SolidColor;
