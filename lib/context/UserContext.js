import { verify, getAuthorizedEventJobs, login } from 'lib/fetchCalls/login';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import * as _ from 'lodash';
import { map, update } from 'lodash';

export const UserContext = createContext();
//
//
const UserContextProvider = (props) => {
  //
  //
  let initialState = {
    //the creds are coming from app which is
    // getting them on get initial props
    user_creds: props.loginData.cookie_creds || {},
    loggedIn: false,
    authorized_events: [],
    user_meta: {},
  };
  //
  const { setLoading, killLoading } = useContext(AppContext);
  const [loginState, setLoginState] = useState(initialState);

  return <UserContext.Provider>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
