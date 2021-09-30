import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { Card, CardHeader } from '@material-ui/core';
import { BoxedCounter } from 'components/Counters';
import { LogoBelow, StyledInner, StyledSplash } from './Splash';
import { Button__Primary } from 'components/Buttons';

const DayWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 5rem auto;
`;

const SingleDayBox = styled(Card)`
  min-height: 400px;
  min-width: 250px;
  margin: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HomePage = ({ main_event }) => {
  return (
    <StyledSplash src={main_event.HeaderImage.url}>
      <Box__XYCentered>
        <StyledInner>
          <div>
            <img src={main_event.LogoLink[0]?.Media?.url} />
            <BoxedCounter event={main_event} />
          </div>
          <DayWrap>
            <SingleDayBox>
              <CardHeader
                title={`Day 1`}
                subheader={`Tuesday, October 5, 2021`}
              />
              <img src={`https://placehold.co/250x250`} />
              <Link href={'./day1'}>
                <Button__Primary>Join Day 1</Button__Primary>
              </Link>
            </SingleDayBox>
            <SingleDayBox>
              <CardHeader
                title={`Day 2`}
                subheader={`Wendesday, October 6, 2021`}
              />
              <img src={`https://placehold.co/250x250`} />
              <Link href={`./day2`}>
                <Button__Primary>Join Day 2</Button__Primary>
              </Link>
            </SingleDayBox>
          </DayWrap>
          <LogoBelow>
            <img src={main_event.LogoLink[1]?.Media?.url} />
            <img src={main_event.LogoLink[2]?.Media?.url} />
          </LogoBelow>
        </StyledInner>
      </Box__XYCentered>
    </StyledSplash>
  );
};

export default HomePage;
