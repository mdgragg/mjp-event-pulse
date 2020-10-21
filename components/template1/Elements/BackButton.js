import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { KeyboardArrowLeft } from "@material-ui/icons";
const BackButton = (props) => {
  return (
    <Link
      style={{ fontSize: "24px", color: "white" }}
      href={`/${props.event_job.eventUrl}/exhibitors`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "grey",
          cursor: "pointer",
          // backgroundColor: "black",
          padding: "5px",
          width: "130px",
        }}
      >
        <KeyboardArrowLeft /> {props.text}
      </div>
    </Link>
  );
};

BackButton.propTypes = {};

export default BackButton;
