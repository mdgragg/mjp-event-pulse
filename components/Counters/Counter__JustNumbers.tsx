import React, { useState, useEffect } from 'react';
import { calculate_remaining, calculateIfEnded } from '../../lib/helpers';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
import CountdownClock from './CountdownClock';

export type Counter__Props = {
  event: any;
  prefix?: React.ReactNode;
  afterStarted?: React.ReactNode | string;
  afterEnded?: React.ReactNode | string;
};

const Counter__JustNumbers = ({
  event,
  prefix,
  afterStarted = null,
  afterEnded = null,
}: Counter__Props): any => {
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
      <CountdownClock countdown_object={obj} />
    </>
  );
};

export default Counter__JustNumbers;
