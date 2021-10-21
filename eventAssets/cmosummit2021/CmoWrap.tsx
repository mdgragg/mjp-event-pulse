import styled from 'styled-components';
import { CenteredPlayer } from 'components/BodyTemplates';
import LinkBox from 'components/LinkBoxes/LinkBox';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import CmoBefore from './CmoBefore';

const StyledWrap = styled.div`
  background-color: ${(props) => props.theme.palette.background.primary};
`;

const CmoWrap = ({ main_event }) => {
  return (
    <StyledWrap>
      <LinkBox__StickyTop__WithCountdown
        start={main_event.eventStartEnd.StartDateTime}
        end={main_event.eventStartEnd.EndDateTime}
        link={{
          allowed: false,
          href: 'http://www.google.com',
          errorText: 'Theres no links',
        }}
        offset={60}
        showBefore={<CmoBefore main_event={main_event} />}
      />
      <CenteredPlayer
        showing={true}
        hasStarted={true}
        videoUrl={main_event.streamLinks[0].url}
      />
    </StyledWrap>
  );
};

export default CmoWrap;
