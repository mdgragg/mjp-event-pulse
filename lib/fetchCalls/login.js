import React from 'react';

export const login = async (creds) => {
  console.log('log in user ...', creds);
  const v_body = {
    identifier: creds.email,
    password: creds.password,
  };

  return await fetch(`http://localhost:1337/auth/local`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(v_body),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode && res.statusCode === 400) {
        return {
          success: false,
          message: 'there was an error with the login',
        };
      } else {
        return {
          success: true,
          message: 'success logging in',
          token: res.jwt,
          username: res.user.username,
          email: res.user.email,
        };
      }
    });
};

export const verify = async (creds) => {
  console.log('verifying user ...', creds);
  return await fetch(`http://localhost:1337/event-jobs/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${creds.token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode && res.statusCode > 399) {
        console.log('verifying user failed', res);
        return {
          status: false,
          message: res,
          authorized_events: [],
        };
      } else {
        console.log('verifying user succeded', res);
        return {
          status: true,
          corresponding_record: res.corresponding_record,
          authorized_events: res.authorized_events,
        };
      }
    });
};

export const getAuthorizedEventJobs = async (creds, event) => {
  return await fetch(`http://localhost:1337/event-jobs/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${creds.token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    });
};
