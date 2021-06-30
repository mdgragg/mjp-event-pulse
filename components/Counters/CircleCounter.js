import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
const Wrap = styled.div`
  /* padding: 15px; */
  width: max-content;
  color: white;
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-family: Gotham;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 1rem auto;
`;

const Box = styled.div`
  font-family: Avenir;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  && > div.box {
    height: 72px;
    padding-top: 2px;
    width: 72px;
    margin: 0 0.25rem;
    background-color: rgba(0, 237, 158, 1);
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  && div.box:last-of-type::after {
    content: '';
  }
  && .digit {
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 1.75rem;
  }
  && .delimiter {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

const SingleDigit = ({ number, delimiter }) => {
  const delim_obj = {
    hours: number === 1 ? 'hour' : 'hours',
    days: number === 1 ? 'day' : 'days',
    minutes: 'min',
    seconds: 'sec',
  };

  return (
    <div className="box">
      <div className="digit"> {number} </div>
      <div className="delimiter"> {delim_obj[delimiter]}</div>
    </div>
  );
};

const BoxedCounter = ({ event }) => {
  const obj = useCalculateRemaining(event);

  if (!obj) {
    return '';
  }
  if (obj.parsed_until_end <= 0) {
    return (
      <Wrap>
        <Title>This Event Has Ended</Title>
      </Wrap>
    );
  }
  if (obj.total_remaining <= 0) {
    return (
      <Wrap>
        <Title>Live Now!</Title>
      </Wrap>
    );
  }

  if (obj) {
    return (
      <Wrap>
        <Title>Join Us Live In:</Title>
        <Box>
          {Object.keys(obj).map((o) => {
            if (o !== 'total_remaining' && o !== 'parsed_until_end') {
              return <SingleDigit number={obj[o]} delimiter={o} />;
            }
          })}
        </Box>
      </Wrap>
    );
  }
};

export default BoxedCounter;
