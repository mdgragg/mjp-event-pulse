import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

const ThanksWrap = styled.div`
  min-height: 80vh;
  display: flex;
  margin: 3rem auto;
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
  && .counter > h3 {
    font-size: 1.75rem;
  }

  @media all and (max-width: 768px) {
    && .logo {
      height: 100px;
      min-height: 150px;
    }
    && .counter {
      margin: 1rem auto;
    }
  }
`;

const ThanksArea = styled.div`
  width: 60%;
  text-transform: uppercase;
  font-family: House-Gothic;
  max-width: 700px;
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
  @media all and (max-width: 768px) {
    font-size: 2rem;
    margin: 0rem auto;
    letter-spacing: 2px;
  }
`;

const InfoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 2rem auto;
  && div.box {
    background-color: ${(props) => props.theme.green};
    color: white;
    font-size: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 1rem;
    min-height: 250px;
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
  @media all and (max-width: 768px) {
    && span {
      font-size: 1.75rem;
      height: 100%;
      width: 45px;
    }
    && div.box {
      padding: 0.85rem;
      min-height: auto;
    }
    && div.info {
      font-size: 1rem;
    }
    && .counter {
      && h3 {
        font-size: 1.75rem;
        margin: 0 auto;
      }
    }
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    && div.box {
      padding: 2rem;
    }
    && div.info {
      font-size: 2rem;
    }
  }
  @media all and (max-width: 1200px) {
    && div.info {
      font-size: 1.5rem;
    }
  }
`;
const SignUp = ({ main_event }) => {
  return (
    <ThanksWrap>
      <img
        src={main_event.KeyValue.find((kv) => kv.key === 'Logo').value}
        className="logo"
      />
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
        <div className="white-bg">Thank you for your interest in attending</div>
        <div className="white-bg">
          Come back
          <span className="green"> June 19th @ 7:30pm</span> to register.
        </div>
      </ThanksArea>
      <InfoBoxes>
        <div className="box">
          <span> 1</span>
          <div className="info">
            {' '}
            You must register to be eligible to win $100, $1000, or $5000 in
            cash prize giveaways!{' '}
          </div>
        </div>
        <div className="box">
          <span> 2</span>
          <div className="info">
            Registration will be available on this page starting at 7:30pm
            Saturday June 18th. You must register to be eligible to win!
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
