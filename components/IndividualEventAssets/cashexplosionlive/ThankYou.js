import React from 'react';
import styled from 'styled-components';
import Counter from 'components/Counters/Counter';

const ThanksWrap = styled.div`
  min-height: 80vh;
  display: flex;
  margin: 0 auto;
  width: 90%;
  max-width: 1600px;
  flex-direction: column;
  position: relative;
  align-items: center;
  text-align: center;
  && .logo {
    /* max-width: 350px; */
    width: auto;
    min-height: 200px;
    margin: 4rem;
  }

  && .logo img {
    height: auto;
    width: 50%;
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

const SignUp = ({ main_event }) => {
  return (
    <ThanksWrap>
      <div className="logo">
        <img src={main_event.KeyValue.find((kv) => kv.key === 'Logo').value} />
      </div>

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
