import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
import { Event__Type } from 'types/Events__Types';
const Wrap = styled.div`
  /* padding: 15px; */
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  background-color: ${(props) => props.theme.palette.secondary};
  ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.palette.background.secondary};
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 1rem auto;
  text-align: center;
  padding: 0.75rem 0;
`;

const Box = styled.div`
  font-family: Avenir;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  color: ${(props) => props.theme.palette.text.secondary};
  && > div.box {
    height: 0;
    padding-top: 20%;
    min-width: 70px;
    min-height: 70px;
    width: 20%;
    background-color: ${(props) => props.theme.palette.background.secondary};
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  && .digit {
    position: absolute;
    top: 16%;
    font-weight: 600;
    font-size: clamp(16px, 155%, 5rem);
    line-height: clamp(12px, 10vw, 2.25rem);
  }
  && .delimiter {
    position: absolute;
    top: 65%;
    font-size: clamp(1px, 60%, 2.5rem);
    line-height: clamp(10px, 3vw, 1rem);
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

type CircleCounter__Props = {
  event: Event__Type;
  prefix?: React.ReactNode | string;
};

const CircleCounter = ({ event, prefix }: CircleCounter__Props): any => {
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
        {prefix && <Title>{prefix}</Title>}

        <Box>
          {Object.keys(obj).map((o, index) => {
            if (o !== 'total_remaining' && o !== 'parsed_until_end') {
              return (
                <SingleDigit
                  number={obj[o]}
                  delimiter={o}
                  key={`counter--${index}`}
                />
              );
            }
          })}
        </Box>
      </Wrap>
    );
  }
};

export default CircleCounter;
