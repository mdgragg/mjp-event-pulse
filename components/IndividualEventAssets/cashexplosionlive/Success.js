import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

const ThanksWrap = styled.div`
  min-height: 80vh;
  display: flex;
  margin: 2rem auto;
  width: 98%;
  max-width: 1600px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  && h3 {
    font-family: Avenir;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  && .logo {
    width: auto;
    height: 15vh;
    min-height: 280px;
  }
  && .counter > h3 {
    font-size: 1.75rem;
    margin: 0 auto;
  }

  @media all and (max-width: 1000px) {
    && .logo {
      min-height: 150px;
    }
    && .counter {
      margin: 1rem auto;
    }
    && .counter > h3 {
      font-size: 1.35rem;
    }
  }
`;

const ThanksArea = styled.div`
  width: 60%;
  text-transform: uppercase;
  font-family: House-Gothic;
  max-width: 800px;
  margin: 2rem auto;
  letter-spacing: 5px;

  font-size: 2.5rem;
  color: white;
  width: 100%;

  && span.green {
    color: ${(props) => props.theme.green};
  }
  && div.white-bg {
    background-color: ${(props) => props.theme.purple};
    padding: 6px 10px;
    margin: 1rem auto;
    width: 100%;
  }
  @media all and (max-width: 1000px) {
    width: 98%;
    font-size: 1.85rem;
    margin: 0rem auto;
    letter-spacing: 2px;
  }
`;

const InfoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 98%;
  margin: 1rem auto;
  && div.box {
    background-color: ${(props) => props.theme.green};
    color: white;
    font-size: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 1rem;
    min-height: 380px;
    padding: 2rem;
  }
  && div.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
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
  }

  @media all and (max-width: 1000px) {
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-auto-rows: 250px;
    && span {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      padding: 3px;
    }
    && div.box {
      padding: 1.5rem;
      width: 100%;
      max-width: 600px;
      min-height: unset;
      height: 220px;
      margin: auto;
    }
    && div.info {
      margin-top: 1rem;
      font-size: 1.35rem;
      height: 100px;
    }
  }
`;
const SignUp = ({ main_event }) => {
  return (
    <ThanksWrap>
      <img src={main_event.LogoLink[0].Media.url} className="logo" />
      <div className="counter">
        <h3>
          Registration Opens In{' '}
          <Counter__JustNumbers
            start={main_event.eventStartEnd.StartDateTime}
            start={main_event.eventStartEnd.EndDateTime}
          />
        </h3>
      </div>

      <ThanksArea>
        <div className="white-bg">
          Thank you! You'll receive an email reminder about the event
        </div>
        <div className="white-bg">
          Come back
          <span className="green"> June 19th @ 7:30pm</span> to register
        </div>
      </ThanksArea>
      <InfoBoxes>
        <div className="box">
          <span> 1</span>
          <div className="info">
            {' '}
            You must register to be eligible to win up to $25,000 in cash prize
            giveaways!{' '}
          </div>
        </div>
        <div className="box">
          <span> 2</span>
          <div className="info">
            Registration will be available on this page starting at 7:30pm
            Saturday June 19th. You must register to be eligible to win!
          </div>
        </div>
        <div className="box">
          {' '}
          <span> 3</span>
          <div className="info">The winning begins at 8:00pm</div>
        </div>
      </InfoBoxes>
    </ThanksWrap>
  );
};

export default SignUp;
