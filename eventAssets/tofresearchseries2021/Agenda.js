import styled from 'styled-components';
import React, { useEffect } from 'react';
import TwoPanel from 'components/TabPanels/TwoPanel';
import agenda from "./Agenda/agenda.json"
import DateParse from 'components/__Assets__/DateParse'
// http://events.r20.constantcontact.com/register/event?llr=dmu7d7cab&oeidk=a07ehvrwj2ga36ae5cf&showPage=true
const TheAgenda = styled.div`
  min-height: 100%;
  font-size: 1rem;
  /* max-width: 550px; */
  margin: auto;
  background-color: ${(props) => props.theme.colors.primary};
`;

const SingleScheduleDay = styled.div`
  padding: 1rem 0 3rem 0;
  text-align: left;
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
      {data.items.map((item, index) => {
        if (!item.title) {
          return null
        } else {
          return (
            <Item key={`${item.title}--${index}`}>
              <div className="title--wrap">
                <Item__Time><DateParse date={item.start} format={`h:mma`} /></Item__Time>
                <Item__Title> {item.title}</Item__Title>
              </div>
              <SubItem key={`${item.presenter}--single-speaker`}>
                {item.presenter}
              </SubItem>

            </Item>
          )
        }

      })}
    </SingleScheduleDay>
  );
};

const tab_data = [
  {
    title: 'Spine Session',
    content: (
      <>
        <h2>Foot & Ankle Agenda</h2>
        <ListAgenda data={agenda[0]} />
      </>
    ),
  },
  {
    title: 'Foot & Ankle Session', content: (
      <>
        <h2>Foot & Ankle Agenda</h2>
        <ListAgenda data={agenda[1]} />
      </>
    ),
  },
  {
    title: 'Neurology/ Pain Mgmt Session',
    content: (
      <>
        <h2>Neurology/ Pain Mgmt Agenda</h2>
        <ListAgenda data={agenda[2]} />
      </>
    ),
  },
  {
    title: 'Upper Extremity Session',
    content: (
      <>
        <h2>Upper Extremity Agenda</h2>
        <ListAgenda data={agenda[3]} />
      </>
    ),
  },
  {
    title: 'Knee Session', content: (
      <>
        <h2>Knee Session Agenda</h2>
        <ListAgenda data={agenda[4]} />
      </>
    ),
  },
  {
    title: 'Hip Session', content: (
      <>
        <h2>Hip Session Agenda</h2>
        <ListAgenda data={agenda[5]} />
      </>
    ),
  },
];
const Agenda = ({ initialTab }) => {
  const tabData =
    useEffect(() => {

    })
  return (
    <TheAgenda>
      <TwoPanel data={tab_data} initialTab={initialTab}></TwoPanel>
    </TheAgenda>
  );
};

export default Agenda;
