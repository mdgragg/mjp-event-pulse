import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ThePage = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.blue};
`;
const Landing = ({ event_meta }) => {
  return (
    <ThePage>
      <h1>{event_meta.EventName}</h1>
    </ThePage>
  );
};

Landing.propTypes = {};

export default Landing;
