import React from 'react';
import { getSession } from 'next-auth/client';

const Login = (props) => {
  return <div></div>;
};

export default Login;

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: `./`,
    },
  };
  const session = await getSession(ctx);
  const destination = ctx.params.event;
  console.log(ctx.req.url);
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}/${destination}/admin`,
      },
    };
  }
  return {
    redirect: {
      destination: './admin',
      permanent: false,
    },
  };
}
