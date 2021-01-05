const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`;

export const login = async (creds) => {
  const v_body = {
    identifier: creds.email,
    password: creds.password,
  };

  return await fetch(`${ENDPOINT}/auth/local`, {
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
  return await fetch(`${ENDPOINT}/event-jobs/`, {
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
        return {
          status: true,
          corresponding_record: res.corresponding_record,
          authorized_events: res.authorized_events,
        };
      }
    });
};

export const getAuthorizedEventJobs = async (creds, event) => {
  return await fetch(`${ENDPOINT}/event-jobs/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${creds.token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};
