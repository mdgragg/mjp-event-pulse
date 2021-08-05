import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AgendaWrap = styled.div`
  max-width: 500px;
  width: 80%;
  font-size: 1rem;
  margin: auto;
  && h3 {
    font-size: 1.5rem;
  }
`;
const TimeBlock = styled.div`
  margin: 1rem auto;
  && span.agenda--time {
    font-weight: 800;
    display: block;
    text-decoration: underline;
  }
`;

const Break = styled.div`
  color: grey;
  font-weight: 800;
  font-size: 0.85rem;
`;
const Agenda = (props) => {
  return (
    <AgendaWrap>
      <center>
        <h3>AGENDA</h3>
      </center>
      <TimeBlock>
        <span className="agenda--time"> 1:00 - 1:45</span> Scott Barbour Company
        Update
      </TimeBlock>
      <Break>FIVE MINUTE BREAK</Break>
      <TimeBlock>
        <span className="agenda--time"> 1:50 - 2:20</span> Mike Huebert Sales
        Update
      </TimeBlock>
      <Break>FIFTEEN MINUTE BREAK</Break>
      <TimeBlock>
        <span className="agenda--time"> 2:35 - 3:05</span> Scott Cottrill
        Finance/Shareholder Value Update
      </TimeBlock>
      <Break>FIVE MINUTE BREAK</Break>
      <TimeBlock>
        <span className="agenda--time"> 3:10 – 3:40</span> Brian King
        Marketing/Product Management Update
      </TimeBlock>
      <Break>FIVE MINUTE BREAK</Break>
      <TimeBlock>
        <span className="agenda--time"> 3:45 - Close </span> Scott Barbour
        Closing Comments
      </TimeBlock>
    </AgendaWrap>
  );
};

Agenda.propTypes = {};

export default Agenda;
