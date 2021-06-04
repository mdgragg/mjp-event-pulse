import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import { toast } from 'react-toastify';

const Admin = (props) => {
  const router = useRouter();
  const sesh = useSession();

  const { err, loading, data } = useQuery(
    gql`
      query LoginView($where: String!) {
        eventJobs(where: { eventUrl: $where }) {
          EventJobName
          events {
            slug
            EventName
          }
        }
      }
    `,
    { variables: { where: router.query.event } }
  );
  return (
    <div style={{ margin: '5%' }}>
      <h1>{router.query.event}</h1>
      {sesh && JSON.stringify(sesh)}

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
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: `./`,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
