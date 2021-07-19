import { useState } from 'react';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Wrap from 'eventAssets/cashexplosionlive/Wrap';
import { event_theme, Decider } from './index';
import { toast } from 'react-toastify';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'cashexplosionlive';

const Index = (props) => {
  const [template, setTemplate] = useState('main-event');

  const { event_meta, main_event } = props;

  const theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
    body_bg: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const MainPage = () => {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <button onClick={() => setTemplate('signup')}>Sign Up</button>
          <button onClick={() => setTemplate('success')}>Success</button>
          <button onClick={() => setTemplate('main-event')}>Main Event</button>
          <button onClick={() => setTemplate('thank-you')}>Thank You</button>
        </div>
        <Page theme={theme}>
          <Meta title={event_meta.EventJobName}> </Meta>

          <Wrap theme={theme}>
            <Decider
              template={template}
              main_event={main_event}
              form={{ loading: false }}
              handleSubmit={() =>
                toast.error('Signup does not work in preview mode.')
              }
            />
          </Wrap>
        </Page>
      </>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);

  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta(EVENT_URL);

    let main_event =
      eventData?.events?.filter((ev) => ev.isMainEvent === true)[0] || {};

    if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
      return {
        props: {
          //meta will be the props for the event
          event_meta: eventData,
          main_event,
        },
      };
    }
    return {
      redirect: {
        destination: './preview',
        permanent: false,
      },
    };
  } catch (error) {
    console.log('get static props error: ', error);
    return {
      redirect: {
        destination: '/',
      },
    };
  }
}

export default Index;
