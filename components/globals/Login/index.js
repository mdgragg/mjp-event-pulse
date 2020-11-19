import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../lib/context/UserContext';
import { login, verify } from 'lib/fetchCalls/login';
import { getAuthorizedEventJobs } from '../../../lib/fetchCalls/login';
import { setLoading, AppContext } from 'lib/context/AppContext';
import { Link } from '@material-ui/core';

const LoggedIn = ({ user_creds, logOutUser }) => (
  <div>
    <h2>Logged In as {user_creds.username}</h2>
    <button onClick={() => logOutUser()}> log out</button>
    <Link href="/me">
      <a>My Account</a>
    </Link>
  </div>
);

const NotLoggedIn = ({ values, setValues, handleLogIn }) => (
  <div>
    <h2>Log In</h2>
    <p>Username (email)</p>
    <input
      type="text"
      key="email"
      value={values.email}
      onChange={(e) => {
        setValues({ ...values, email: e.target.value });
      }}
    />
    <br />
    <p>Password</p>
    <input
      type="password"
      key="password"
      value={values.password}
      onChange={(e) => {
        setValues({ ...values, password: e.target.value });
      }}
    />
    <br />
    <button onClick={() => handleLogIn()}> log in</button>
  </div>
);

const LoginBox = (props) => {
  const {
    user_login,
    logout,
    loginState: { loggedIn, user_creds },
  } = useContext(UserContext);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleLogIn = () => {
    console.log('handle log in', values);
    user_login(values);
  };

  const logOutUser = () => {
    logout();
  };

  if (loggedIn)
    return (
      <LoggedIn
        user_creds={user_creds}
        loggedIn={loggedIn}
        logOutUser={logOutUser}
      />
    );
  else
    return (
      <NotLoggedIn
        handleLogIn={handleLogIn}
        values={values}
        setValues={setValues}
      />
    );
};

LoginBox.propTypes = {};

export default LoginBox;
