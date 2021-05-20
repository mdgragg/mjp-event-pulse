import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import VideoBox__iFrame from 'components/VideoBoxes/Video__iFrame';
import Section__WithBG from 'components/Sections/Section__WithBG';
import EmailOnlyModal from '../../components/Modals/AttendeeList__EmailOnlyModal';
import LandingPage from 'components/IndividualEventAssets/biglotstownhall/LandingPage';
import { toast } from 'react-toastify';
import FullWrap from 'components/FullWrap';
import useHasAuthorized from 'hooks/useHasAuthorized';
import { EVENT_URL } from './index';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  white: null,
  blue: '#1e2c60',
  red: '#b71f39',
  orange: '#FF5600',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Futura Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const session_token = EVENT_URL;
  const router = useRouter();

  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const [hasAuthenticated, setHasAuthenticated] =
    useHasAuthorized(session_token);

  return (
    <>
      <EmailOnlyModal
        signInText={
          <p>
            Please use your employee email <br />
            (i.e. associateID@biglots.com) <br />
            <span style={{ fontSize: '0.75rem' }}>
              This is a preview, so only associateid@biglots.com will work for
              this example
            </span>
          </p>
        }
        event_meta={main_event}
        open={!hasAuthenticated}
        callback={(creds) => {
          setHasAuthenticated(true);
          toast.success(creds);
        }}
      />
      <FullWrap className={!hasAuthenticated ? 'blurred' : ''}>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>
          <Body>
            <LandingPage main_event={main_event} />
          </Body>
        </Page>
      </FullWrap>
    </>
  );
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getStaticProps() {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };
}

export default Index;
