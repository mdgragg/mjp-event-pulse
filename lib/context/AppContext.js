import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  loading: { loading: true, message: 'default loading' },
};

export const AppContext = React.createContext(initialState);

const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState(initialState);

  const setLoading = ({ loading, message = '' }) => {
    setAppState({
      ...appState,
      loading: { loading: true, message: message },
    });
  };

  const killLoading = () => {
    setAppState({
      ...appState,
      loading: { loading: false },
    });
  };

  return (
    <AppContext.Provider value={{ ...appState, setLoading, killLoading }}>
      {children}
    </AppContext.Provider>
  );
};

AppContext.propTypes = {};

export default AppContextProvider;
