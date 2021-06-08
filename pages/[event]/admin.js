import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import { toast } from 'react-toastify';

import GenerateAttendeeReport from '../../components/Admin/GenerateAttendeeReport';
const Admin = (props) => {
  const router = useRouter();

  const { err, loading, data } = useQuery(
    gql`
      query LoginView($where: String!) {
        eventJobs(where: { eventUrl: $where }) {
          EventJobName
          events {
            slug
            EventName
            id
            eventStartEnd {
              StartDateTime
              EndDateTime
            }
          }
        }
      }
    `,
    { variables: { where: router.query.event } }
  );

  let eventJobs = data && data.eventJobs[0];
  if (!eventJobs) {
    return <h2>Error</h2>;
  }
  return (
    <div style={{ margin: '5%' }}>
      <h1>
        {eventJobs.EventJobName}{' '}
        <span
          style={{
            backgroundColor: '#1c1c1c',
            color: 'white',
            padding: '0rem 1rem',
          }}
        >
          Admin
        </span>
      </h1>
      {data && <GenerateAttendeeReport events={eventJobs.events} />}

      <hr />
      <button
        onClick={() =>
          signIn().then((res) => {
            console.log(res);
            toast('Hello!');
          })
        }
      >
        Login
      </button>
      <button
        onClick={() =>
          signOut().then((res) => {
            console.log(res);
            toast('Hello!');
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `./login`,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
