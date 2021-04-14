import React from 'react';
import Body from '../../Body.js';
import FaceMap from './FaceMap';
import SingleBox from './SingleBox';
import styled from 'styled-components';
import DateParse from 'components/assets/DateParse.js';

const Hero = styled.div`
  min-height: ${(props) => props.theme.heroHeight};
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
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
    background-image: url('${(props) => props.theme.bgImage}');
  }
`;

const FirstSection = styled.div`
  padding-top: 200px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  z-index: 100;
  position: relative;
  display: flex;
  justify-content: space-around;
`;
const JCFS__PAGE = ({ main_event, theme }) => {
  return (
    <>
      <Hero>
        <div className="hero-content">
          <h1>{main_event.EventName}</h1>
          <h2>
            <DateParse date={main_event.eventStartEnd.StartDateTime} />
          </h2>
        </div>
        <FaceMap />
      </Hero>
      <Body>
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
      </Body>
    </>
  );
};

export default JCFS__PAGE;
