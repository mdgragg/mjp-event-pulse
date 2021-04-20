import React, { useEffect, useState } from 'react';
import Body from '../../Body.js';
import FaceMap from './FaceMap';
import SingleBox from './SingleBox';
import styled from 'styled-components';
import DateParse from 'components/assets/DateParse.js';
import Banner from 'components/Banners/Banner.js';
import Banner_ImgBg from 'components/Banners/Banner_ImgBg.js';
import SponsorSection from './SponsorSection.js';
import BoxNoImage from './BoxNoImage.js';

const PageGlobal = styled.div`
  && button {
    width: 180px;
    border-radius: 80px;
    font-size: 1.25rem;
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
  min-height: 900px;
  && .hero-content {
    position: relative;
    width: 100%;
    margin: auto;
    text-align: center;
    height: inherit;
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
  @media all and (max-width: 1200px) {
    min-height: 650px;
  }
`;

const LogoArea = styled.div`
  position: absolute;
  z-index: 100;
  height: 400px;
  width: 100%;
  && img {
    position: absolute;
    width: auto;
  }
  && img.faces {
    top: 50px;
    left: 20%;
  }
  && img.of-inspiration {
    top: 100%;
    left: 50%;
  }
  && h2 {
    text-align: center;
    margin-top: 550px;
  }
  @media all and (max-width: 1200px) {
    && img.faces {
      width: 50%;
    }
    && img.of-inspiration {
      width: 30%;
      top: 60%;
    }
    && h2 {
      text-align: center;
      margin-top: 320px;
    }
  }
  @media all and (max-width: 500px) {
    && img.faces {
      width: 50%;
    }
    && img.of-inspiration {
      width: 30%;
      top: 30%;
    }
    && h2 {
      font-size: 0.75rem;
      margin-top: 160px;
    }
  }
`;

const FirstSection = styled.div`
  padding-top: 4rem;
  width: 100%;
  min-height: 250px;
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
  const [data, setData] = useState({ faces: null, sponsors: null });
  useEffect(() => {
    const fetchFaces = async () => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events/56/analytics`
      ).then((res) => res.json());
    };

    fetchFaces().then((res) => {
      if (res.Analytics?.faces) {
        setData(res.Analytics);
      }
    });
  }, []);

  return (
    <PageGlobal>
      <Hero>
        <LogoArea className="logo-area">
          <img className="faces" src={main_event.KeyValue[0].value} />
          <img className="of-inspiration" src={main_event.KeyValue[1].value} />
          <h2>
            <DateParse date={main_event.eventStartEnd.StartDateTime} />
          </h2>
        </LogoArea>
        {/* <div className="hero-content"></div> */}
      </Hero>

      <FaceMap faces={data.faces} />
      <Body style={{ zIndex: 150 }}>
        <FirstSection>
          <BoxNoImage
            titleTextColor={theme.blue}
            titleText="Watch the Co-Chairs' Welcome"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Watch Now"
            link="https://us02web.zoom.us/j/81055552981?pwd=azU1NjVFRCtCUjBCQUZMRXJZUmt2UT09"
          />
          <BoxNoImage
            titleTextColor={theme.blue}
            titleText="Double Your Gift Here"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Donate"
            link="https://faces2021.givesmart.com"
          />
        </FirstSection>
        <Banner_ImgBg
          color={theme.blue}
          imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/main-event.png`}
        >
          <div
            style={{
              height: '600px',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2>Main Program</h2>
            <p
              style={{
                maxWidth: '380px',
                margin: '2rem auto',
                fontSize: '1rem',
              }}
            >
              {main_event.Description
                ? main_event.Description
                : 'We will need the description for the thank you message, this is placeholder for the main program.'}
            </p>
            <button
              onClick={() =>
                (window.location.href = main_event.streamLinks[0].url)
              }
            >
              JOIN US
            </button>
          </div>
        </Banner_ImgBg>
        {data.sponsors && <SponsorSection sponsors={data.sponsors} />}

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
              link="https://youtu.be/JxhanJjBB6M"
            />
            <SingleBox
              titleTextColor={'white'}
              titleText="Need Help? Contact the Help Desk"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Help"
              link="https://us02web.zoom.us/j/82756728006?pwd=ZVBOSzNxQldVbkRTdTZGdlJnUXp2dz09"
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
            imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/sandra-qa.png`}
            link="https://us02web.zoom.us/j/86773127001?pwd=U015SitMSERXZXZCYUY4UWFXUGdMZz09"
          />
          <SingleBox
            titleTextColor={'black'}
            titleText="Post-Event Meet and Greet with Craig and Jan Sher"
            buttonColor={theme.lightBlue}
            buttonTextColor="white"
            buttonText="Join Us"
            imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/jan-wayne.png`}
            link="https://us02web.zoom.us/j/82207856018?pwd=TElpcjBmcGpVaW5JR1JrTzdNN3lTUT09"
          />
        </div>
      </Body>
    </PageGlobal>
  );
};

export default JCFS__PAGE;
