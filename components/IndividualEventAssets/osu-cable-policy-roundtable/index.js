import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import Counter from 'components/Counters/Counter';
const HeaderWrap = styled.div`
  background-image: url('${(props) => props.theme.bgImage}');
  background-position: center center;
  background-repeat: no-repeat;

  min-height: ${(props) => props.theme.heroHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && .counter {
    margin-top: 100px;
    /* background-color: red; */
  }
  && h1 {
    font-family: Source-Sans-Bold;
    font-size: 5rem;
    max-width: 800px;
    text-align: center;
    color: white;
    letter-spacing: 4px;
    text-shadow: 2px 4px 6px #181818;
    margin: 4rem auto;
  }
  && h2 {
    text-transform: uppercase;
    font-size: 2rem;
    text-shadow: 1px 2px 6px #181818;
    color: white;
    letter-spacing: 2px;
    margin: 1rem auto;
    text-align: center;
  }
  && h4 {
    margin: 0;
    color: white;
    font-family: Source-Sans-Regular;
    font-size: 1.5rem;
    text-align: center;
  }
  && button {
    min-width: 200px;
    padding: 1rem;
    border-radius: 50px;
    font-family: Source-Sans-Bold;
    font-size: 1.25rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.green};
    margin-top: 4rem;
    transition: all 0.5s ease;
  }
  && button:hover {
    background-color: ${(props) => props.theme.green};
    color: white;
    transform: scale(1.25);
    box-shadow: 0px 0px 20px -10px black;
  }
  @media all and (max-width: 500px) {
    padding: 1rem;
    justify-content: flex-start;
    && h1 {
      font-size: 3rem;
      line-height: 2.85rem;
    }
    && h2 {
      font-size: 2rem;
      max-width: 70%;
    }
  }
`;

const SpeakersSection = styled.div`
  min-height: 80vh;
  && h2 {
    text-align: center;
    margin: 4rem auto;
    font-size: 3rem;
    color: ${(props) => props.theme.darkGreen};
    text-transform: uppercase;
    font-family: Source-Sans-Bold;
    letter-spacing: 3px;
  }
`;

const SpeakerMap = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 3rem auto;

  && .single-ambassador {
    margin: 1rem auto;
    width: 270px;
    padding: 20px;
    transition: transform 0.4s ease, box-shadow 1s ease;

    @media all and (max-width: 500px) {
      /* margin: 1rem auto; */
      width: 90%;
      padding: 20px;
    }
  }
  && div.single-ambassador:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 15px -10px black;
    cursor: pointer;
  }
  && div.single-ambassador:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.35);
  }
  && div.single-ambassador:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.65);
  }
  && .ambassador-picture {
    width: 100%;
  }
  && h3 {
    text-align: center;
    font-size: 1rem;
    color: ${(props) => props.theme.green};
    text-transform: uppercase;
  }
  && .single-ambassador--description {
    /* text-align: center; */
    font-size: 1rem;
  }
  @media all and (max-width: 768px) {
    max-width: 100vw;
  }
`;

const TheFooter = styled.div`
  background: ${(props) => props.theme.darkGreen}
    url('${(props) => props.theme.bgImage}');
  background-blend-mode: soft-light;
  background-position: center bottom;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background-color: ${(props) => props.theme.darkGreen};
  && .footer--copy {
    color: white;
    font-size: 1.75rem;
  }
  && h4 {
    margin: 0 auto;
    font-family: Source-Sans-Regular;
  }
  && span.plus {
    font-size: 10rem;
    font-weight: 800;
    line-height: 150px;
  }
`;
const CABLE = ({ theme, speakers, metadata, hasStarted }) => {
  speakers = _.orderBy(speakers, ['LastName', 'FirstName'], ['asc']);
  return (
    <>
      <HeaderWrap>
        <h1>CABLE Bioeconomy Policy Roundtable</h1>
        <h2>Join The Conversation</h2>
        <h4>Click the button to join the Zoom meeting</h4>
        <Counter
          customClass={'counter'}
          fontSize={'1.25rem'}
          shadow={'0px'}
          bgColor={'rgba(255,255,255,0.45)'}
          textColor={theme.darkGreen}
          hasStarted={hasStarted}
          afterStarted={
            <button
              onClick={() => {
                window.location.href = metadata.streamLinks[0]?.url || null;
              }}
            >
              Join
            </button>
          }
          start={metadata.eventStartEnd.StartDateTime}
        />
      </HeaderWrap>
      <SpeakersSection>
        <h2>Cable Ambassadors</h2>
        <SpeakerMap>
          {speakers.map((spk) => (
            <div
              className="single-ambassador"
              key={`single-ambassador--${spk.FirstName}`}
            >
              <img
                className="ambassador-picture"
                src={spk.Thumbnail[0].url}
                alt={`headshot of ${spk.FirstName}`}
              />
              <h3>
                {spk.FirstName} {spk.LastName}
              </h3>
              <div className="single-ambassador--description">
                {spk.Description}
              </div>
            </div>
          ))}
        </SpeakerMap>
      </SpeakersSection>
      <TheFooter>
        <div className="footer--copy">
          <h4>National Institute of Food and Agriculture (NIFA)</h4>
          <h4>Competitive Grant no. 2017-6700-926770</h4>
          <h4>US Department of Agriculture (USDA)</h4>
          <span className="plus">+</span>
        </div>
      </TheFooter>
    </>
  );
};

CABLE.propTypes = {};

export default CABLE;
