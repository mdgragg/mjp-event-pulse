import { useEffect, useState } from 'react';

export default function useCalculateStartWithOffset(
  start: string,
  offset: number
): boolean {
  const [hasStarted, setHasStarted] = useState(false);

  const calculateShowing = () => {
    const startDate = Date.parse(start);
    const now = Date.parse(new Date().toString());
    const minutes = startDate - now;
    const minutesLeft = Math.ceil(minutes / 1000 / 60);
    if (minutesLeft <= offset) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setHasStarted(calculateShowing());
    let interval = setInterval(() => {
      let result = calculateShowing();
      if (result) {
        setHasStarted(result);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start, offset]);

  return hasStarted;
}
