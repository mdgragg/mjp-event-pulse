import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
const HeaderWrap = styled.div`
  background-image: url('${(props) => props.theme.bgImage}');
  min-height: ${(props) => props.theme.heroHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  }
  && h4 {
    margin: 0;
    color: white;
    font-family: Source-Sans-Regular;
    font-size: 1.5rem;
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
  margin: auto;

  && .single-ambassador {
    margin: 1rem auto;
    width: 280px;
    padding: 20px;
  }

  && div.single-ambassador:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.25);
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
`;

const TheFooter = styled.div`
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
const CABLE = ({ theme, speakers, metadata }) => {
  speakers = _.orderBy(speakers, ['LastName', 'FirstName'], ['asc']);
  return (
    <>
      <HeaderWrap>
        <h1>CABLE Bioeconomy Policy Roundtable</h1>
        <h2>Join The Conversation</h2>
        <h4>Click the button to join the Zoom meeting</h4>
        <button
          onClick={() => {
            window.location.href = metadata.streamLinks[0]?.url || null;
          }}
        >
          {' '}
          Join
        </button>
      </HeaderWrap>
      <SpeakersSection>
        <h2>Cable Ambassadors</h2>
        <SpeakerMap>
          {speakers.map((spk) => (
            <div className="single-ambassador">
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
