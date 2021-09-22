import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import PasswordOnly from '../Modals/PasswordOnly';
import { Button__Primary } from 'components/Buttons';
import { DateParse } from 'components/__Assets__';

const ThePaper = styled(Paper)`
  margin: 1rem auto;
  width: auto;
  max-width: 350px;
`;

const SingleEventWrap = styled.div`
  position: relative;
  min-width: 350px;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && :hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const EventThumbnail = styled.img`
  max-width: 350px;
  margin-bottom: 1.5rem;
  padding: 2rem;
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
const EventComponent = ({ session, handleLink, buttonText }) => {
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
        <p>
          <DateParse format={`MMMM DD, h:mma`} date={session.DateTime} />
        </p>

        <MetaData>{Description}</MetaData>
        <Button__Primary onClick={handleLink}>
          {buttonText || `Join ${session.Category}` || 'Click To Join'}
        </Button__Primary>
      </SingleEventWrap>
      {/* </a> */}
    </ThePaper>
  );
};

type SingleEvent__Props = {
  session: any;
  buttonText?: string;
};

const SingleEvent = ({ session, buttonText }: SingleEvent__Props) => {
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
