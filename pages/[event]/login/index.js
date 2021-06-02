import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const Login = (props) => {
  const router = useRouter();

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
      {!loading && JSON.stringify(data)}
      <div>LOGIN HERE...</div>
    </div>
  );
};

Login.propTypes = {};

export default Login;

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
      permanent: false,
    },
  };
}
