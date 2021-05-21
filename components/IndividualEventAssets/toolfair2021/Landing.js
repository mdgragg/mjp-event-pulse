import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Counter__JustNumbers from '../../Counters/Counter__JustNumbers';
import DateParser from '../../assets/DateParse';
const ThePage = styled.div`
  color: white;
  width: 100%;
  text-align: center;
  min-width: 800px;
`;

import VideoBox__iFrame from '../../VideoBoxes/Video__iFrame';
import BannerWithPicture from '../../Banners/BannerWithPicture';

const Header = styled.div`
  height: 300px;
  background-color: ${(props) => props.theme.grey};
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 40% 60%;
  gap: 20px;
  && .landing-logo {
    height: 70%;
    max-height: 550px;
    width: auto;
  }
  && h1 {
    font-family: Akzidenz-Grotesque-Bold;
    font-size: 6rem;
    text-transform: uppercase;
  }
  && .right-wrap {
    max-width: 600px;
    margin: auto;
  }
  && h4 {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  && .date-span {
    color: ${(props) => props.theme.red};
  }
  && .counter {
    font-size: 1.5rem;
  }
  @media all and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 50% 50%;
    height: auto;
    gat: 0px;
  }
  && .landing-logo {
    max-height: 250px;
    margin: 2rem auto;
    height: 80%;
  }
`;

const Body = styled.div`
  min-height: calc(100vh - 300px);
  padding: 4rem;
  background-color: #1c1c1c;
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  && .player {
    width: 80%;
    margin: auto;
    border: 4px solid white;
  }
  @media all and (max-width: 800px) {
    min-height: 100%;
    padding: 5%;
    && .player {
      width: 100%;
    }
  }
`;
const Landing = ({ event_meta, hasAuth }) => {
  return (
    <ThePage>
      <Header>
        <img
          className="landing-logo"
          src={event_meta?.LogoLink[0].Media?.url}
          alt={event_meta.LogoLink[0].Description}
        />
        <div className="right-wrap">
          <h4>
            The Business Meeting Will Begin <br />
            <span className="date-span">
              <DateParser
                date={event_meta.eventStartEnd.StartDateTime}
                format={`h:mma dddd MMMM D`}
              />
            </span>
          </h4>
          <div className="counter">
            <Counter__JustNumbers
              start={event_meta.eventStartEnd.StartDateTime}
            />
          </div>
        </div>
      </Header>
      <Body>
        <div className="player">
          {hasAuth && <VideoBox__iFrame src={event_meta.streamLinks[0].url} />}
        </div>
      </Body>
      <BannerWithPicture
        imgUrl={event_meta?.LogoLink[0].Media?.url}
        color={'black'}
        secondary={`white`}
        headerText={`About This Event`}
        innerWidth={`750px`}
        buttonText={`Learn More`}
        buttonLink={`https://www.mactools.com/en-us`}
      >
        {event_meta.Description && event_meta.Description}
      </BannerWithPicture>
    </ThePage>
  );
};

Landing.propTypes = {};

export default Landing;
