import styled from 'styled-components';
import React from 'react';
import { Typography, FormControl, Button, Input } from '@material-ui/core';

const StyledBanner = styled.div`
  height: auto;
  padding: 2em;
  display: flex;
  flex-direction: space-around;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  left: 0;
  background-color: ${(props) => props.color};
  background-image: url('${(props) => props.theme.header_img}');
  background-attachment: fixed;
  background-origin: center;
  background-repeat: no-repeat;

  && .banner-image {
    width: 80%;
    max-width: 450px;
    margin: 2rem auto;
    display: block;
  }
`;

const Agenda = ({ main_event }) => {
  return (
    <StyledBanner image={props.image} color={props.color}>
      <div
        style={{ maxWidth: `${props.innerWidth || '450px'}`, margin: 'auto' }}
      >
        <Typography
          variant="h4"
          component="h4"
          style={{ color: props.secondary, fontWeight: '800' }}
        >
          {props.headerText}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          style={{
            color: props.secondary,
            fontSize: '1.25rem',
            marginTop: '1rem',
          }}
        >
          {props.children}
        </Typography>
        {props.buttonText && (
          <a href={props.buttonLink}>
            <button> {props.buttonText}</button>
          </a>
        )}
        <img className="banner-image" src={props.imgUrl} />
      </div>
    </StyledBanner>
  );
};

export default Agenda;
