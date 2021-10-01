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

const BreakoutPage = ({
  day,
  name,
  time,
  video,
  chat,
  attachment,
  category,
  speaker,
}) => {
  return (
    <div style={{ width: '90vw', margin: '5rem auto 10rem' }}>
      <h1>{category}</h1>
      {speaker?.value ? (
        <h2 style={{ margin: '2rem auto' }}>
          {speaker.value} - {name} Session
        </h2>
      ) : (
        <h2>{name} Session</h2>
      )}

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
          <p
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              width: 'max-content',
              padding: '8px',
              margin: '1rem auto',
            }}
          >
            Please enter your name in the chat room at the start of every
            session you attend.
          </p>
          <StyledButtonArea>
            <Link href={`../${day.query}`}>
              <Button__Primary>Back To {day.name}</Button__Primary>
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
