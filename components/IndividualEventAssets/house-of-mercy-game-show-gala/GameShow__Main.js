import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from '../../Counters/Counter__JustNumbers';
import DateParse from '../../assets/DateParse';
import GameShow__Body from './GameShow__Body';
const Header = styled.div`
  height: 350px;
  background-color: ${(props) => props.theme.green};
  && .inner {
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    margin: auto;
    padding: 0 2%;
  }

  && img.logo {
    width: 75%;
    max-width: 350px;
  }
  && .counter {
    font-size: 1rem;
    margin: auto;
    background-color: ${(props) => props.theme.lightGreen};
    padding: 1rem 2rem;
    font-weight: 800;
  }
  @media all and (max-width: 1000px) {
    && .counter {
      padding: 0.5rem;
    }
  }
  @media all and (max-width: 650px) {
    && .inner {
      grid-template-columns: 100%;
    }
  }
`;

const Title = styled.h1`
  max-width: 500px;
  text-align: center;
  margin: 1rem auto;
  @media all and (max-width: 1000px) {
    font-size: 2rem !important;
    max-width: 80%;
  }
`;

function GameShow__Main({ main_event, data }) {
  const start = main_event.eventStartEnd.StartDateTime;
  return (
    <>
      <Header>
        <div className="inner">
          <img className="logo" src={main_event.LogoLink[0].Media.url}></img>
          <div>
            <Title>{main_event.EventName}</Title>
            <DateParse date={start} />
          </div>
          <div className="counter">
            <Counter__JustNumbers prefix="Join Us Live In:" start={start} />
          </div>
        </div>
      </Header>
      <GameShow__Body
        data={data}
        src={main_event.streamLinks[0].url}
        start={start}
        chatSrc={main_event.streamLinks[1].url}
      />
    </>
  );
}

export default GameShow__Main;
