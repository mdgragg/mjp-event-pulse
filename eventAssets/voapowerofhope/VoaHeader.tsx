import PropTypes from 'prop-types';
import styled, { keyframes, ThemeContext } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from 'components/Counters/Counter';
import { Fragment } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useContext } from 'react';
import { BoxedCounter, Counter__JustNumbers } from 'components/Counters';
import { Button__Primary } from 'components/Buttons';

const breatheAnimation = keyframes`
0% { transform: scale(1.2) }
50% {transform: scale(1.3) }
100% {transform: scale(1.2) }
`;

const HeroWrap = styled.div`
  position: relative;
  min-height: min-content;
  max-height: max-content;
  width: clamp(100vw, 100vw, 1200px);
  overflow: hidden;
  text-align: center;
`;

const HeroBgImage = styled.img`
  width: 100%;
  margin: auto;
  height: auto;
  /* max-height: 500px; */
  /* position: fixed; */
  z-index: -1;
`;

const HeroContent = styled.div`
  position: absolute;
  display: grid;
  width: 90%;
  height: 100%;
  margin: auto;
  grid-template-columns: 50% 50%;
  align-items: center;
  z-index: 1000;
  pointer-events: all;
  && div.logo-counter__div {
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  && img.logo {
    width: 50%;
  }
  && .counter--numbers {
    display: none;
  }
  @media all and (max-width: 1200px) {
    && .counter {
      display: none;
    }
    && img.logo {
      width: 80%;
    }
    && .counter--numbers {
      display: block;
      width: 50%;
      font-size: 0.75rem;
      color: ${(props) => props.theme.colors.green};
      font-weight: 800;
      text-align: left;
    }
  }
`;

type VOAHeroWithImage__Props = {
  // This is an optional image to display in the center of the header
  main_event?: any;
  children?: React.ReactNode;
};

const VOAHeader = ({ main_event, children }: VOAHeroWithImage__Props) => {
  const theme: any = useContext(ThemeContext);
  return (
    <HeroWrap>
      <HeroContent>
        <div className="logo-counter__div">
          <img className="logo" src={main_event.LogoLink[1].Media.url} />
          <BoxedCounter event={main_event} className="counter" />
          <div className="counter--numbers">
            <Counter__JustNumbers event={main_event} />
          </div>
          <a href="#event">
            <Button__Primary>Take Me There</Button__Primary>
          </a>
        </div>
        <div></div>
      </HeroContent>
      <HeroBgImage src={theme.header_image} />
    </HeroWrap>
  );
};

export default VOAHeader;
