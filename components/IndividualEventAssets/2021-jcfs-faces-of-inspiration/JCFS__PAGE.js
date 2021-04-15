import React from 'react';
import Body from '../../Body.js';
import FaceMap from './FaceMap';
import SingleBox from './SingleBox';
import styled from 'styled-components';
import DateParse from 'components/assets/DateParse.js';
import Banner from 'components/Banners/Banner.js';
import Banner_ImgBg from 'components/Banners/Banner_ImgBg.js';
import SponsorSection from './SponsorSection.js';

const PageGlobal = styled.div`
  && button {
    width: 200px;
    border-radius: 80px;
    font-size: 1.5rem;
    padding: 10px 0px;
    font-weight: 800;
  }
  @media all and (max-width: 868px) {
    && button {
      width: auto;
      border-radius: 80px;
      padding: 10px 20px;
      font-size: 0.75rem;
    }
  }
`;

const Hero = styled.div`
  min-height: ${(props) => props.theme.heroHeight};
  position: relative;
  /* background-color: rgba(255, 255, 255, 1); */
  background-color: black;
  color: white;
  z-index: 1;
  && .hero-content {
    /* position: relative; */
    width: 100%;
    margin: auto;
    text-align: center;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    && h1 {
      font-family: Arizonia-Regular;
    }
  }
  &&::after {
    z-index: -1;
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.65;
    background-image: url('${(props) => props.theme.bgImage}');
  }
`;

const FirstSection = styled.div`
  padding-top: 4rem;
  width: 100%;
  min-height: 500px;
  max-width: 1200px;
  margin: auto;
  z-index: 100;
  position: relative;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const JCFS__PAGE = ({ main_event, theme }) => {
  return (
    <PageGlobal>
      <Hero>
        <div className="hero-content">
          <h1>{main_event.EventName}</h1>
          <h2>
            <DateParse date={main_event.eventStartEnd.StartDateTime} />
          </h2>
        </div>
      </Hero>
      <FaceMap />
      <Body style={{ zIndex: 150 }}>
        <FirstSection>
          <SingleBox
            titleTextColor={theme.blue}
            titleText="Watch the Co-Chair's Welcome"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Watch Now"
            imgSrc={`https://placehold.co/400x300`}
          />
          <SingleBox
            titleTextColor={theme.blue}
            titleText="Double Your Gift Here"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Donate"
            imgSrc={`https://placehold.co/400x300`}
          />
        </FirstSection>
        <Banner_ImgBg
          color={theme.blue}
          imgSrc={`https://placehold.co/1080x400`}
        >
          <div
            style={{
              height: '400px',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2>Hello World</h2>
            <p>
              {' '}
              We will need the description for the thank you message, this is
              placeholder for the main program.
            </p>
            <button>JOIN US</button>
          </div>
        </Banner_ImgBg>
        <SponsorSection></SponsorSection>
        <br />
        <Banner color={theme.blue}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              margin: '4rem 0',
              maxWidth: '1200px',
            }}
          >
            <SingleBox
              titleTextColor={'white'}
              titleText="Learn about our newest program with the St. Petersburg Police Department - CALL"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Learn More"
            />
            <SingleBox
              titleTextColor={'white'}
              titleText="Need Help? Contact the Help Desk"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Help"
            />
          </div>
        </Banner>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: '4rem auto',
            maxWidth: '1200px',
          }}
        >
          <SingleBox
            titleTextColor={'black'}
            titleText="Post-Event Q&A with Dr. Sandra Braham and Board Members"
            buttonColor={theme.lightBlue}
            buttonTextColor="white"
            buttonText="Join Us"
            imgSrc={`https://placehold.co/400x300`}
          />
          <SingleBox
            titleTextColor={'black'}
            titleText="Post-Event Mett and Greet with Craig and Jan Sher"
            buttonColor={theme.lightBlue}
            buttonTextColor="white"
            buttonText="Join Us"
            imgSrc={`https://placehold.co/400x300`}
          />
        </div>
      </Body>
    </PageGlobal>
  );
};

export default JCFS__PAGE;
