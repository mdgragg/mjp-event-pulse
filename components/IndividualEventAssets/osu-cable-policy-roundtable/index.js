import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  }
  && button:hover {
    background-color: ${(props) => props.theme.green};
    color: white;
  }
`;

const SpeakersSection = styled.div`
  min-height: 80vh;
  && h2 {
    text-align: center;
    margin: 4rem auto;
  }
`;

const SpeakerMap = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  margin: auto;

  && .single-ambassador {
    margin: 1rem 1rem;
    width: 250px;
  }
  && .ambassador-picture {
    width: 100%;
  }
  && h3 {
    text-align: center;
  }
  && .single-ambassador--description {
    text-align: center;
  }
`;

const TheFooter = styled.div`
  height: 400px;
  text-align: center;
  background-color: ${(props) => props.theme.green};
`;
const CABLE = ({ theme }) => {
  const speakers = [0, 1, 2, 3, 4];
  return (
    <>
      <HeaderWrap>
        <h1>CABLE Bioeconomy Policy Roundtable</h1>
        <h2>Join The Conversation</h2>
        <h4>Click the button to join the Zoom meeting</h4>
        <button> Join</button>
      </HeaderWrap>
      <SpeakersSection>
        <h2>Cable Ambassadors</h2>
        <SpeakerMap>
          {speakers.map((spk) => (
            <div className="single-ambassador">
              <img
                className="ambassador-picture"
                src="https://placehold.co/400x400"
              />
              <h3>First Name Last</h3>
              <div className="single-ambassador--description">
                {' '}
                The component is suitable for most use cases, but you can also
                build your own component to do routing. Next.js makes this easy
                for you with the router API available in next/router. If you
                want to do something (for example, submit a form) before
                navigating to a new route, you can define that in your custom
                routing code. When you use custom components for routing, you
                can add prefetching to them too. To implement prefetching in
                your routing code, use the prefetch method from useRouter.{' '}
              </div>
            </div>
          ))}
        </SpeakerMap>
      </SpeakersSection>
      <TheFooter />
    </>
  );
};

CABLE.propTypes = {};

export default CABLE;
