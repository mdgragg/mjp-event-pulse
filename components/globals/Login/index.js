import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../lib/context/UserContext';
import { login, verify } from 'lib/fetchCalls/login';
import { getAuthorizedEventJobs } from '../../../lib/fetchCalls/login';
import { setLoading, AppContext } from 'lib/context/AppContext';
const LoginBox = (props) => {
  const userContext = React.useContext(UserContext);

  const handleLogIn = async () => {
    setLoading(true);
    const didLogIn = await login({
      email: 'test15@test.test',
      password: 'testpass1234',
    });

    if (didLogIn.success) {
      console.log('success');
      userContext.storeCreds(didLogIn);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const logOutUser = () => {
    setLoading(true);
    console.log('log out user');

    userContext.logout();
    setLoading(false);
  };
  return (
    <div>
      <h4>{JSON.stringify(userContext.loginState.authorizedEvents)}</h4>
      <button
        onClick={() => getAuthorizedEventJobs(userContext.loginState.creds)}
      >
        Add Array
      </button>
      <button onClick={() => handleLogIn()}> log in</button>
      <button onClick={() => logOutUser()}> log out</button>
    </div>
  );
};

LoginBox.propTypes = {};

export default LoginBox;
