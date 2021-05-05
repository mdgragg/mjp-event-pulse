import React from 'react';
import Moment from 'react-moment';

const DateParse = ({ date, format = 'dddd MMMM DD, YYYY | h:mma' }) => {
  return <Moment format={format}>{date}</Moment>;
};

export default DateParse;
