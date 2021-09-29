import { getBreakoutSessions } from 'lib/api';
import styled from 'styled-components';
import Link from 'next/link';
import { PlayerWithChat } from 'components/BodyTemplates';
import { Button__Primary } from 'components/Buttons';
import { Typography } from '@material-ui/core';
import { DateParse } from 'components/__Assets__';

const StyledButtonArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  && button {
    margin: 0 1rem;
    padding: 1rem;
  }
  && button.download {
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.blue};
  }
`;

const BreakoutPage = ({ name, time, video, chat, attachment }) => {
  return (
    <div style={{ width: '90vw', margin: '5rem auto 10rem' }}>
      <h1>{name}</h1>
      <Typography variant={`overline`}>
        <div style={{ margin: '1rem auto' }}>
          <DateParse date={time} />
        </div>
      </Typography>
      <div style={{ margin: '5rem auto' }}>
        <PlayerWithChat
          hasStarted={true}
          videoUrl={video}
          chatUrl={chat}
          styles={{
            chat: {
              backgroundColor: 'rgba(0,0,0,0)',
              border: '0px',
            },
            wrap: {
              backgroundColor: 'rgba(0,0,0,0)',
            },
          }}
        >
          <StyledButtonArea>
            <Link href={'../day1'}>
              <Button__Primary>Back To Day 1</Button__Primary>
            </Link>
            {attachment && (
              <a download href={attachment} target="_blank">
                <Button__Primary className="download">
                  Download PDF
                </Button__Primary>
              </a>
            )}
          </StyledButtonArea>
        </PlayerWithChat>
      </div>
    </div>
  );
};

export default BreakoutPage;
