import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import { event_theme } from '../../pages/sccellarauction';

const ThePaper = styled(Paper)`
  height: 100%;
`;

const SingleEventWrap = styled.div`
  position: relative;
  background-color: ${(props) => props.event_theme.blue};
  color: white;
  min-height: inherit;
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
    position: absolute;
    bottom: 3%;
    left: 0;
    right: 0;
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
  //for the button
  :after {
    display: block;
    height: 50px;
    content: ' ';
  }
`;

const EventThumbnail = styled.img`
  max-width: 100%;
  border: 2px solid white;
`;
const PlaceholderThumb = styled.div`
  background: rgba(255, 255, 255, 0.25);
  /* position: absolute; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  text-align: center;
  height: auto;
  :after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
const MetaData = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

const SingleEvent = ({ title, description, link, thumbnail_url }) => {
  return (
    <ThePaper>
      <SingleEventWrap event_theme={event_theme}>
        {thumbnail_url ? (
          <EventThumbnail src={thumbnail_url} />
        ) : (
          <PlaceholderThumb> {title} </PlaceholderThumb>
        )}

        <h3>{title}</h3>

        <MetaData>
          <p>{description} </p>
        </MetaData>
        <button>Click To Join</button>
      </SingleEventWrap>
    </ThePaper>
  );
};

SingleEvent.propTypes = {};

export default SingleEvent;
