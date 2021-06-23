import styled from 'styled-components';
import React from 'react';
import Moment from 'react-moment';
import { Typography, FormControl, Button, Input } from '@material-ui/core';
import TwoPanel from 'components/TabPanels/TwoPanel';

import Day1 from './Day1';
import Day2 from './Day2';
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
  { title: 'Day 1 Schedule', content: <ListAgenda data={Day1} /> },
  { title: 'Day 2 Schedule', content: <ListAgenda data={Day2} /> },
];
const Agenda = ({ main_event }) => {
  return (
    <TheAgenda>
      <TwoPanel data={tab_data}></TwoPanel>
    </TheAgenda>
  );
};

export default Agenda;
