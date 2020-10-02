import styled, { keyframes } from "styled-components";
import {
  Grid,
  Card,
  AppHeader,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Counter from './Counter'
import { Fragment } from "react";

const breatheAnimation = keyframes`
0% { transform: scale(1.2) }
50% {transform: scale(1.5) }
100% {transform: scale(1.2) }
`;

 const HeroHolder = styled.div`
   position: relative;

   width: 100%;
   height: ${(props) => props.theme.heroHeight};
   background-color: rgba(0,0,0,0.5);
   overflow: hidden;
   color: white;
 `;

const StyledTypography = styled(Typography)`
z-index: 99;
position: absolute;
top: 30%;
text-align: center;
width: 100%;
`;


export default function Sidebar(props) {



  const StyledHero = styled.div`
    height: ${(props) => props.theme.heroHeight};
    background-image: url("${props.bgImage}");
    opacity: 1;
    /* animation-name: ${breatheAnimation}; */
    animation-iteration-count: infinite;
    animation-duration: 20s;
    background-size: cover;
    background-attachment: fixed;
    transform: scale(1.2);
    position: inherit;
    text-align: center;
    margin: -5px -10px -10px -5px;
    z-index: 99;

    filter: saturate(0.7) blur(10px);
    ::after {
      filter: blur(0px);
      position: absolute;
    }
  `;


  return (
    <HeroHolder>
      <StyledHero></StyledHero>
      <StyledTypography variant="h2">
        {props.title} <br />
      </StyledTypography>
      <Counter start={props.start[0].eventStartEnd.StartDateTime}/>
    </HeroHolder>
  );
}
