import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import { event_theme } from '../../pages/sccellarauction';

const ThePaper = styled(Paper)`
  height: 100%;
`;

const SingleEventWrap = styled.div`
  background-color: ${(props) => props.event_theme.blue};
  color: white;
  /* min-height: 450px; */
  height: inherit;
  width: 350px;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.2s;
  && :hover {
    opacity: 0.9;
    cursor: pointer;
    transform: scale(1.02);
  }
  && h3 {
    margin: 1rem auto;
    font-size: 1.5rem;
    max-width: 80%;
    color: white;
    text-align: center;
  }

  && button {
    background: ${(props) => props.event_theme.buttonColor || '#1f3c74'};
    height: 50px;
    margin: 0 auto;
    display: block;
    width: 200px;
    font-size: 1.25rem;
    font-weight: 600;
    border: none;
    transition: all 0.2s;
    color: ${(props) => props.event_theme.white};
    :hover {
      cursor: pointer;
      background-color: white;
      color: ${(props) => props.event_theme.blue};
    }
  }
`;

const EventThumbnail = styled.img`
  max-width: 100%;
  border: 2px solid white;
`;
const MetaData = styled.div`
  text-align: center;
`;

const SingleEvent = ({ title, description, link }) => {
  return (
    <ThePaper>
      <SingleEventWrap event_theme={event_theme}>
        <EventThumbnail src="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fi.forbesimg.com%2Fmedia%2Flists%2Fcompanies%2Famerican-national-red-cross_416x416.jpg" />
        <h3>{title}</h3>
        <button>Click To Join</button>
        <MetaData>
          <p>{description} </p>
        </MetaData>
      </SingleEventWrap>
    </ThePaper>
  );
};

SingleEvent.propTypes = {};

export default SingleEvent;
