import { useState, useEffect } from 'react';
import { calculate_remaining } from '../lib/helpers';
const useCalculateIfStarted = (event) => {
  const {
    eventStartEnd: { StartDateTime, EndDateTime },
  } = event;

  const calculate = () => {
    const res = calculate_remaining(StartDateTime, EndDateTime);
    setState({
      hasStarted: res.total_remaining <= 0,
      hasEnded: res.parsed_until_end <= 0,
    });
  };

  const [state, setState] = useState({ hasStarted: false, hasEnded: false });

  useEffect(() => {
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [event.eventStartEnd]);

  return state;
};

export default useCalculateIfStarted;
