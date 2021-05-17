import { useState, useEffect } from 'react';

const useCalculateIfStarted = (start) => {
  const [hasStarted, setHasStarted] = useState(false);

  const calculate = () => {
    let now = new Date();
    const parsed_event_start = Date.parse(start);
    let calc_time = parsed_event_start - now;
    if (calc_time <= 0) {
      return setHasStarted(true);
    }
    return setHasStarted(false);
  };

  useEffect(() => {
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return hasStarted;
};

export default useCalculateIfStarted;
