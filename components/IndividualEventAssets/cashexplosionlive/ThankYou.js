import React from 'react';
import styled from 'styled-components';
import Counter from 'components/Counters/Counter';

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
      margin: 2rem auto;
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
  grid-template-columns: 1fr;
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

  @media all and (max-width: 768px) {
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
    && .counter {
      && h2 {
        font-size: auto;
        margin: 0 auto;
      }
      width: 75%;
      font-size: 100%;
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
          Thank you for attending <br />
          <span className="green">Cash Explosion's Fan Fair! </span>
          <br /> Check back soon for future events!
        </p>
      </ThanksArea>
    </ThanksWrap>
  );
};

export default SignUp;
