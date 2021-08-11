import { useState, useEffect } from 'react';

export declare interface SessionToken__Type {}

const useSessionToken = (
  token_name: string
): [boolean, (value: boolean | string) => void] => {
  const [hasToken, setToken] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(token_name)) {
      setToken(true);
    }
  }, []);

  const handleSetToken = (value) => {
    setToken(true);
    sessionStorage.setItem(token_name, value);
  };

  return [hasToken, handleSetToken];
};

export default useSessionToken;
