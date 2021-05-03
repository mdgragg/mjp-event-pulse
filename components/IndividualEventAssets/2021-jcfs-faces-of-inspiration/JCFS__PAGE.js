import React, { useEffect, useState } from 'react';
import Body from '../../Body.js';
import FaceMap from './FaceMap';
import SingleBox from './SingleBox';
import styled, { keyframes } from 'styled-components';
import MainProgram from './MainProgram';
import Banner from 'components/Banners/Banner.js';
import SponsorSection from './SponsorSection.js';
import BoxNoImage from './BoxNoImage.js';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const bob = keyframes`
0%{
  transform: scale(1)
}
50%{
  transform: scale(1.2)
}
100%{
  transform: scale(1)
}
`;

const PageGlobal = styled.div`
  && a {
    margin: 0;
    font-size: unset;
    padding: 0;
  }
  && button {
    width: 180px;
    border-radius: 80px;
    font-size: 1.25rem;
    padding: 10px 0px;
    font-weight: 800;
  }
  && h2 {
    font-size: 2.5rem;
    color: ${(props) => props.theme.blue};
  }
  @media all and (max-width: 868px) {
    && button {
      width: auto;
      border-radius: 80px;
      padding: 10px 20px;
      font-size: 0.75rem;
    }
  }
  && .arrow {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 3rem;
    background-color: white;
    color: ${(props) => props.theme.blue};
    border-radius: 50px;
    padding: 5px;
    animation: ${bob} 2s ease infinite;
    box-shadow: 0px 0px 11px -3px black;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  @media all and (max-width: 1200px) {
    && .arrow {
      bottom: 10px;
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
  min-height: 610px;
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
    min-height: 550px;
  }
  @media all and (max-width: 500px) {
    min-height: 550px;
  }
`;

const LogoArea = styled.div`
  position: absolute;
  z-index: 100;
  height: 300px;
  width: 100%;
  && img {
    position: absolute;
    width: auto;
  }
  && img.faces {
    height: 55%;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  && h2 {
    text-align: center;
    margin-top: 550px;
  }
  @media all and (max-width: 1200px) {
    && img.faces {
      width: 28%;
      top: 40px;
      height: auto;
    }
  }
  @media all and (max-width: 768px) {
    && img.faces {
      width: 50%;
    }

    && h2 {
      font-size: 0.75rem;
      margin-top: 160px;
    }
  }
  @media all and (max-width: 550px) {
    && img.faces {
      width: 50%;
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
  && a.learn-more {
    line-height: 2.5rem;
  }
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

          <ExpandMoreRoundedIcon
            className="arrow"
            onClick={() => window.scrollTo(0, 950)}
          />
        </LogoArea>
        {/* <div className="hero-content"></div> */}
      </Hero>

      <FaceMap faces={data.faces} />
      <Body style={{ zIndex: 150 }}>
        <FirstSection>
          <SingleBox
            titleTextColor={theme.blue}
            titleText="Craig & Jan Sher Award"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Watch Now"
            imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/post-event/jan-craig-post.png`}
            link="https://www.youtube.com/watch?v=CziVPHRRTg8"
          />
          <SingleBox
            titleTextColor={theme.blue}
            titleText="Holocaust Survivor Urgent Care Fund - Double Your Gift"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Donate"
            imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/match-2.png`}
            link="https://faces2021.givesmart.com"
          >
            {' '}
            <a
              className="learn-more"
              href="https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/Holocaust%20Survivor%20Urgent%20Care%20Fund%20-%20for%20MJ%20Lander.pdf"
            >
              Learn More
            </a>
          </SingleBox>

          <SingleBox
            titleTextColor={theme.blue}
            titleText="Barbara Sterensis Award"
            buttonColor={theme.green}
            buttonTextColor="white"
            buttonText="Watch Now"
            imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/post-event/sterensis.png`}
            link="https://www.youtube.com/watch?v=AD5OJyj_OS8"
          />
        </FirstSection>
        <MainProgram theme={theme} main_event={main_event} />
        {data.sponsors && <SponsorSection sponsors={data.sponsors} />}

        <Banner color={theme.blue}>
          <h2 style={{ color: 'white' }}> 2021 Featured Program Videos </h2>

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
              titleTextColor={theme.blue}
              titleText="Innovative Pilot Program with the St. Petersburg Police"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Watch Video Now"
              link="https://youtu.be/JxhanJjBB6M"
              imgSrc="https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/CALL-Logo-sq.png"
            />
            <SingleBox
              titleTextColor={theme.blue}
              titleText="Betty Goldberg, Holocaust Survivor Program"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Watch Now"
              link="https://www.youtube.com/watch?v=nZg99zbxnoU"
            />
            <SingleBox
              titleTextColor={theme.blue}
              titleText="Safe At Home Program"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Watch Now"
              link="https://www.youtube.com/watch?v=IOAUfEssFCg"
            />
            <SingleBox
              titleTextColor={theme.blue}
              titleText="Kinship Program"
              buttonColor={theme.lightBlue}
              buttonTextColor="white"
              buttonText="Watch Now"
              link="https://www.youtube.com/watch?v=xIZGlzAtpiU"
            />
          </div>
        </Banner>
      </Body>
    </PageGlobal>
  );
};

export default JCFS__PAGE;
