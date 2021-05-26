import React, { useState, useEffect } from 'react';
import { calculate_remaining, calculateIfEnded } from '../../lib/helpers';

import CountdownClock from './CountdownClock';

const Counter__JustNumbers = ({
  start,
  end,
  prefix,
  afterStarted = null,
  afterEnded = null,
}) => {
  const [countdown_object, set_countdown_object] = useState(
    calculate_remaining(start, end)
  );

  useEffect(() => {
    const counter = setInterval(() => {
      set_countdown_object(calculate_remaining(start, end));
    }, 1000);
    return () => clearInterval(counter);
  }, []);

  if (
    countdown_object.total_remaining <= 0 &&
    countdown_object.parsed_until_end > 0
  ) {
    return afterStarted ? afterStarted : '';
  }

  if (countdown_object.parsed_until_end <= 0) {
    return afterEnded ? afterEnded : 'This event has ended';
  }

  return (
    <>
      {prefix && prefix}
      <CountdownClock countdown_object={countdown_object} />
    </>
  );
};

export default Counter__JustNumbers;
