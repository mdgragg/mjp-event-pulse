import styled from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { BoxedCounter } from 'components/Counters';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';

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

const Before = ({ main_event, speaker }) => (
  <BeforeWrap>
    <img
      style={{
        maxWidth: '430px',
        width: '80%',
      }}
      src={main_event.LogoLink[1]?.Media?.url || null}
    />
    <div className="hide-sm">
      <BoxedCounter
        event={main_event}
        styles={{
          boxColor: '#0047bb',
        }}
        prefix={
          <>
            <h2>This Event Hasn't Started Yet</h2>
            <h4>Join {speaker.FirstName} Live In:</h4>
          </>
        }
      />
    </div>
  </BeforeWrap>
);

export const TeamBody = ({ main_event, speaker }) => (
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
          offset={10}
          start={main_event.eventStartEnd.StartDateTime}
          link={speaker.Link}
          showBefore={<Before main_event={main_event} speaker={speaker} />}
        />
      </div>
    </Box__XYCentered>
  </StyledPage>
);
