import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import DateParse from 'components/__Assets__/DateParse';
import Center from 'components/Center';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import { Replacer } from 'components/__Assets__';
import { BoxedCounter } from 'components/Counters';
import event_theme from 'eventAssets/biglots/theme.theme';
import Before from 'components/LinkBoxes/Before';

const Wrap = styled.div`
  position: relative;
`;
const BG = styled.div`
  background-image: url('${(props) => props.theme.header_image}');
  background-color: ${(props) => props.theme.colors.orange};
  height: 100vh;
  min-height: 1080px;
  width: 100%;
  background-repeat: repeat-y;
  position: absolute;
  background-size: 100% auto;
  @media all and (max-width: 768px) {
    background-size: cover;
  }
`;

const Header = styled.div`
  height: 25vh;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 768px) {
    height: auto;
    margin: 2rem auto;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  && .date {
    font-size: 1rem;
    color: white;
    text-align: center;
    font-family: Futura Bold;
    line-height: 2rem;
    width: 80%;
    margin: auto;
  }
  && .title > h2 {
    background-color: white;
    font-size: 2rem;
    font-family: 'Futura Bold';
    color: ${(props) => props.theme.colors.orange};
    padding: 1.5rem;
    text-align: center;
    width: max-content;
    margin: auto;
  }
  && .logo-holder {
    width: 50%;
    height: 100%;
    text-align: center;
    justify-self: end;
  }
  @media all and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    row-gap: 1rem;
    && .title > h2 {
      font-size: 1.5rem;
      padding: 1rem;
      width: auto;
    }
    && .date {
      grid-row: -1;
    }
    && .title {
      grid-row: 2;
    }
    && .logo-holder {
      width: 40%;
      grid-row: 1;
      justify-self: center;
    }
  }
`;

const PlayerBody = styled.div`
  min-height: 60vh;
  max-width: 768px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LandingPage = ({ main_event, hasStartEnd }) => {
  return (
    <Wrap>
      <BG>
        <Header>
          <Inner>
            <div className="date">
              <i>
                <DateParse date={main_event.eventStartEnd.StartDateTime} />
              </i>

              <Counter__JustNumbers
                event={main_event}
                afterStarted={<div>Live Now!</div>}
                afterEnded={<div>This Event Has Ended</div>}
              />
            </div>
            <div className="title">
              <h2>
                Big Lots <br /> Q2 Virtual Town Hall
              </h2>
            </div>
            <div className="logo-holder">
              <img
                src={main_event?.LogoLink[0]?.Media.url}
                alt="Big Lots logo B!"
              />
            </div>
          </Inner>
        </Header>

        <PlayerBody>
          <Replacer
            showIfFalse={null}
            showIfTrue={
              <div style={{ margin: '1rem' }}>
                <Center>
                  <h2>
                    Enjoy the Pre-Show! <br />
                    The Q2 Town Hall will begin at 10AM EST
                  </h2>
                </Center>
              </div>
            }
            decider={true}
          ></Replacer>

          <Video__StickyTop__WithCountdown
            start={main_event.eventStartEnd.StartDateTime}
            showMinutesBefore={20}
            showBefore={
              <>
                <Before
                  main_event={main_event}
                  imgSrc={main_event.LogoLink[1].Media.url}
                />
              </>
            }
            src={main_event.streamLinks[0].url}
          />
        </PlayerBody>
      </BG>
    </Wrap>
  );
};

export default LandingPage;
