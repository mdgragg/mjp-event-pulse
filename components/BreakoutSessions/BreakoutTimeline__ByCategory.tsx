import { Card, Typography } from '@material-ui/core';
import { Button__Primary } from 'components/Buttons';
import styled from 'styled-components';
import { transformByCommonAttr } from 'lib/helpers';
import { DateParse } from 'components/__Assets__';
const BreakoutWrap = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 1.5rem;
  margin: 2rem auto;
  padding-bottom: 3rem;
`;
const StyledSingleCategory = styled(Card)`
  display: grid;
  padding: 1rem;
  grid-template-columns: 25% 1fr;
  background-color: ${(props) => props.theme.palette.background.secondary};

  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const StyledButtonArea = styled.div`
  color: white;
  && h3 {
    color: white;
  }
  && h3:first-of-type {
    margin-top: 2rem;
  }
  && img {
    max-width: 200px;
    margin-bottom: 1rem;
  }
  text-align: center;
  @media all and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
`;

const StyledTimeline = styled.div`
  margin-left: 1rem;
  text-align: center;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  color: grey;
  && .time {
    font-weight: 600;
  }
  @media all and (max-width: 1200px) {
    flex-direction: column;
    margin-left: unset;
    max-width: 500px;
    margin: auto;
  }
`;

const SingleBreakoutSession = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  max-width: 350px;
  min-width: 220px;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 1rem 0.5rem;
  margin: 0.5rem;
  width: 98%;
  @media all and (max-width: 1200px) {
    margin: 0.5rem auto;
  }
`;

const Breakouts__ByCategory = ({ breakouts, onBreakoutClick }) => {
  const categories = transformByCommonAttr(breakouts, 'Category');

  return (
    <BreakoutWrap>
      {Object.keys(categories).map((b) => (
        <SingleCategory
          key={categories[b].id}
          category={b}
          handleClick={onBreakoutClick}
          breakouts={categories[b]}
        />
      ))}
    </BreakoutWrap>
  );
};

const SingleCategory = ({ category, breakouts, handleClick }) => {
  const speakerTitle =
    breakouts[0].KeyValue.filter((k) => k.key === 'SpeakerTitle')[0] || null;
  return (
    <StyledSingleCategory>
      <StyledButtonArea>
        <h3>{category}</h3>
        <i>{speakerTitle?.value && <h3>{speakerTitle.value}</h3>}</i>
        <Typography variant={`overline`}>
          {breakouts.length} {breakouts.length === 1 ? 'Session' : 'Sessions'}
        </Typography>
      </StyledButtonArea>
      <StyledTimeline>
        {breakouts &&
          breakouts.map((b) => (
            <SingleBreakoutSession key={b.id}>
              <div className={`time`}>
                <h3>{b.Name}</h3>
                <Typography variant={`overline`}>
                  <DateParse format={`MMM D, h:mma`} date={b.DateTime} />
                </Typography>
              </div>
              {b.Description && (
                <div style={{ margin: '1rem auto' }}>{b.Description}</div>
              )}

              <Button__Primary onClick={() => handleClick(b.id)}>
                Join
              </Button__Primary>
            </SingleBreakoutSession>
          ))}
      </StyledTimeline>
    </StyledSingleCategory>
  );
};

export default Breakouts__ByCategory;
