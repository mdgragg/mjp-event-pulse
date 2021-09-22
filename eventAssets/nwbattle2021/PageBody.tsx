import { Box__XYCentered } from 'components/Boxes';
import { BoxedCounter } from 'components/Counters';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';

export const PageBody = ({ event_meta, main_event, event_theme }) => (
  <>
    <Box__XYCentered minHeight={'100%'}>
      <div style={{ maxWidth: '900px', width: '95%', margin: '3rem auto' }}>
        <LinkBox__StickyTop__WithCountdown
          offset={10}
          start={main_event.eventStartEnd.StartDateTime}
          link={main_event.streamLinks[0].url}
          showBefore={
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
          }
        />
      </div>
    </Box__XYCentered>
  </>
);
