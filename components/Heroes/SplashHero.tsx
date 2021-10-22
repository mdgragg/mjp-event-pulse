import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ArrowDownward, ArrowDropDownCircle } from '@material-ui/icons';

const StyledSplash = styled.div`
  background: ${(props) => props.theme.palette.background.secondary};
  height: 100vh;
`;

const Inner = styled.div`
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && .icon {
    font-size: 4rem;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;
const SplashHero = ({ children }) => {
  return (
    <StyledSplash>
      <Inner>
        {children}
        <ArrowDropDownCircle className="icon" />
      </Inner>
    </StyledSplash>
  );
};

SplashHero.propTypes = {};

export default SplashHero;
