import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import DateParse from 'components/assets/DateParse';

const Page = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colors.orange};
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
    color: ${(props) => props.theme.colors.orange};
    padding: 1.5rem;
    text-align: center;
  }
`;
const LandingPage = ({ main_event }) => {
  return (
    <Page>
      <Inner>
        <h2>Big Lots</h2>
        <h2>Q2 Virtual Town Hall</h2>
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
              date={main_event.eventStartEnd.StartDateTime}
            ></DateParse>{' '}
          </i>
          <br />
          <Counter__JustNumbers
            prefix={`Join Us In:`}
            event={main_event}
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
