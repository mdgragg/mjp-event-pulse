import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  min-height: 100vh;
  background-image: url('${(props) => props.imgSrc}');
  background-attachment: fixed;
  width: 100%;
`;

type FullPage__WithBackground__Props = {
  children: React.ReactNode;
  imgSrc: string;
};

const FullPage__WithBackground = (
  props: FullPage__WithBackground__Props
): any => {
  const { children, imgSrc } = props;

  return <StyledPage {...props}>{children}</StyledPage>;
};

export default FullPage__WithBackground;
