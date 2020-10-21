import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import LogInBox from "./LogInBox";
const MyChatNav = styled.nav`
  background-color: #181818;
  height: ${(props) => (props.focused ? "150px" : "50px")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1em;
  transition: all 0.2s;
  Button {
    margin-left: 1em;

    height: 30px;
    width: 100px;
    font-size: 18px;
  }
`;

const LogInput = styled.input`
  font-size: 18px;
  font-family: Roboto;
  margin: 0;
  border: none;
  margin-left: 10px;
  min-height: 30px;
`;

const LoginSection = (props) => {
  const [loginBoxShowing, setLoginBoxShowing] = React.useState(false);

  const [userValue, setUserValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  if (props.loggedIn === "false") {
    return (
      <div style={{ justifySelf: "flex-start" }}>
        {loginBoxShowing ? (
          <div>
            <LogInput
              key="login-email"
              type="text"
              placeholder="email"
              name="email"
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
            />
            <LogInput
              key="login-password"
              type="password"
              placeholder="password"
              name="password"
              value={passwordValue}
              onFocus={() => props.setNavFocused(true)}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              key="submit-login-button"
              onClick={() => {
                props.setNavFocused(false);
                props.handleLogin(userValue, passwordValue);
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              key="cancel-login-button"
              onClick={() => {
                props.setNavFocused(false);
                setLoginBoxShowing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            Log In as {props.firstName}{" "}
            <Button
              variant="outlined"
              color="secondary"
              key="login-button"
              onClick={() => {
                props.setNavFocused(true);
                setLoginBoxShowing(true);
              }}
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    );
  } else if (props.loggedIn === "true") {
    return (
      <div style={{ justifySelf: "flex-start" }}>
        Logged In as {props.firstName}{" "}
        <button key="logout-button" onClick={() => props.logOut()}>
          Log Out
        </button>
      </div>
    );
  } else return <div>Not Found</div>;
};

const ChatNav = (props) => {
  const { loggedIn } = props;
  const [navFocused, setNavFocused] = React.useState(false);
  return (
    <MyChatNav focused={navFocused}>
      <LoginSection
        setNavFocused={setNavFocused}
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
