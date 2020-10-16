import React from "react";
import PropTypes from "prop-types";

const ChatErrorBox = (props) => {
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        height: "40px",
        zIndex: 100,
        backgroundColor: "red",
        color: "white",
        fontWeight: 800,
        fontSize: "24px",
        textAlign: "center",
      }}
    >
      {props.errorMessage}
    </div>
  );
};

ChatErrorBox.propTypes = {};

export default ChatErrorBox;
