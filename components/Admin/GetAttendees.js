import React from 'react';
import { gql, useQuery } from '@apollo/client';
import CountUp from 'react-countup';
const GetAttendees = ({ ev }) => {
  const { err, loading, data } = useQuery(
    gql`
      query attendees($id: String!) {
        attendeesConnection(where: { events: { id: $id } }) {
          aggregate {
            count
          }
        }
      }
    `,
    { variables: { id: ev.id } }
  );
  if (loading) {
    return 'loading';
  }
  if (data) {
    return (
      <>
        <CountUp
          duration={2}
          start={0}
          end={data.attendeesConnection.aggregate.count}
          preserveValue={false}
        />{' '}
        Registered Attendees
      </>
    );
  }
};

export default GetAttendees;
