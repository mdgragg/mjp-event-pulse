import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LogInBox from "./LogInBox";
const MyChatNav = styled.nav`
  background-color: #181818;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1em;
  button {
    margin-left: 1em;
    border: none;
    padding: 5px;
    border-radius: 5px;
    width: 80px;
  }
`;

const LoginSection = (props) => {
  const [loginBoxShowing, setLoginBoxShowing] = React.useState(false);

  const [userValue, setUserValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  useEffect(() => {});
  return !props.loggedIn ? (
    <div style={{ justifySelf: "flex-start" }}>
      {loginBoxShowing ? (
        <div>
          <input
            key="login-email"
            type="text"
            placeholder="email"
            name="email"
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
          />
          <input
            key="login-password"
            type="password"
            placeholder="password"
            name="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <button
            key="submit-login-button"
            onClick={() => props.handleLogin(userValue, passwordValue)}
          >
            Login
          </button>
          <button
            key="cancel-login-button"
            onClick={() => setLoginBoxShowing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          Log In as {props.firstName}{" "}
          <button key="login-button" onClick={() => setLoginBoxShowing(true)}>
            Log In
          </button>
        </div>
      )}
    </div>
  ) : (
    <div style={{ justifySelf: "flex-start" }}>
      Logged In as {props.firstName}{" "}
      <button key="logout-button" onClick={() => props.logOut()}>
        Log Out
      </button>
    </div>
  );
};
const ChatNav = (props) => {
  const { loggedIn } = props;
  return (
    <MyChatNav>
      <LoginSection
        loggedIn={loggedIn}
        firstName={props.exhibitor.FirstName}
        handleLogin={props.handleLogin}
        logOut={props.logOut}
      ></LoginSection>
      <div></div>
    </MyChatNav>
  );
};

export default ChatNav;
