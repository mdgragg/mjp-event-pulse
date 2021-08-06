import React, { useState, useEffect } from 'react';
import { calculate_remaining, calculateIfEnded } from '../../lib/helpers';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
import CountdownClock from './CountdownClock';

const Counter__JustNumbers = ({
  event,
  start,
  end,
  prefix,
  afterStarted = null,
  afterEnded = null,
}) => {
  const obj = useCalculateRemaining(event);

  if (!obj) {
    return '';
  }

  if (obj.parsed_until_end < 0) {
    return afterEnded ? afterEnded : 'This event has ended';
  }

  if (obj.total_remaining <= 0) {
    return afterStarted ? afterStarted : '';
  }

  return (
    <>
      {prefix && prefix}
      <CountdownClock countdown_object={Object} />
    </>
  );
};

export default Counter__JustNumbers;
