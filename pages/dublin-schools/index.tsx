import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Section from 'components/template1/Section';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import default_theme from 'eventAssets/dublin-schools/theme.theme';
import MainPage from 'eventAssets/dublin-schools/MainPage';
import { AppContext } from 'context/AppContext';

export const EVENT_URL = 'dublin-schools';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const {
    state: { hasAuth },
  } = useContext(AppContext);

  return (
    <AuthWrap
      eventToCheck={main_event}
      successCallback={(res) => {
        toast.success(
          `Hello ${
            res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
          }, welcome to ${main_event.EventName}`
        );
      }}
    >
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <MainPage main_event={main_event} />
      </Page>
    </AuthWrap>
  );
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  try {
    let event_data = await getEventMeta(EVENT_URL);
    let main_event = event_data.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];
    let return_object;

    switch (event_data.eventStatus.EventStatus) {
      case 'Preview':
        if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] !== 'true') {
          return_object = {
            redirect: {
              destination: `${EVENT_URL}/preview`,
              permanent: false,
            },
          };
        } else {
          return_object = {
            props: { event_meta: event_data, main_event },
          };
        }
        break;
      case 'Ended':
        return_object = {
          redirect: {
            destination: `${EVENT_URL}/thank-you`,
            permanent: false,
          },
        };
        break;
      case 'Live':
        return_object = {
          props: {
            //meta will be the props for the event
            event_meta: event_data,
            main_event,
          },
        };
        break;
      default:
        return_object = {
          redirect: {
            destination: `/`,
            permanent: false,
          },
          // revalidate: 600,
        };
    }

    return return_object;
  } catch (error) {
    console.log('[event].js error: ', error);
    return {
      redirect: {
        destination: '/404',
      },
    };
  }
}

export default Index;
