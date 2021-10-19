import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background: ${(props) => props.theme.palette.background.secondary};
  padding: 2rem;
  margin: auto;
  border-radius: 6px;
  && img {
    width: 100%;
    max-width: 160px;
    margin: auto;
  }
`;
const AuthHeaderContent = ({ logo }) => {
  return (
    <StyledHeader>
      <img style={{}} src={logo} />
    </StyledHeader>
  );
};

export default AuthHeaderContent;
