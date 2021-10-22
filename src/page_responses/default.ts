import { StaticResponse } from 'types/PageResponses';
import { getEventMeta } from '../../lib/api';
async function GET_SERVERSIDE_PROPS_DEFAULT(ctx: any, EVENT_URL: string) {
  let event_data = await getEventMeta(EVENT_URL);

  if (!event_data || !event_data.events) {
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    };
  }
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
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
}

const GET_STATIC_PROPS_DEFAULT = async (EVENT_URL) => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };

  return returnObj;
};

export { GET_SERVERSIDE_PROPS_DEFAULT, GET_STATIC_PROPS_DEFAULT };
