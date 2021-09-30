import styled from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { BoxedCounter } from 'components/Counters';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import { Typography } from '@material-ui/core';
import Center from 'components/Center';
import { ExternalLink__Type } from 'types/Link__Types';

const StyledPage = styled.div`
  position: relative;
`;

const BeforeWrap = styled.div`
  text-align: center;

  @media all and (max-width: 768px) {
    && .hide-sm {
      display: none;
    }
  }
`;

const getHost = (speaker) => {
  let host;
  if (speaker.FirstName === 'Contestants' || speaker.FirstName === 'Judges') {
    host = speaker.FirstName;
  } else {
    host = speaker.FirstName + ' ' + speaker.LastName;
  }
  return host;
};

const Before = ({ main_event, speaker }) => {
  const host = getHost(speaker);
  return (
    <BeforeWrap>
      {host === 'Contestants' || host === 'Judges' ? (
        <h2>{host} Room</h2>
      ) : (
        <h2>Meeting Host: {host}</h2>
      )}
      <h4>Join {speaker.FirstName} Live In:</h4>
      <div className="hide-sm">
        <BoxedCounter
          event={main_event}
          styles={{
            boxColor: '#0047bb',
          }}
          prefix={''}
        />
      </div>
    </BeforeWrap>
  );
};

export const TeamBody = ({ main_event, speaker }) => {
  const host = getHost(speaker);

  const link: ExternalLink__Type = {
    allowed: true,
    href: speaker.Link,
    errorText: 'Please contact support',
  };
  return (
    <StyledPage>
      <Box__XYCentered minHeight={'100%'}>
        <div
          style={{
            maxWidth: '900px',
            width: '95%',
            margin: 'auto',
            marginTop: 'clamp(2rem, 6%, 5rem)',
            marginBottom: 'clamp(2rem, 6%, 5rem)',
          }}
        >
          <LinkBox__StickyTop__WithCountdown
            offset={15}
            start={main_event.eventStartEnd.StartDateTime}
            end={main_event.eventStartEnd.EndDateTime}
            link={speaker.Link}
            prefix={
              <Center>
                <h2>Meeting Host: {host}</h2>
                <br />
                <br />
                <a href={speaker.Link} target="_blank">
                  <Typography variant={`subtitle1`}>{speaker.Link}</Typography>
                </a>
                <br />
              </Center>
            }
            showBefore={<Before main_event={main_event} speaker={speaker} />}
          />
        </div>
      </Box__XYCentered>
    </StyledPage>
  );
};
