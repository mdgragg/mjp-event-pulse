import { verify, getAuthorizedEventJobs } from 'lib/fetchCalls/login';
import React, { createContext, useState, useEffect } from 'react';
import { setLoading, AppContext } from './AppContext';
import * as _ from 'lodash';
export const UserContext = createContext();
//
//
const UserContextProvider = (props) => {
  //
  //
  const initialState = {
    //the creds are coming from app which is
    // getting them on get initial props
    creds: props.creds,
    loggedIn: false,
    authorizedEvents: [],
  };

  const [loginState, setLoginState] = useState(initialState);

  useEffect(() => {
    async function verificate() {
      return await verify(loginState.creds).then((res) => res);
    }
    // if (sessionStorage.getItem('mjp-event-creds')) {
    //   storeCreds(JSON.parse(sessionStorage.getItem('mjp-event-creds')));
    //   verificate().then((result) => {
    //     if (result.status) {
    //       storeLoggedIn(true);
    //     } else {
    //       storeLoggedIn(false);
    //     }
    //   });
    // }
  }, []);

  //   getAuthorizedEventJobs(loginState.creds).then((res) => {
  //     storeAuthorizedEvents(res);
  //     storeLoggedIn(true);
  //   });
  const storeCreds = (creds) => {
    const newState = { ...loginState };
    sessionStorage.setItem('mjp-event-creds', JSON.stringify(creds));
    newState.creds = creds;
    setLoginState(newState);
  };

  const storeAuthorizedEvents = (eventArray) => {
    const newState = { ...loginState };
    newState.authorizedEvents = eventArray.authorized_events;

    setLoginState(newState);
  };
  const storeLoggedIn = (value) => {
    const newState = { ...loginState };
    newState.loggedIn = value;
    setLoginState(newState);
  };
  const logout = () => {
    storeAuthorizedEvents([]);
    storeCreds({ user: '', email: '', token: '' });
  };

  const verify_main_event = async (meta) => {
    const main_event = meta.events.find((e) => e.isMainEvent === true);
    console.log(main_event);
    console.log(_.valuesIn(loginState.authorizedEvents));
    // return if(main_event in)
  };

  return (
    <UserContext.Provider
      value={{
        loginState,
        storeAuthorizedEvents,
        storeCreds,
        logout,
        verify_main_event,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
