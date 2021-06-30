import React from 'react';
import styled from 'styled-components';
import ClientOnly from '../components/assets/ClientOnly';
import { gql, useQuery } from '@apollo/client';
import DateParse from 'components/assets/DateParse';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
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
        jobId
        eventStatus {
          EventStatus
        }
        events {
          slug
          EventName
          eventStartEnd {
            StartDateTime
            EndDateTime
          }
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
  margin: 0.5rem;
  min-height: 250px;
  padding: 1rem;
  padding-bottom: 50px;
  &&.ended {
    background-color: grey;
  }
  &&.live {
    background-color: #00ed9e;
  }
  &&.preview {
    background-color: #10a4ff;
  }
  && .name {
    font-weight: 800;
  }
  && .id {
    color: white;
    background-color: black;
    width: max-content;
    padding: 0 10px;
    margin: 0;
    font-weight: 800;
    font-size: 1rem;
  }
  && li {
    list-style: none;
    font-size: 0.75rem;
  }
`;

const Status = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  border: 2px solid black;
  font-weight: 600;
  padding: 0 5px;
  width: 80px;
  font-size: 0.75rem;
  text-align: center;
  /* width: max-content; */
`;
const ListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const SubEvent = styled.li`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  margin: 5px 0;
`;

const EventMap = ({ events }) => {
  return (
    <ListWrap>
      {events.map((ev) => (
        <SingleEventBlock ev={ev} key={ev.jobId} />
      ))}
    </ListWrap>
  );
};

const SingleEventBlock = ({ ev }) => {
  // const hasStartEnd = useCalculateIfStarted(event);
  return (
    <Lister className={ev.eventStatus.EventStatus.toLowerCase()}>
      <div className="name">{ev.EventJobName} </div>
      <div className="id">{ev.jobId}</div>
      <div className="event-map">
        Events:
        {ev.events.map((sub_event) => (
          <SubEvent>
            {sub_event.EventName}
            <div>
              <span>
                <DateParse
                  format={`MM/DD/YY`}
                  date={sub_event.eventStartEnd?.StartDateTime}
                />{' '}
                -{' '}
              </span>
              <span>
                <DateParse
                  format={`MM/DD/YY`}
                  date={sub_event.eventStartEnd?.EndDateTime}
                />
              </span>
            </div>
          </SubEvent>
        ))}
      </div>
      <Status>{ev.eventStatus.EventStatus}</Status>
    </Lister>
  );
};

export default Everything;
