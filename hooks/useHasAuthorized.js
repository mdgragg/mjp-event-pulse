import { useState, useEffect } from 'react';

const useHasAuthorized = (token_name) => {
  const [hasAuthorized, setHasAuthorized] = useState(false);

  useEffect(() => {
    console.log('hook is checking auth...');
    if (sessionStorage.getItem(token_name)) {
      setHasAuthorized(true);
    }
  }, []);

  const handleSetAuthorized = (value) => {
    setHasAuthorized(value);
    sessionStorage.setItem(token_name, value);
  };

  return [hasAuthorized, handleSetAuthorized];
};

export default useHasAuthorized;
