import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import Counter from 'components/Counters/Counter';
import VideoBox from 'components/VideoBoxes/Video__iFrame';

const WRAP = styled.div`
  font-family: Source-Sans-Bold;
  && h2 {
    font-size: 2rem;
    text-align: center;
    color: ${(props) => props.theme.darkGreen};
  }
  && h1 {
    font-size: 5rem;
    text-align: center;
  }

  && h4 {
    font-size: 1.5rem;
    text-align: center;
  }
`;
const HeaderWrap = styled.div`
  background-image: url('${(props) => props.theme.bgImage}');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
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
  max-width: 1920px;
  margin: auto;
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
  justify-content: center;
  max-width: 90%;
  margin: 3rem auto;

  && .single-ambassador {
    margin: 0.5rem;
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
  margin-top: 3rem;
  background: ${(props) => props.theme.darkGreen}
    url('${(props) => props.theme.bgImage}');
  background-blend-mode: soft-light;
  background-position: center bottom;
  background-size: cover;
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
const MainVideoSection = styled.div`
  min-height: 40vh;
  margin: 5rem auto;
  && .main-video {
    width: 50%;
    margin: auto;
  }
`;
const MultiVideoSection = styled.div`
  /* min-height: 40vh; */
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  && .video-map {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    width: 95%;
    margin: auto;
  }
  && .video-map h4 {
    color: ${(props) => props.theme.green};
  }
`;
const BGHR = styled.hr`
  height: 80px;
  margin: 0;
  background: ${(props) => props.theme.darkGreen}
    url('${(props) => props.theme.bgImage}');
  background-position: center -500px;
  background-size: cover;
  background-attachment: fixed;
`;
const CABLE = ({ theme, speakers, metadata, hasStarted, hasEnded }) => {
  speakers = _.orderBy(speakers, ['LastName', 'FirstName'], ['asc']);
  return (
    <WRAP>
      <HeaderWrap>
        <h1>CABLE Bioeconomy Policy Roundtable</h1>

        <Counter
          customClass={'counter'}
          fontSize={'2rem'}
          shadow={'0px'}
          bgColor={'rgba(255,255,255,0.65)'}
          textColor={theme.darkGreen}
          hasStarted={hasStarted}
          afterStarted={
            <>
              <h2>Join The Conversation</h2>
              <h4>Click the button to join the Zoom meeting</h4>
              <button
                onClick={() => {
                  window.location.href = metadata.streamLinks[0]?.url || null;
                }}
              >
                Join
              </button>
            </>
          }
          start={metadata.eventStartEnd.StartDateTime}
        />
      </HeaderWrap>
      {hasEnded ? (
        <>
          <MainVideoSection>
            <h2>
              Missed The Discussion? <br /> Re-Watch Below.
            </h2>
            <div className="main-video">
              <VideoBox src={metadata.streamLinks[0].url || ''}></VideoBox>
            </div>
          </MainVideoSection>
          <BGHR />
          <MultiVideoSection>
            <h2>Pillar Videos</h2>
            <div className="video-map">
              {/* {JSON.stringify(metadata.BreakoutSessions['Pillar Videos'])} */}
              {metadata.BreakoutSessions['Pillar Videos'].map((video) => (
                <div key={`single-video--${video.Name}`}>
                  <VideoBox src={video.Link.url}></VideoBox>
                  <h4> {video.Name} </h4>
                </div>
              ))}
            </div>
          </MultiVideoSection>
          <BGHR />
        </>
      ) : (
        ''
      )}
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
              <div
                className="single-ambassador--description"
                dangerouslySetInnerHTML={{ __html: spk.Description }}
              ></div>
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
    </WRAP>
  );
};

CABLE.propTypes = {};

export default CABLE;
