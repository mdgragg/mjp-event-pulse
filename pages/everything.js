import React from 'react';
import styled from 'styled-components';
import ClientOnly from '../components/assets/ClientOnly';
import { gql, useQuery } from '@apollo/client';
const ErrWrap = styled.div`
  background-color: #f7f7f7;
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
`;

const Everything = () => {
  const { err, loading, data } = useQuery(gql`
    query AllJobs {
      eventJobs {
        EventJobName
        events {
          slug
          EventName
        }
      }
    }
  `);

  return (
    <ErrWrap>
      <h2>Everything</h2>
      <ClientOnly>{data && <EventMap events={data.eventJobs} />}</ClientOnly>
    </ErrWrap>
  );
};

const Lister = styled.ul`
  display: inline-block;
  position: relative;
  background-color: white;
  margin: 1rem;
  height: 250px;
`;

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const EventMap = ({ events }) => {
  return (
    <ListWrap>
      {events.map((ev) => (
        <Lister>
          {ev.EventJobName} -- {ev.jobId}
          {ev.events.map((sub_event) => (
            <li>{sub_event.EventName}</li>
          ))}
        </Lister>
      ))}
    </ListWrap>
  );
};

export default Everything;
