import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateParse from 'components/__Assets__/DateParse';
import { SolidColorHero } from 'components/Heroes';
import { CenteredPlayer } from 'components/BodyTemplates';
import { CircleCounter } from 'components/Counters';

const Hero__Inner = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  && img {
    width: 90%;
    max-width: 250px;
    margin: 1rem auto;
  }
`;

const PageInner = styled.div`
  max-width: 1200px;
  min-height: calc(100vh - 400px);
  margin: 3rem auto;
  @media all and (max-width: 1000px) {
    width: 93%;
  }
`;
const MainPage = ({ main_event, hasAuth }) => {
  return (
    <div>
      <SolidColorHero>
        <Hero__Inner>
          <img src={main_event?.LogoLink[0]?.Media.url} />
          <i>
            <DateParse
              date={main_event.eventStartEnd.StartDateTime}
              format={`dddd MMMM DD, YYYY`}
            />{' '}
          </i>
        </Hero__Inner>
      </SolidColorHero>
      <PageInner>
        <CenteredPlayer
          videoUrl={main_event.streamLinks[0].url}
          hasStarted={hasAuth}
        ></CenteredPlayer>
      </PageInner>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
