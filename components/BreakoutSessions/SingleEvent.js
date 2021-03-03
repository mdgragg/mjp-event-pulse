import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Index from 'pages/sccellarauction';

import PasswordOnly from '../Modals/PasswordOnly';

const ThePaper = styled(Paper)`
  height: 100%;
  && a {
    margin: 0;
    text-decoration: none;
    color: inherit;
  }
`;

const SingleEventWrap = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.blue};
  color: white;
  min-height: inherit;
  height: 100%;
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
    background: ${(props) => props.theme.buttonColor || '#1f3c74'};
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
    color: ${(props) => props.theme.buttonTextColor || 'white'};
    :hover {
      cursor: pointer;
      background-color: white;
      color: ${(props) => props.theme.blue};
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
  display: block;
  padding: 1rem 0 3rem 0;
  max-width: 80%;
  margin: auto;
`;
const EventComponent = ({ session, handleLink, Wrap, buttonText }) => {
  const { Name, Description = '', Link, Thumbnail, Private } = session;
  return (
    <ThePaper>
      {/* <a href={`${link.url}`} target="_blank"> */}
      <SingleEventWrap>
        {Thumbnail?.url ? (
          <EventThumbnail src={Thumbnail.url} />
        ) : (
          <PlaceholderThumb> {Name} </PlaceholderThumb>
        )}

        <h3>{Name}</h3>

        <MetaData>{Description}</MetaData>
        <button onClick={handleLink}>{buttonText || 'Click To Join'}</button>
      </SingleEventWrap>
      {/* </a> */}
    </ThePaper>
  );
};

const SingleEvent = ({ session, buttonText }) => {
  // const { Name, Description = '', Thumbnail, Private } = session;

  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);

  let link = session.Link?.url || '/';

  const handleLink = (e) => {
    e.preventDefault();
    setPasswordModalOpen(true);
  };

  const handlePasswordModal = (value) => {
    setPasswordModalOpen(value);
  };

  if (session.Private) {
    return (
      <>
        <EventComponent
          session={session}
          buttonText={buttonText}
          handleLink={handleLink}
        />
        <PasswordOnly
          open={passwordModalOpen}
          setOpen={handlePasswordModal}
          password={session.Password}
          goToLink={() => (window.location.href = link)}
        />
      </>
    );
  }
  return (
    <EventComponent
      session={session}
      buttonText={buttonText}
      handleLink={() => (window.location.href = link)}
    />
  );
};

SingleEvent.propTypes = {};

export default SingleEvent;
