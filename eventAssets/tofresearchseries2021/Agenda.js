import styled from 'styled-components';
import React from 'react';
import TwoPanel from 'components/TabPanels/TwoPanel';
import SpineSession from './Agenda/SpineSession';
const TheAgenda = styled.div`
  min-height: 880px;
  font-size: 1rem;
  max-width: 550px;
  margin: auto;
  background-color: #f7f7f7;
`;

const SingleScheduleDay = styled.div`
  padding: 1rem 0 3rem 0;
`;
const Item = styled.ul`
  && .title--wrap {
    margin-bottom: 0.5rem;
  }
  && hr {
    width: 65%;
    margin: 0.5rem 0;
  }
`;
const Item__Time = styled.div`
  display: inline;
  font-weight: 800;
  margin-right: 0.5rem;
`;
const Item__Title = styled.div`
  display: inline;
  /* color: white;
  background-color: ${(props) => props.theme.red};
  padding: 3px; */
`;
const SubItem = styled.li`
  list-style: none;
  margin: 0 0 0 1rem;
  font-size: 0.85rem;
  font-weight: 800;
  color: ${(props) => props.theme.grey || 'rgb(50,50,50)'};
  && span.title {
    color: ${(props) => props.theme.red};
    font-weight: 200;
    display: block;
  }
`;

const ListAgenda = ({ data }) => {
  return (
    <SingleScheduleDay>
      {data.map((item) => (
        <Item key={item.time}>
          <div className="title--wrap">
            <Item__Time>{item.time}pm</Item__Time>
            <Item__Title> {item.title}</Item__Title>
          </div>

          {item.speakers.map((spk) => (
            <SubItem key={`${spk.name}--single-speaker`}>
              {spk.name} <span className="title">{spk.title}</span>
            </SubItem>
          ))}
          <hr />
        </Item>
      ))}
    </SingleScheduleDay>
  );
};

const tab_data = [
  {
    title: 'Spine Session',
    content: <h2>Spine Session Agenda</h2>,
  },
  { title: 'Foot & Ankle Session', content: <h2>Foot & Ankle Agenda</h2> },
  {
    title: 'Neurology/ Pain Management Session',
    content: <h2>Pain Mgmt Session Agenda</h2>,
  },
  {
    title: 'Upper Extremity Session',
    content: <h2>Upper Extremity Sessions Agenda</h2>,
  },
  { title: 'Knee Session', content: <h2>Knee Session Agenda</h2> },
  { title: 'Hip Session', content: <h2>Hip Session Agenda</h2> },
];
const Agenda = ({ main_event }) => {
  return (
    <TheAgenda>
      <TwoPanel data={tab_data}></TwoPanel>
    </TheAgenda>
  );
};

export default Agenda;
