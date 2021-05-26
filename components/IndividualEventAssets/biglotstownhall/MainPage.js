import React from 'react';
import styled from 'styled-components';
import CenteredPlayer from 'components/BodyTemplates/CenteredPlayer';
import Banner_ImgBg from 'components/Banners/Banner_ImgBg';
import VideoBox__StickyTop from '../../VideoBoxes/Video__StickyTop';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import DateParse from '../../assets/DateParse';

const BG = styled.div`
  background-image: url('${(props) => props.theme.header_image}');
  background-color: ${(props) => props.theme.orange};
  height: 100vh;
  min-height: 1080px;
  width: 100%;
  background-repeat: repeat-y;
  position: absolute;
  background-size: 100% auto;
  @media all and (max-width: 768px) {
    background-size: cover;
  }
`;

const Header = styled.div`
  height: 25vh;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 768px) {
    height: auto;
    margin: 2rem auto;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  && .date {
    font-size: 1rem;
    color: white;
    text-align: center;
    font-family: Futura Bold;
    line-height: 2rem;
  }
  && .title > h2 {
    background-color: white;
    font-size: 2rem;
    font-family: 'Futura Bold';
    color: ${(props) => props.theme.orange};
    padding: 1.5rem;
    text-align: center;
    width: max-content;
    margin: auto;
  }
  && .logo-holder {
    width: 50%;
    height: 100%;
    text-align: center;
    justify-self: end;
  }
  @media all and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    row-gap: 1rem;
    && .title > h2 {
      font-size: 1.5rem;
      padding: 1rem;
      width: auto;
    }
    && .date {
      grid-row: -1;
    }
    && .title {
      grid-row: 2;
    }
    && .logo-holder {
      width: 40%;
      grid-row: 1;
      justify-self: center;
    }
  }
`;

const PlayerBody = styled.div`
  min-height: 60vh;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LandingPage = ({ main_event, hasAuth }) => {
  return (
    <BG>
      <Header>
        <Inner>
          <div className="date">
            <i>Friday, May 28 | 10:30 a.m. (EDT)</i>

            <Counter__JustNumbers
              start={main_event.eventStartEnd.StartDateTime}
              end={main_event.eventStartEnd.EndDateTime}
              afterStarted={<div>Live Now!</div>}
              afterEnded={<div>This Event Has Ended</div>}
            />
          </div>
          <div className="title">
            <h2>
              Big Lots <br /> Q1 Virtual Town Hall
            </h2>
          </div>
          <div className="logo-holder">
            <img
              src={main_event?.LogoLink[0]?.Media.url}
              alt="Big Lots logo B!"
            />
          </div>
        </Inner>
      </Header>
      <PlayerBody>
        <CenteredPlayer
          videoUrl={main_event.streamLinks[0].url}
          showing={hasAuth}
        />
      </PlayerBody>
    </BG>
  );
};

export default LandingPage;
