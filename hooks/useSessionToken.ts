import { useState, useEffect } from 'react';

const useSessionToken = (token_name: string) => {
  const [hasToken, setToken] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(token_name)) {
      setToken(true);
    }
  }, []);

  const handleSetToken = (value: string): void => {
    setToken(true);
    sessionStorage.setItem(token_name, value);
  };

  return [hasToken, handleSetToken];
};

export default useSessionToken;
