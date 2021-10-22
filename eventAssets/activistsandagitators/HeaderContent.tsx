import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateParse } from 'components/__Assets__';
import { CircleCounter } from 'components/Counters';
import Center from 'components/Center';

const Wrap = styled.div`
  && > div {
    margin: 2rem auto;
    text-align: center;
  }
`;
const HeaderContent = ({ main_event }) => {
  return (
    <Wrap>
      <div>
        <img
          style={{
            width: '100%',
            maxWidth: '350px',
            margin: '2rem auto',
          }}
          src={main_event.LogoLink[0]?.Media?.url || null}
        />
      </div>
      <div>
        <Center>
          <h1 style={{ margin: 'auto', fontSize: '3rem', width: '80%' }}>
            {main_event.EventName}
          </h1>
          <p style={{ margin: 'auto' }}>
            <DateParse date={main_event.eventStartEnd.StartDateTime} />
          </p>
        </Center>
      </div>
      <div>
        <Center>
          <CircleCounter event={main_event}></CircleCounter>
        </Center>
      </div>
    </Wrap>
  );
};

HeaderContent.propTypes = {};

export default HeaderContent;
