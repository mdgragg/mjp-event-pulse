import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Total from './Total';
import CountUp from 'react-countup';

const getNameData = {
  alex: {
    bgc: '#93c611',
    sector: "Children's Mental Health",
    bid: 1000,
  },
  chad: {
    bgc: '#02c1d4',
    sector: "Men's Programming",
    bid: 1000,
  },
  lisa: {
    bgc: '#e25104',
    sector: 'Marijuana Use Disorder',
    bid: 1000,
  },
  beth: {
    bgc: '#8e3080',
    sector: 'Trauma-Informed Care',
    bid: 1000,
  },
};
const Wrap = styled.div`
  text-align: center;
  color: white;
  font-family: Sofia;
  text-transform: uppercase;
  && h2 {
    color: white;
  }
  && h3 {
    font-size: 1.5rem;
  }
`;

const LeaderBoardGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  text-align: center;
  width: 99vw;
  height: 99vh;
  margin: 0;
  font-size: 1.5rem;
  padding: 0;
  && .centered-image {
    position: absolute;
    top: calc(50% - 150px);
    border-radius: 100%;
    left: 0;
    right: 0;
    margin: auto;
    width: 300px;
    height: auto;
  }
  @media all and (max-width: 768px) {
    grid-template-columns: 100%;
    font-size: 1rem;
    margin: 0.25rem auto;
    width: 100%;
  }
`;

const TeamItem = styled.div`
  margin: 0.25rem;
  padding: 1rem;
  background-color: ${(props) => getNameData[props.name].bgc};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && .name {
    font-size: 4rem;
    letter-spacing: 2px;
    font-weight: 200;
  }
  && .sector {
    letter-spacing: 2px;
    font-weight: 400;
  }
  && .amount {
    font-size: 4rem;
    font-weight: 800;
  }
  @media all and (max-width: 768px) {
    margin: 0.5rem;
    padding: 0.5rem;
  }
`;
const SingleTeam = ({ data }) => {
  return (
    <TeamItem
      className={data.name.toLowerCase()}
      name={data.name.toLowerCase()}
    >
      <div className="name">Team {data.name}</div>
      <div className="sector">
        Team {getNameData[data.name.toLowerCase()].sector}
      </div>
      <div className="amount">
        <CountUp
          formattingFn={(value) =>
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(value)
          }
          prefix="$ "
          separator=","
          duration={2}
          start={10}
          end={data.currentBid}
          preserveValue={true}
        />
      </div>
    </TeamItem>
  );
};

const dummy = [
  { name: 'Alex', previousBid: 0, currentBid: 18470 },
  { name: 'Beth', previousBid: 0, currentBid: 18650 },
  { name: 'Chad', previousBid: 0, currentBid: 12450 },
  { name: 'Lisa', previousBid: 0, currentBid: 30075 },
];

const LeaderBoards = ({ data }) => {
  const [leader_data, set_leader_data] = useState(null);
  const [static_data, set_static_data] = useState(dummy);

  useEffect(() => {
    if (data?.teamTotal) {
      let leader_array = data.teamTotal;
      leader_array.sort((a, b) => {
        let value;
        a.currentBid > b.currentBid ? (value = -1) : (value = 1);
        return value;
      });
      set_leader_data(leader_array);
    } else {
      set_leader_data(null);
    }
  }, [data]);

  return (
    <Wrap>
      <>
        <h3>Leader Boards</h3>
        <LeaderBoardGrid>
          {leader_data
            ? leader_data.map((data) => (
                <SingleTeam data={data} key={data.name} />
              ))
            : dummy.map((data) => <SingleTeam data={data} key={data.name} />)}
          <img
            src={`https://storage.googleapis.com/mjp-stream-public/house-of-mercy-game-show-gala/GameShowGala_MOFoundation-logo2.png`}
            className={`centered-image`}
          />
        </LeaderBoardGrid>
      </>
    </Wrap>
  );
};

export default LeaderBoards;
