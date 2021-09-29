import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import ThemedPage from 'components/__GLOBALS__/ThemedPage';
import Body from 'components/template1/Body';
import { Banner__WithPicture } from 'components/Banners';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import default_theme from 'eventAssets/netjetssummit/netjetssummit.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import Splash from 'eventAssets/netjetssummit/Splash';
import HomePage from 'eventAssets/netjetssummit/HomePage';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = `netjetssummit`;

const Index = (props) => {
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <ThemedPage theme={event_theme}>
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
        <Meta title={main_event.EventName}>
          <title>{main_event.EventName}</title>
        </Meta>
        <HomePage main_event={main_event} />
      </AuthWrap>
    </ThemedPage>
  );
};

export async function getServerSideProps(ctx) {
  try {
    let event_data = await getEventMeta(EVENT_URL);

    if (!event_data || !event_data.events) {
      return {
        redirect: {
          destination: `/404`,
          permanent: false,
        },
      };
    }

    let return_object;

    if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] !== 'true') {
      return_object = {
        redirect: {
          destination: `./preview?resource=/${EVENT_URL}/landing`,
          permanent: false,
        },
      };
    } else {
      let main_event = event_data.events.filter(
        (ev) => ev.isMainEvent === true
      )[0];

      return_object = {
        props: { event_meta: event_data, main_event },
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
