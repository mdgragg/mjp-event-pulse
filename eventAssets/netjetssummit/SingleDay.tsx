import PropTypes from 'prop-types';
import { PlayerWithChat } from 'components/BodyTemplates';
import styled from 'styled-components';
import { BreakoutTimeLine } from 'components/BreakoutSessions';
import { Button__Primary } from 'components/Buttons';
import Breakouts__ByCategory from 'components/BreakoutSessions/BreakoutTimeline__ByCategory';
import { useRouter } from 'next/router';
import Link from 'next/link';
const StyledDayWrap = styled.div`
  margin: 2rem auto;
  width: 90vw;
`;

const SingleDay = ({ day, dayQuery, title }) => {
  const router = useRouter();

  const chatUrl = day.KeyValue?.filter((k) => k.key == 'Chat')[0];

  return (
    <StyledDayWrap>
      {day.streamLinks.length > 0 && day.streamLinks[0].url ? (
        <div style={{ margin: '3rem auto' }}>
          <PlayerWithChat
            styles={{
              wrap: {
                backgroundColor: 'rgba(0,0,0,0)',
              },
              chat: {
                border: '0px',
              },
            }}
            hasStarted={true}
            videoUrl={day.streamLinks[0].url}
            chatUrl={chatUrl.value || day.streamLinks[0].url}
          ></PlayerWithChat>
        </div>
      ) : null}
      <Breakouts__ByCategory
        breakouts={day.BreakoutSessions}
        onBreakoutClick={(breakoutId) =>
          router.push(`${dayQuery}/${breakoutId}`)
        }
      />
    </StyledDayWrap>
  );
};

SingleDay.propTypes = {};

export default SingleDay;
