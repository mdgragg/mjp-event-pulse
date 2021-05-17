import React, { useState, useEffect } from 'react';
import { calculate_remaining, calculateIfEnded } from '../../lib/helpers';

import CountdownClock from './CountdownClock';

const Counter__JustNumbers = ({ start, end, prefix, afterStarted = null }) => {
  const [countdown_object, set_countdown_object] = useState(
    calculate_remaining(start)
  );

  useEffect(() => {
    const counter = setInterval(() => {
      set_countdown_object(calculate_remaining(start, end));
    }, 1000);
    return () => clearInterval(counter);
  }, []);

  if (countdown_object.total_remaining <= 0) {
    return afterStarted ? afterStarted : '';
  }

  return (
    <>
      {prefix && prefix}
      <CountdownClock countdown_object={countdown_object} />{' '}
    </>
  );
};

export default Counter__JustNumbers;
