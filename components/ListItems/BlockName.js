import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Grow from '@material-ui/core/Grow';

const BlockHolder = styled.div`
  height: 100px;
  width: 300px;
  margin: 0 auto;
  &&.big {
    height: 150px;
    min-width: 400px;
    max-width: 400px;
    font-size: 1.75rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  border-radius: 10px;
  text-align: center;
  padding: 1rem;
  color: white;
  background-color: ${(props) => props.bg};
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.5);
`;

export const BlockName = ({ children, timeout, bg }) => {
  const [isScrolled, setScrolled] = React.useState(false);

  const handleScroll = (e) => {
    if (window.scrollY > 960) {
      setScrolled(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <Grow in={isScrolled} {...(isScrolled ? { timeout: timeout || 0 } : {})}>
      <BlockHolder bg={bg}>{children}</BlockHolder>
    </Grow>
  );
};

export const BlockNameBig = ({ children, timeout, bg }) => {
  const [isScrolled, setScrolled] = React.useState(false);

  const handleScroll = (e) => {
    if (window.scrollY > 960) {
      setScrolled(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  return (
    <Grow in={isScrolled} {...(isScrolled ? { timeout: timeout || 0 } : {})}>
      <BlockHolder className="big" bg={bg}>
        {' '}
        {children}
      </BlockHolder>
    </Grow>
  );
};
