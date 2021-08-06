import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({ hasAuth: false });

  const setAuth = (value) => {
    console.log('set auth');
    setState((prev) => ({ ...prev, hasAuth: value }));
  };

  return (
    <AppContext.Provider value={{ state, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
