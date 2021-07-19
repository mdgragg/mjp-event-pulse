import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

const Page = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.orange};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Inner = styled.div`
  && h2 {
    background-color: white;
    font-size: 2rem;
    font-family: 'Futura Bold';
    color: ${(props) => props.theme.orange};
    padding: 1.5rem;
    text-align: center;
  }
`;
const LandingPage = ({ main_event }) => {
  return (
    <Page>
      <Inner>
        <h2>Big Lots</h2>
        <h2>Q1 Virtual Town Hall</h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Futura Bold',
            lineHeight: '2rem',
          }}
        >
          <i>Friday, May 28 | 10:30 a.m. (EDT)</i>
          <Counter__JustNumbers
            start={main_event.eventStartEnd.StartDateTime}
            end={main_event.eventStartEnd.EndDateTime}
            afterEnded={
              <div>
                This Event Has Ended <br /> Thank You For Attending!
              </div>
            }
          />
        </div>
      </Inner>
    </Page>
  );
};

export default LandingPage;
