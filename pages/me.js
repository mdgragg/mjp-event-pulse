import React, { useContext, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { UserContext } from 'lib/context/UserContext';
import LoginBox from '../components/globals/Login';
const me = (props) => {
  const {
    loginState: { user_creds, user_meta, authorized_events, loggedIn },
  } = useContext(UserContext);

  if (loggedIn) {
    return (
      <div>
        <h2>{props.name}</h2>
        <p>Role: {user_meta.name} </p>
        <p>eMail: {user_creds.email}</p>
        {/* <p>Name: {user_meta.FirstName} </p> */}
        <p>Authorized Events: </p>
        <ul>
          {authorized_events.length > 0
            ? authorized_events.map((e) => (
                <li key={`${e.slug}--event-link`}>
                  <Link key={`${e.slug}--event-link`} href={`/${e.slug}`}>
                    <a>{e.EventName}</a>
                  </Link>
                </li>
              ))
            : 'no events'}
        </ul>
        <LoginBox />;
      </div>
    );
  } else {
    return <LoginBox />;
  }
};

me.propTypes = {};

export default me;
