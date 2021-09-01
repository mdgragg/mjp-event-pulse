import PropTypes from 'prop-types';
import styled, { keyframes, ThemeContext } from 'styled-components';
import { Typography } from '@material-ui/core';
import Counter from 'components/Counters/Counter';
import { Fragment } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useContext } from 'react';
import { BoxedCounter, Counter__JustNumbers } from 'components/Counters';
import { Button__Primary } from 'components/Buttons';

const HeroWrap = styled.div`
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
  && img.logo {
    max-width: 250px;
  }
  @media all and (max-width: 550px) {
    padding: 1rem;
    min-height: unset;
    && img.logo {
      max-width: 150px;
    }
  }
`;

const Sayings = styled.div`
  display: grid;
  width: 100%;
  max-width: 448px;
  text-align: center;
  grid-template-columns: repeat(3, auto);
  color: ${(props) => props.theme.colors.blue};
  font-weight: 600;
  @media all and (max-width: 550px) {
    grid-template-columns: 1fr;
    && div {
      margin: 0.15rem;
      font-size: 1rem;
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
      <img className="logo" src={main_event.LogoLink[0].Media.url} alt="" />
      <Sayings>
        <div>Offer Hope</div>
        <div>Restore Dignity</div>
        <div>Transform Lives</div>
      </Sayings>
    </HeroWrap>
  );
};

export default VOAHeader;
