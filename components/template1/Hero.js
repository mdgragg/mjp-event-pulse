import styled, { keyframes } from "styled-components";
import {
  Grid,
  Card,
  AppHeader,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
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
   background-color: #000;
   overflow: hidden;
   color: white;
 `;

const Counter = styled.div`
position: absolute;
top: 50%;
left: 50%;
margin-top: 20px;
transform: translate(-50%, 30px);
text-align: center;
font-weight: bold;

background-color: black;
padding: 0.5em;
font-size: 2em;
`;

const StyledTypography = styled(Typography)`
z-index: 100;
position: absolute;
top: 40%;
text-align: center;
width: 100%;
`;


export default function Sidebar(props) {



  const StyledHero = styled.div`
    height: ${(props) => props.theme.heroHeight};
    background-image: url("${props.bgImage}");
    opacity: 0.25;
    animation-name: ${breatheAnimation};
    animation-iteration-count: infinite;
    animation-duration: 20s;
    background-size: cover;
    transform: scale(1.2);
    position: inherit;
    text-align: center;
    margin: -5px -10px -10px -5px;
  

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
      <Counter>Starts in 00h 35m 02s</Counter>
    </HeroHolder>
  );
}
