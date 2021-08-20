import React from 'react';
import styled from 'styled-components';
import { useDynamicBreakwidth } from '../../hooks';

const StyledPage = styled.div`
  min-height: calc(100vh - ${(props) => props.theme.heroHeight});
  background-color: ${(props) => props.color || props.theme.colors.primary};
  height: 100%;
  width: 100%;
`;

type FullPage__SolidColor__Props = {
  children: React.ReactNode;
  color?: string;
};

const FullPage__SolidColor = ({
  children,
  color,
}: FullPage__SolidColor__Props): any => {
  return <StyledPage color={color}>{children}</StyledPage>;
};

export default FullPage__SolidColor;
