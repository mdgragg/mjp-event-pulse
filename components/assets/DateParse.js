import React from 'react';
import Moment from 'react-moment';

const DateParse = ({ date }) => {
  return <Moment format="dddd MMMM DD, YYYY | h:mma">{date}</Moment>;
};

export default DateParse;
