import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { calculate_remaining } from '../lib/helpers';

const useCalculateRemaining = (event) => {
  const {
    eventStartEnd: { StartDateTime, EndDateTime },
  } = event;

  const [data, setData] = useState(null);

  const calculate = () => {
    setData(calculate_remaining(StartDateTime, EndDateTime));
  };
  useEffect(() => {
    calculate();
    const timeout = setInterval(calculate, 1000);
    return () => clearInterval(timeout);
  }, []);

  return data;
};

export default useCalculateRemaining;
