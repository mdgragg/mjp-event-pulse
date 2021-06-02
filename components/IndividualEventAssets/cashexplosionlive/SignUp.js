import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DateParse from '../../assets/DateParse';
const SignUpWrap = styled.div`
  /* min-height: 80vh; */
  height: 100%;
  align-self: flex-start;
  justify-self: center;
  margin: 5% auto;
  display: flex;
  flex-direction: column;
  height: auto;
  position: relative;
  text-align: center;
  && > div {
    margin: 1rem auto;
    width: auto;
  }
  && .logo {
    margin: 0;
  }
  && .logo img {
    width: 40%;
    margin: auto;
    height: auto;
  }
  @media all and (max-width: 1000px) {
    width: 95%;
    && .logo img {
      width: 80%;
      height: auto;
      max-height: unset;
      min-height: unset;
    }
  }
`;
const CTA = styled.div`
  background-color: ${(props) => props.theme.green};
  color: white;
  margin: 0 auto;
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
    font-size: 1.35rem;
    && span.dollars {
      font-size: 1.85rem;
      letter-spacing: 3px;
      line-height: 2rem;
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
    padding: 1.25rem 0;
    width: 100%;
    text-align: center;
    z-index: 101;
    opacity: 1;
  }
  @media all and (max-width: 1000px) {
    margin: 0 auto;
    padding: 0;

    && input {
      margin: 0.5rem auto;
      font-size: 1.35rem;
    }
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
    margin: 1rem auto;
    font-weight: 800;
  }
  && p {
    font-size: 1.75rem;
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin: 0 auto;
    && p {
      margin: 0rem auto;
      font-size: 1.35rem;
    }
    && .downIcon {
      margin: 1rem auto;
      font-size: 3.5rem;
    }
    && .downIcon:nth-of-type(1) {
      display: none;
    }
  }
`;

const SignUpButton = styled.button`
  background-color: ${(props) => props.theme.purple};
  font-size: 3rem;
  color: white;
  font-family: House-Gothic;
  text-transform: uppercase;
  font-weight: 800;
  padding: 1rem 1.25rem;
  margin: 3rem auto;
  letter-spacing: 6px;
  &&:hover {
    color: ${(props) => props.theme.green};
    border-radius: 80px;
  }
  @media all and (max-width: 1000px) {
    width: 100%;
    margin: 1rem auto;
    font-size: 2.25rem;
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
        <img src={main_event.LogoLink[0].Media.url} className="logo" />
      </div>
      <CTA>
        <span className="dollars">
          <DateParse
            date={new Date('Saturday, June 19 2021 20:00:00 GMT-0400')}
            format={'dddd, MMMM DD \\a\\t h:mma'}
          />
        </span>
      </CTA>
      <EnterArea className={form.loading ? 'loading' : ''}>
        <EnterText>
          <ArrowDownwardIcon className="downIcon" />
          <p>RSVP for more information</p>
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
