import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const SignUpWrap = styled.div`
  /* min-height: 80vh; */
  display: flex;
  margin-top: 3rem;
  width: 80%;
  max-width: 800px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  && .logo {
    /* max-width: 350px; */
    width: auto;
    max-height: 20vh;
    min-height: 250px;
  }
  @media all and (max-width: 768px) {
    width: 90%;
  }
`;
const CTA = styled.div`
  background-color: ${(props) => props.theme.green};
  color: white;
  margin: 3rem auto;
  text-transform: uppercase;
  padding: 1rem;
  font-size: 2rem;
  /* line-height: 2.45rem; */
  && span.dollars {
    display: block;
    font-size: 3rem;
    letter-spacing: 6px;
    /* line-height: 4rem; */
    font-weight: 800;
    font-family: House-Gothic;
  }
  @media all and (max-width: 768px) {
    && span.dollars {
      font-size: 2.5rem;
    }
  }
`;
const EnterArea = styled.div`
  &&.loading {
    opacity: 0.85;
  }

  width: 100%;
  margin: 3rem auto;
  && input {
    font-size: 1.5rem;
    padding: 2rem;
    width: 100%;
    text-align: center;
  }
  @media all and (max-width: 768px) {
    margin: 0 auto;
  }
`;

const EnterText = styled.div`
  color: white;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin: auto;
  && .downIcon {
    background-color: ${(props) => props.theme.purple};
    font-size: 4rem;
    padding: 10px;
    border-radius: 80px;
    margin: 2rem auto;
    font-weight: 800;
  }
  && p {
    font-size: 1.5rem;
  }
`;

const SignUpButton = styled.button`
  background-color: ${(props) => props.theme.purple};
  font-size: 4rem;
  color: white;
  font-family: House-Gothic;
  text-transform: uppercase;
  font-weight: 800;
  padding: 0.85rem 2rem;
  margin: 3rem auto;
  &&:hover {
    color: ${(props) => props.theme.green};
    border-radius: 80px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;
const SignUp = ({ main_event, handleSubmit, handleSetEmail, form }) => {
  const [value, setValue] = useState('');

  return (
    <SignUpWrap>
      <img
        src={main_event.KeyValue.find((kv) => kv.key === 'logo').value}
        className="logo"
      />
      <CTA>
        <span className="dollars"> Saturday, May 1st @ 8:00pm</span>
      </CTA>
      <EnterArea className={form.loading ? 'loading' : ''}>
        <EnterText>
          <ArrowDownwardIcon className="downIcon" />
          <p> Enter your email for more information</p>
          <ArrowDownwardIcon className="downIcon" />
        </EnterText>
        <input
          type="text"
          placeholder={`ENTER EMAIL`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <SignUpButton
          onClick={() => {
            handleSubmit(value);
          }}
        >
          {form.loading ? 'Loading...' : 'Submit'}
        </SignUpButton>
      </EnterArea>
    </SignUpWrap>
  );
};

export default SignUp;
