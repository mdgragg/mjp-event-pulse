import React from 'react';
import styled from 'styled-components';
import { Counter__JustNumbers } from 'components/Counters';
import DateParse from 'components/__Assets__/DateParse';

const TheHero = styled.div`
  height: 500px;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  width: 100vw;
  position: relative;
  z-index: 1;
  background-color: black;
  &&::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('${(props) => props.theme.header_image}');
    z-index: -1;
  }
  && > div {
    text-align: center;
    margin: 0 auto;
  }
  && .logo > img {
    width: 50%;
    margin: auto;
  }
  && .counter {
    font-size: 1rem;
    font-weight: 800;
    color: ${(props) => props.theme.orange};
    width: 70%;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    text-align: center;
  }

  @media all and (max-width: 1200px) {
    grid-template-columns: 100%;
    grid-template-rows: 40% 30% 30%;
    && .logo > img {
      height: 80px;
      width: auto;
      margin: auto;
    }
  }
`;

const Title = styled.div`
  font-size: 5rem;
  text-align: center;
  text-transform: uppercase;
  line-height: 5rem;
  /* mix-blend-mode: hard-light; */
  font-family: Futura Bold;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-origin: center center;
  background-position: 0px 10px;
  background-attachment: cover;
  background-image: url('https://storage.googleapis.com/mjp-stream-public/ywca-women-of-achievement/text-bg.png');

  -webkit-text-fill-color: rgba(0, 0, 0, 0.2);
  -webkit-background-clip: text;

  && span.date {
    font-family: Avenir;
    font-weight: 800;
    font-size: 4rem;
  }
  && span.of {
    text-transform: initial;
    font-family: Cursive, Tahoma, Geneva, Verdana, sans-serif;
  }
  @media all and (max-width: 1200px) {
    font-size: 2rem;
    line-height: unset;

    && span.date {
      font-family: Avenir;
      font-weight: 800;
      font-size: 1.5rem;
    }
  }
`;
const Hero = ({ main_event }) => {
  return (
    <TheHero>
      <div className="logo">
        <img src={main_event.LogoLink[0].Media.url} alt={`Logo link`} />
      </div>
      <div>
        <Title>
          <span className="date">2021</span> <br />
          Women <span className="of">of</span> <br />
          Achievement
        </Title>
        <h4>
          <i>
            <DateParse date={main_event.eventStartEnd.StartDateTime} />
          </i>
        </h4>
      </div>
      <div className="counter">Thank You for Joining Us!</div>
    </TheHero>
  );
};

export default Hero;
