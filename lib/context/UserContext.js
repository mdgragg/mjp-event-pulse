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
    authorized_events: {},
    user_meta: {},
  };
  //
  //

  const { setLoading, killLoading } = useContext(AppContext);
  const [loginState, setLoginState] = useState(initialState);

  const verify_user = async (creds_to_query) => {
    console.log('verify user: ', creds_to_query);
    await verify(creds_to_query).then((result) => {
      if (result.status) {
        console.log('result', result);
        updateLoginState({
          loggedIn: true,
          authorized_events: result.authorized_events,
          user_meta: result.corresponding_record,
        });
        storeCreds(creds_to_query);
      }
    });
  };

  useEffect(() => {
    setLoading({ loading: true, message: 'checking for cookies' });
    verify_user(loginState.user_creds).then(() => killLoading());
  }, []);

  const logout = async () => {
    document.cookie = `creds=;`;
    updateLoginState({
      user_creds: {},
      authorized_events: [''],
      loggedIn: false,
      user_meta: {},
    });
  };
  // ONLY DO THIS IF USER IS VERIFIED
  const storeCreds = (new_creds) => {
    document.cookie = `creds=${JSON.stringify(
      new_creds
    )}; path=/; expires=Fri, 01 Jan 2021 00:00:01 GMT`;
  };

  const storeAuthorizedEvents = (eventArray) => {
    console.log(
      'store authorized events, with eventArray :>> ',
      typeof eventArray
    );
    localStorage.setItem('events', JSON.stringify(eventArray));
    const newState = loginState;
    newState.authorized_events = eventArray;
    setLoginState(newState);
  };

  const updateLoginState = (payload) => {
    const new_loginState = { ...loginState };
    Object.keys(payload).map((key) => {
      new_loginState[key] = payload[key];
    });
    setLoginState(new_loginState);
  };

  const storeLoggedIn = (value) => {
    console.log('store logged in' + value);
    const newLoggedIn = loginState;
    newLoggedIn.loggedIn = value;
    setLoginState(newLoggedIn);
  };

  const getAuthorizedEvents = async (creds_to_query) => {
    return await verify(creds_to_query).then(({ authorized_events }) => {
      return authorized_events;
    });
  };
  const verify_main_event = async (meta) => {
    const events_to_check = await getAuthorizedEvents(loginState.user_creds);
    console.log('authorized_events :>> ', events_to_check);
    const main_event = meta.events.find((e) => e.isMainEvent === true);
    let result;

    try {
      await events_to_check.forEach((a) => {
        console.log('mapping events', a);
        if (a.id == main_event.id) {
          console.log('this event matches: ' + a.id);
          result = true;
          storeAuthorizedEvents(events_to_check);
          console.log('result is now: ' + result);
          return true;
        }
      });
    } catch (error) {
      console.log('error finding authorized events' + error);
      result = false;
    }

    return result;
  };

  return (
    <UserContext.Provider
      value={{
        loginState,

        logout,
        verify_main_event,
        user_login: async (creds_to_query) => {
          setLoading({ loading: true, message: 'logging you in...' });
          const didLogIn = await login(creds_to_query); //did log in returns creds
          if (didLogIn.success) {
            updateLoginState({ user_creds: didLogIn, loggedIn: true });
            verify_user(didLogIn);
            killLoading();
          } else {
            killLoading();
          }
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
