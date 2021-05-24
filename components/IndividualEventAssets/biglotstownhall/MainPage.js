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
  && h2 {
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
    && h2 {
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

const PlayerBody = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LandingPage = ({ main_event }) => {
  return (
    <BG>
      <Header>
        <Inner>
          <div
            style={{
              fontSize: '1rem',
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Futura Bold',
              lineHeight: '2rem',
            }}
          >
            <i>
              <DateParse
                format={`dddd MMMM DD h:mma`}
                date={main_event.eventStartEnd.StartDateTime}
              />{' '}
            </i>
            <Counter__JustNumbers
              start={main_event.eventStartEnd.StartDateTime}
              end={main_event.eventStartEnd.EndDateTime}
              afterStarted={`Live Now!`}
            />
          </div>
          <h2>
            Big Lots <br /> Q1 Virtual Town Hall
          </h2>
          <div className="logo-holder">
            <img
              src={main_event?.LogoLink[0]?.Media.url}
              alt="Big Lots logo B!"
            />
          </div>
        </Inner>
      </Header>
      <PlayerBody>
        <CenteredPlayer videoUrl={main_event.streamLinks[0].url} />
      </PlayerBody>
    </BG>
  );
};

export default LandingPage;
