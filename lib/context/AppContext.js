import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  loading: false,
};

export const AppContext = React.createContext(initialState);

export const setLoading = (value) => {
  console.log(value);
  initialState.loading = value;
};

const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState(initialState);

  const setLoading = (value) => {
    const state = { ...appState };
    state.loading = value;
    setAppState(state);
  };
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

AppContext.propTypes = {};

export default AppContextProvider;
