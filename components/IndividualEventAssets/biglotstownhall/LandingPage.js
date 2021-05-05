import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import DateParse from '../../assets/DateParse';
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
        <h2>{main_event.EventName}</h2>

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
              format={`dddd MMMM DD h:mma`}
              date={main_event.eventStartEnd.StartDateTime}
            />{' '}
          </i>
          <Counter__JustNumbers
            start={main_event.eventStartEnd.StartDateTime}
            end={main_event.eventStartEnd.EndDateTime}
          />
        </div>
      </Inner>
    </Page>
  );
};

export default LandingPage;
