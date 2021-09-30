import styled, { ThemeContext } from 'styled-components';
import { Box__XYCentered } from 'components/Boxes';
import { BoxedCounter } from 'components/Counters';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import { useContext } from 'react';

const StyledPage = styled.div`
  min-height: 900px;
`;

const BeforeWrap = styled.div`
  text-align: center;

  @media all and (max-width: 768px) {
    && .hide-sm {
      display: none;
    }
  }
`;

const Before = ({ main_event, event_theme }) => (
  <BeforeWrap>
    <img
      style={{
        maxWidth: '400px',
        width: '80%',
      }}
      src={main_event.LogoLink[1]?.Media?.url || null}
    />
    <div className="hide-sm">
      <BoxedCounter
        styles={{
          textColor: event_theme.colors.primary,
          boxColor: event_theme.colors.white,
        }}
        event={main_event}
        prefix={
          <>
            <h2>This Event Hasn't Started Yet</h2>
            <h4>Join Us Live In:</h4>
          </>
        }
      />
    </div>
  </BeforeWrap>
);

export const PageBody = ({ event_meta, main_event }) => {
  const event_theme = useContext(ThemeContext);
  return (
    <StyledPage>
      <Box__XYCentered minHeight={'100%'}>
        <div style={{ maxWidth: '900px', width: '95%', margin: '3rem auto' }}>
          <LinkBox__StickyTop__WithCountdown
            offset={10}
            start={main_event.eventStartEnd.StartDateTime}
            end={main_event.eventStartEnd.EndDateTime}
            link={{
              href: '#',
              allowed: false,
              errorText: 'Please choose a meeting with a host',
            }}
            showBefore={
              <Before main_event={main_event} event_theme={event_theme} />
            }
          />
        </div>
      </Box__XYCentered>
    </StyledPage>
  );
};
