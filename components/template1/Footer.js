import styled from 'styled-components';
import React from 'react';

const StyledFooter = styled.div`
  /* padding: 2em; */
  width: 100%;
  background-color: ${(props) => props.theme.footerBg};
  min-height: 100px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1em;
  .signoff {
    margin-top: 50px;
  }
`;
const Footer = (props) => {
  return <StyledFooter>{props.children}</StyledFooter>;
};

export default Footer;
