import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DateParse from '../../assets/DateParse';
const SignUpWrap = styled.div`
  /* min-height: 80vh; */
  height: 100%;
  align-self: center;
  justify-self: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  position: relative;
  text-align: center;
  && > div {
    margin: 1.5rem auto;
    width: auto;
  }
  && .logo {
    margin: 0;
    margin-bottom: 4rem;
  }
  && .logo img {
    width: auto;
    margin: auto;
    max-height: 20vh;
    min-height: 200px;
  }
  @media all and (max-width: 768px) {
    width: 90%;
  }
`;
const CTA = styled.div`
  background-color: ${(props) => props.theme.green};
  color: white;
  margin: auto;
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  font-size: 2rem;
  /* line-height: 2.45rem; */
  && span.dollars {
    display: block;
    font-size: 3rem;
    letter-spacing: 6px;
    font-weight: 600;
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
  margin: auto;
  && input {
    font-size: 1.75rem;
    padding: 1.5rem 0;
    width: 100%;
    text-align: center;
    z-index: 101;
    opacity: 1;
  }
  @media all and (max-width: 768px) {
    margin: 0 auto;
  }
`;

const EnterText = styled.div`
  color: white;
  text-transform: uppercase;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 10fr 1fr;
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
    font-size: 1.75rem;
  }
`;

const SignUpButton = styled.button`
  background-color: ${(props) => props.theme.purple};
  font-size: 3rem;
  color: white;
  font-family: House-Gothic;
  text-transform: uppercase;
  font-weight: 800;
  padding: 0.85rem 2rem;
  margin: 3rem auto;
  letter-spacing: 6px;
  &&:hover {
    color: ${(props) => props.theme.green};
    border-radius: 80px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;
const SignUp = ({ main_event, handleSubmit, handleSetEmail, form }) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    inputRef.current.addEventListener('focus', () => setInputFocused(true));
    inputRef.current.addEventListener('blur', () => setInputFocused(false));
  }, []);

  return (
    <SignUpWrap className="blackout">
      <div className="logo">
        <img src={main_event.KeyValue.find((kv) => kv.key === 'Logo').value} />
      </div>
      <CTA>
        <span className="dollars">
          <DateParse date={main_event.eventStartEnd.StartDateTime} />
        </span>
      </CTA>
      <EnterArea className={form.loading ? 'loading' : ''}>
        <EnterText>
          <ArrowDownwardIcon className="downIcon" />
          <p> Register for more information</p>
          <ArrowDownwardIcon className="downIcon" />
        </EnterText>
        <input
          ref={inputRef}
          type="text"
          placeholder={`ENTER EMAIL`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
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
