import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DateParse } from '.';

const Clock = ({ format }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    let int = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, []);

  return <DateParse date={time} format={format} />;
};

Clock.propTypes = {};

export default Clock;
