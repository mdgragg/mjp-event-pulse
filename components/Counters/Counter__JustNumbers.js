import React, { useState, useEffect } from 'react';
import { calculate_remaining } from '../../lib/helpers';

import CountdownClock from './CountdownClock';

const Counter__JustNumbers = ({ start, end }) => {
  const [countdown_object, set_countdown_object] = useState(
    calculate_remaining(start)
  );

  useEffect(() => {
    const counter = setInterval(() => {
      set_countdown_object(calculate_remaining(start, end));
    }, 1000);
    return () => clearInterval(counter);
  }, []);

  return <CountdownClock countdown_object={countdown_object} />;
};

export default Counter__JustNumbers;
