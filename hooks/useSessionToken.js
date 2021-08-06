import { useState, useEffect } from 'react';

const useSessionToken = (token_name) => {
  const [hasToken, setToken] = useState(false);

  useEffect(() => {
    console.log('hook is checking auth...');
    if (sessionStorage.getItem(token_name)) {
      setToken(true);
    }
  }, []);

  const handleSetToken = (value) => {
    setToken(value);
    sessionStorage.setItem(token_name, value);
  };

  return [hasToken, handleSetToken];
};

export default useSessionToken;
