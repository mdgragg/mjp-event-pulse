import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Box = styled.div``;

const LoginBox = (props) => {
  return (
    <Box>
      <button onClick={() => logIn()}>Log In</button>
      <button onClick={() => logOut()}>Log Out</button>
    </Box>
  );
};

export default LoginBox;
