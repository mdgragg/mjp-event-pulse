import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const pad = (number) => {
  console.log('number', number);
  let the_num = parseInt(number, 10);
  if (the_num < 10) {
    return '0' + number.toString();
  }
  if (the_num === 0) return '00';
  if (!the_num) return '00';
};

const Message = styled.div`
  && h4 {
    margin: 0;
  }
  width: 70%;
  position: relative;
  padding: 15px 0.5rem 15px 0.5rem;
  background-color: #e2dee1;
  margin: 2rem auto 2rem 0;
  border-radius: 10px;
  &&.me {
    background-color: #007ab8;
    color: white;
    margin: 2rem 0 2rem auto;
    && .timestamp {
      /* right: 0; */
    }
  }
  && .timestamp {
    color: grey;
    position: absolute;
    bottom: -20px;
  }
`;
const SingleMessage = ({ isMe, name, content, date }) => {
  const theDate = new Date(date);
  const hours =
    theDate.getHours() > 12 ? theDate.getHours() - 12 : theDate.getHours();

  const AMPM = theDate.getHours() > 12 ? 'pm' : 'am';
  return (
    <>
      <Message className={isMe ? 'me' : null}>
        <h4>{name}</h4>
        {content}
        <div className="timestamp">
          {hours}:{pad(theDate.getMinutes())}:{pad(theDate.getSeconds())}
          {AMPM}
        </div>
      </Message>
    </>
  );
};

export default SingleMessage;
