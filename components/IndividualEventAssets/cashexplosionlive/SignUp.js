import React from 'react';
import styled from 'styled-components';
import Video__iFrame from 'components/VideoBoxes/Video__iFrame';
import PublicChat from 'components/Chat/PublicChat';
import Counter from 'components/Counters/Counter';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const SignUpWrap = styled.div`
  min-height: 80vh;
  display: flex;
  margin-top: 3rem;
  width: 80%;
  max-width: 600px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  && .logo {
    max-width: 350px;
  }
`;
const CTA = styled.div`
  background-color: ${(props) => props.theme.green};
  color: white;
  text-transform: uppercase;
  padding: 1rem;
  font-size: 2rem;
  line-height: 2.45rem;
  && span.dollars {
    display: block;
    font-size: 4.5rem;
    line-height: 4rem;
    font-weight: 800;
    font-family: House-Gothic;
  }
`;
const EnterArea = styled.div`
  width: 100%;
  && input {
    font-size: 1.5rem;
    padding: 2rem;
    width: 100%;
    text-align: center;
  }
`;

const EnterText = styled.div`
  color: white;
  text-transform: uppercase;
  display: flex;
  vertical-align: center;
  align-items: center;
  && .downIcon {
    background-color: ${(props) => props.theme.purple};
    font-size: 4rem;
    padding: 10px;
    border-radius: 80px;
    margin: 0 2rem;
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

  &&:hover {
    color: ${(props) => props.theme.green};
    border-radius: 80px;
  }
`;
const SignUp = ({ main_event }) => {
  return (
    <SignUpWrap>
      <img
        src={main_event.KeyValue.find((kv) => kv.key === 'logo').value}
        className="logo"
      />
      <CTA>
        {' '}
        Saturday, May 1st @ 8:00pm You could win up to{' '}
        <span className="dollars">$5,000 ?!?</span>{' '}
      </CTA>
      <EnterArea>
        <EnterText>
          <ArrowDownwardIcon className="downIcon" />
          <p> Enter your email for more information</p>
          <ArrowDownwardIcon className="downIcon" />
        </EnterText>
        <input type="text" placeholder={`ENTER EMAIL`} />
        <SignUpButton>Submit</SignUpButton>
      </EnterArea>
    </SignUpWrap>
  );
};

export default SignUp;
