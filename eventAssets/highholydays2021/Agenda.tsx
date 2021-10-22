import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrap = styled.div`
  padding: 2rem;
  font-size: 1.25rem;
  && > div {
    margin: 1rem auto;
  }
  && div.date {
    font-weight: 800;
  }
  && div.detail {
    color: grey;
    font-weight: 400;
  }
`;
const Agenda = (props) => {
  return (
    <Wrap>
      <div>
        <div className="date">Monday, September 6</div>
        <div className="detail">7:00 PM - Erev Rosh Hashanah </div>
      </div>
      <div>
        <div className="date">Tuesday, September 7 </div>
        <div className="detail">9:00 AM - Tot Service </div>
        <div className="detail">10:00 AM - Rosh Hashanah </div>
      </div>
      <div>
        <div className="date">Wednesday, September 15</div>
        <div className="detail">7:00 PM - Kol Nidre</div>
      </div>
      <div>
        <div className="date">Thursday, September 16</div>
        <div className="detail">9:00 AM - Tot Service </div>
        <div className="detail">10:00 AM - Yom Kippur </div>
        <div className="detail">1:00PM - Contemplative Music</div>
        <div className="detail">4:30PM - Yizkor & Neilah</div>
      </div>
    </Wrap>
  );
};

Agenda.propTypes = {};

export default Agenda;
