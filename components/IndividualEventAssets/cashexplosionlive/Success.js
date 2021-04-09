import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
import PublicChat from 'components/Chat/PublicChat';
import Counter from 'components/Counters/Counter';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const ThanksWrap = styled.div`
  min-height: 80vh;
  display: flex;
  margin-top: 3rem;
  width: 80%;
  max-width: 1200px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  && img.logo {
    height: auto;
    max-width: 300px;
  }
`;

const ThanksArea = styled.div`
  width: 100%;
  max-width: 800px;
  && p {
    text-transform: uppercase;
    font-family: House-Gothic;
    max-width: 600px;
    margin: 0 auto;
    letter-spacing: 5px;
    font-size: 3.5rem;
    color: ${(props) => props.theme.lightGreen};
  }

  && span.white {
    color: white;
  }
`;

const InfoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  && div {
    background-color: ${(props) => props.theme.green};
    color: white;
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 1rem;
    height: 200px;
    padding: 1rem;
  }
`;
const SignUp = ({ main_event }) => {
  return (
    <ThanksWrap>
      <img
        src={main_event.KeyValue.find((kv) => kv.key === 'logo').value}
        className="logo"
      />

      <ThanksArea>
        <p>
          {' '}
          Thanks for your interest in CE's first ever livestream event happening{' '}
          <span className="white"> May 1st!</span>
        </p>
      </ThanksArea>
      <InfoBoxes>
        <div>
          {' '}
          YOU MUST REGISTER TO BE ELIGIBLE TO WIN ONE OF $16,000 IN PRIZE
          GIVEAWAYS!
        </div>
        <div>PRE-REGISTRATION WINDOW OPENS AT 7:30PM</div>
        <div> PRIZE GIVEAWAYS BEGIN AT 8:00PM</div>
      </InfoBoxes>
      <Counter
        bgColor="none"
        shadow="none"
        title="EVENT BEGINS IN"
        start={main_event.eventStartEnd.StartDateTime}
      />
    </ThanksWrap>
  );
};

export default SignUp;
