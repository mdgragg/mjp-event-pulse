import React from 'react';
import CenteredPlayer from 'components/BodyTemplates/CenteredPlayer';
import styled from 'styled-components';

const BigBG = styled.div`
  position: relative;
  padding-top: 7rem;
  padding-bottom: 7rem;
  &&:after {
    background-image: url(${(props) => props.bgImg});
    position: absolute;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-origin: center center;
    background-size: auto 100%;
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
  }
  @media all and (min-width: 1920px) {
    &&:after {
      background-size: 100% auto;
    }
  }
`;
const Body = ({ main_event }) => {
  return (
    <BigBG bgImg={main_event?.HeaderImage?.url}>
      <CenteredPlayer
        videoUrl={main_event.streamLinks[0].url}
        showing={true}
        has
        Started={true}
      />
    </BigBG>
  );
};

export default Body;
