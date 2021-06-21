import React from 'react';
import styled from 'styled-components';
import Total from './Total';
import CountUp from 'react-countup';
const Wrap = styled.div`
  text-align: center;
  && h3 {
    font-size: 1.5rem;
  }
`;

const LeaderBoardGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
  width: 90%;
  max-width: 600px;
  margin: 2rem auto;
  font-size: 1.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.purple};
  border: 12px solid ${(props) => props.theme.lightOrange};
  && ::before {
    /* box-sizing: content-box; */
    position: absolute;
    height: calc(100% + 15px);
    width: calc(100% + 15px);
    top: -8px;
    left: -8px;
    content: '';
    border: 6px dotted white;
  }
`;

const TeamItem = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
  padding: 1rem;

  && .name {
    font-weight: 800;
  }
`;
const SingleTeam = ({ data }) => {
  return (
    <TeamItem>
      <div className="name">Team {data.name}</div>
      <CountUp
        formattingFn={(value) =>
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(value) + ' Raised'
        }
        prefix="$ "
        separator=","
        duration={2}
        start={10}
        end={data.currentBid}
        preserveValue={true}
      />
    </TeamItem>
  );
};

const dummy = [
  { name: 'Alex', previousBid: 0, currentBid: 20 },
  { name: 'John', previousBid: 0, currentBid: 20 },
  { name: 'Lucas', previousBid: 0, currentBid: 20 },
  { name: 'Stacey', previousBid: 0, currentBid: 20 },
];

const LeaderBoards = ({ leader_data }) => {
  return (
    <Wrap>
      {!leader_data ? (
        <>
          <h3>Leader Boards</h3>
          <LeaderBoardGrid>
            {dummy.map((data) => (
              <SingleTeam data={data} key={data.name} />
            ))}
          </LeaderBoardGrid>
        </>
      ) : (
        <>
          <h3>Total</h3>
          <Total />
        </>
      )}
    </Wrap>
  );
};

export default LeaderBoards;
