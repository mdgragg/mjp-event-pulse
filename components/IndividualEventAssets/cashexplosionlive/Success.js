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
  width: 90%;
  max-width: 1600px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  && .logo {
    /* max-width: 350px; */
    width: auto;
    height: 15vh;
    min-height: 200px;
  }

  @media all and (max-width: 768px) {
    && .logo {
      height: 100px;
      min-height: 100px;
    }
    && .counter {
      display: none;
    }
  }
`;

const ThanksArea = styled.div`
  width: 100%;
  max-width: 1600px;
  && p {
    text-transform: uppercase;
    font-family: House-Gothic;
    max-width: 700px;
    margin: 2rem auto;
    letter-spacing: 5px;
    font-size: 2.5rem;
    color: white;
  }
  && span {
    color: ${(props) => props.theme.green};
  }
  @media all and (max-width: 768px) {
    && p {
      font-size: 1.5rem;
      letter-spacing: 2px;
    }
  }
`;

const InfoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 2rem auto;
  && div {
    background-color: ${(props) => props.theme.green};
    color: white;
    font-size: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 1rem;
    min-height: 250px;
    text-transform: uppercase;
    padding: 1rem;
  }
  && div.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  && span {
    font-size: 3rem;
    font-family: House-Gothic;
    background-color: ${(props) => props.theme.white || 'white'};
    width: 70px;
    color: ${(props) => props.theme.green};
    height: 70px;
    padding: 3px;
    border-radius: 60px;
    margin-bottom: 1rem;
  }
  @media all and (max-width: 1200px) {
    && div.info {
      font-size: 1.5rem;
    }
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    && div {
      padding: 2rem;
    }
    && div.info {
      font-size: 2rem;
    }
  }

  @media all and (max-width: 550px) {
    && span {
      font-size: 1.75rem;
      height: 100%;
      width: 45px;
    }
    && div {
      padding: 0.85rem;
      min-height: auto;
    }
    && div.info {
      font-size: 1rem;
    }
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
          Thank you for your interest in attending Cash Explosion Fan Fair!
          <br /> Come back
          <span className="green"> Saturday May 1st @ 7:30pm</span> to register.
        </p>
      </ThanksArea>
      <InfoBoxes>
        <div>
          <span> 1</span>
          <div className="info">
            {' '}
            You must register to be eligible to win $100, $1000, or $5000 in
            cash prize giveaways!{' '}
          </div>
        </div>
        <div>
          <span> 2</span>
          <div className="info">
            Registration will be available on this page starting at 7:30pm
            Saturday May 1st. You must register to be eligible to win!
          </div>
        </div>
        <div>
          {' '}
          <span> 3</span>
          <div className="info">The winning begins at 8:00pm</div>
        </div>
      </InfoBoxes>
      <div className="counter">
        <Counter
          bgColor="none"
          headerFontSize="4rem"
          counterFontSize="1.5rem"
          shadow="none"
          title="REGISTRATION BEGINS IN"
          start={main_event.eventStartEnd.StartDateTime}
        />
      </div>
    </ThanksWrap>
  );
};

export default SignUp;
