import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';

import _ from 'lodash';

export const event_theme = {
  // bg: '#BADA55'
  fontFamily: 'Roboto',
};

const Template1 = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.push('osu-annual-scientific-meeting/exhibitors');
  }, []);

  return <></>;
};

export default Template1;

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
      permanent: true,
    },
  };
}
