import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates/index';
import SignUp from 'eventAssets/cashexplosionlive/SignUp';
import ThankYou from 'eventAssets/cashexplosionlive/ThankYou';
import MainEvent from 'eventAssets/cashexplosionlive/MainEvent';
import Success from 'eventAssets/cashexplosionlive/Success';
import Wrap from 'eventAssets/cashexplosionlive/Wrap';
import attendee_capture from 'lib/fetchCalls/attendee_capture';
import { toast } from 'react-toastify';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '600px',
  green: '#00d35a',
  lightGreen: '#6dff80',
  purple: '#667ff6',
  white: null,
  blue: '#1e2c60',
  pink: '#ff5ef4',
  red: '#b71f39',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Akzidenz-Grotesque-Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'cashexplosionlive';

export const Decider = ({
  template,
  main_event,
  theme,
  handleSubmit,
  form,
  loading,
  handleSetEmail,
}) => {
  switch (template) {
    case 'success':
      return <Success main_event={main_event} theme={theme} />;
      break;
    case 'signup':
      return (
        <SignUp
          main_event={main_event}
          theme={theme}
          handleSubmit={handleSubmit}
          handleSetEmail={handleSetEmail}
          form={form}
          loading={loading}
        />
      );
      break;
    case 'main-event':
      return <MainEvent main_event={main_event} theme={theme} />;
      break;
    case 'thank-you':
      return <ThankYou main_event={main_event} theme={theme} />;
      break;
    default:
      return <MainEvent main_event={main_event} theme={theme} />;
  }
};

const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
    body_bg: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const storage_token = 'cash-explosion-2--email-auth';

  const [deciderTemplate, setDeciderTemplate] = useState('signup');

  const hasStartEnd = useCalculateIfStarted(main_event);

  const [form, setForm] = useState({
    loading: false,
    email_entered: false,
    value: '',
  });

  //listen for has started

  useEffect(() => {
    console.log(hasStartEnd);
    if (hasStartEnd.hasEnded) {
      console.log('1');
      return setDeciderTemplate('thank-you');
    }
    if (hasStartEnd.hasStarted && deciderTemplate !== 'main-event') {
      return setDeciderTemplate('main-event');
    }
    if (localStorage.getItem(storage_token) && !hasStartEnd.hasStarted) {
      console.log('3');
      return setDeciderTemplate('success');
    } else {
      console.log('4');
      setDeciderTemplate('signup');
    }
  }, [hasStartEnd]);

  const handleSetEmail = (value) => {
    setForm((prev) => ({
      ...prev,
      value,
    }));
  };

  const handleSubmit = async (email_value) => {
    if (email_value === '') {
      return toast.error('You must supply an email');
    }
    setForm((prev) => ({ ...prev, loading: true }));
    const values = {
      AttendeeFirst: 'CE Attendee',
      AttendeeLast: 'Event 2',
      AttendeeEmail: email_value,
    };

    return await attendee_capture(values, main_event.id)
      .then((res) => {
        toast.success(`Emailed recorded!`);
        localStorage.setItem(storage_token, true);
        setTimeout(() => {
          setDeciderTemplate('success');
        }, 1000);
      })
      .catch((err) => {
        setForm((prev) => ({ ...prev, loading: false }));
        console.log(err);
        return toast.error(err);
      });
  };

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <Wrap theme={event_theme}>
        {
          {
            signup: (
              <SignUp
                main_event={main_event}
                theme={event_theme}
                handleSubmit={handleSubmit}
                handleSetEmail={handleSetEmail}
                form={form}
                loading={form.loading}
              />
            ),
            success: (
              <Success
                main_event={main_event}
                theme={event_theme}
                callback={() => {
                  setDeciderTemplate('main-event');
                }}
              />
            ),
            'main-event': (
              <MainEvent theme={event_theme} main_event={main_event} />
            ),
            'thank-you': (
              <ThankYou main_event={main_event} theme={event_theme} />
            ),
          }['thank-you']
        }
        {/* <Decider
          template={deciderTemplate}
          theme={event_theme}
          main_event={main_event}
          handleSetEmail={handleSetEmail}
          handleSubmit={handleSubmit}
          form={form}
        /> */}
      </Wrap>
    </Page>
  );
};

export async function getStaticProps(ctx) {
  try {
    let eventData = await getEventMeta(EVENT_URL);

    let main_event =
      eventData?.events?.filter((ev) => ev.isMainEvent === true)[0] || {};

    const values = {
      props: {
        //meta will be the props for the event
        event_meta: eventData,
        main_event,
      },
      revalidate: 300,
    };
    return values;
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
