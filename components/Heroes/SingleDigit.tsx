import React from 'react';
import PropTypes from 'prop-types';

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

export default SingleDigit;
