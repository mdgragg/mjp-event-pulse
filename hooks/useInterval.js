import React, { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      callbackRef.current();
    }
    let interval = setInterval(tick, delay);
    () => clearInterval(interval);
  }, []);
}
