import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
          <h1>{main_event.EventName}</h1>
          <CircleCounter event={main_event} prefix={<h2> Join Us In:</h2>} />
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
