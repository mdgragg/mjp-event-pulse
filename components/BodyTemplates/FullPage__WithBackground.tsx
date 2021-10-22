import React from 'react';
import styled from 'styled-components';
import { useDynamicBreakwidth } from '../../hooks';

const StyledPage = styled.div`
  min-height: calc(100vh - ${(props) => props.theme.heroHeight});
  height: 100%;
  background-image: url('${(props) => props.imgSrc}');
  background-attachment: fixed;
  background-size: 100% auto;
  width: 100%;
  @media all and (max-width: ${(props) => props.breakWidth}px) {
    background-size: auto 100%;
  }
`;

type FullPage__WithBackground__Props = {
  children: React.ReactNode;
  imgSrc: string;
};

const FullPage__WithBackground = (
  props: FullPage__WithBackground__Props
): any => {
  const { children, imgSrc } = props;

  const breakWidth = useDynamicBreakwidth(1080, imgSrc);

  return (
    <StyledPage {...props} breakWidth={breakWidth}>
      {children}
    </StyledPage>
  );
};

export default FullPage__WithBackground;
