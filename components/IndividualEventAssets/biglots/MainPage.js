import React, { useState } from 'react';
import styled from 'styled-components';
import { useCalculateIfStarted } from '../../../hooks';
import CenteredPlayer from 'components/BodyTemplates/CenteredPlayer';
import Banner_ImgBg from 'components/Banners/Banner_ImgBg';
import VideoBox__StickyTop from '../../VideoBoxes/Video__StickyTop';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import DateParse from '../../assets/DateParse';
import { Button__Big } from '../../Buttons';
import { BoxedCounter, CircleCounter } from '../../Counters';
import ExternalLink from '../../Modals/ExternalLink';
const BG = styled.div`
  background-image: url('${(props) => props.theme.header_image}');
  background-color: ${(props) => props.theme.colors.primary};
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
  }
  && .title > h2 {
    background-color: white;
    color: ${(props) => props.theme.colors.primary};
    font-size: 2rem;
    font-family: 'Futura Bold';
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
  margin: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;
const MainPage = ({ main_event, hasStarted }) => {
  const [externalLink, setExternalLink] = useState({
    open: false,
    eventOpen: false,
    errorText: 'This event has not started yet.',
  });

  const hasStartEnd = useCalculateIfStarted(main_event);

  return (
    <BG>
      <Header>
        <Inner>
          <div className="date"></div>
          <div className="title">
            <h2>{main_event.EventName}</h2>
            <div className="date" style={{ margin: '2rem' }}>
              <i>
                <DateParse
                  date={main_event.eventStartEnd.StartDateTime}
                  format={`dddd, MMMM D, YYYY`}
                ></DateParse>
              </i>
            </div>
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
        <div>
          <CircleCounter event={main_event} style={{ margin: '1rem auto' }} />
          <Button__Big
            style={{ margin: '4rem auto', padding: '1rem 3rem' }}
            onClick={() => {
              setExternalLink((prev) => ({ ...prev, open: true }));
            }}
          >
            Join Us Live
          </Button__Big>
        </div>
      </PlayerBody>
      <ExternalLink
        open={externalLink.open}
        setOpen={(value) =>
          setExternalLink((prev) => ({ ...prev, open: value }))
        }
        link={{
          allowed: hasStartEnd.hasStarted,
          errorText: 'This event has not started yet!',
        }}
      />
    </BG>
  );
};

export default MainPage;
