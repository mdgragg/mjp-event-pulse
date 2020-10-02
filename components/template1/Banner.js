import styled from "styled-components";
import React from "react";

const StyledBanner = styled.div`
  height: 300px;
  width: 100%;
  margin-top: 2em;
  left: 0;
  background-color: #1b2023;
  /* background-image: url('${(props) => props.image}'); */
  background-attachment: fixed;
  background-origin: center;
  background-repeat: no-repeat;
`;

const Banner = (props) => {
  return <StyledBanner image={props.image}>
      {props.children}
        </StyledBanner>;
};

export default Banner;
