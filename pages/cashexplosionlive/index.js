import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { calculateIfStarted, calculateIfEnded } from 'lib/helpers';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Footer from 'components/template1/Footer';
import SignUp from 'components/IndividualEventAssets/cashexplosionlive/SignUp';
import ThankYou from 'components/IndividualEventAssets/cashexplosionlive/ThankYou';
import MainEvent from 'components/IndividualEventAssets/cashexplosionlive/MainEvent';
import Success from 'components/IndividualEventAssets/cashexplosionlive/Success';
import Wrap from 'components/IndividualEventAssets/cashexplosionlive/Wrap';
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

const Decider = ({
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

  const {
    event_meta,
    main_event,
    speakers,
    event_meta: { AuthRequired },
    main_event: { BreakoutSessions },
  } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
    body_bg: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const START = main_event.eventStartEnd.StartDateTime;
  const END = main_event.eventStartEnd.EndDateTime;
  const storage_token = 'cash-explosion--email-auth';

  const [deciderTemplate, setDeciderTemplate] = useState('signup');
  const [hasStarted, setStarted] = useState(calculateIfStarted(START));
  const [hasEnded, setEnded] = useState(calculateIfEnded(END));

  const [form, setForm] = useState({
    loading: false,
    email_entered: false,
    value: '',
  });

  useEffect(() => {
    setStarted(calculateIfStarted(START));
    setEnded(calculateIfEnded(END));
    const interval = setInterval(() => {
      if (calculateIfStarted(START)) {
        setStarted(true);
      }
      if (calculateIfEnded(END)) {
        setEnded(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //listen for has started
  useEffect(() => {
    if (hasEnded) {
      return setDeciderTemplate('thank-you');
    }
    if (hasStarted) {
      setDeciderTemplate('main-event');
    } else if (localStorage.getItem(storage_token) && !hasStarted) {
      setDeciderTemplate('success');
    } else {
      setDeciderTemplate('signup');
    }
  }, [hasStarted]);
  //listen for submit

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
      AttendeeLast: 'Event 1',
      AttendeeEmail: email_value,
    };

    return await attendee_capture(values, main_event.id).then((res) => {
      if (res.error) {
        setForm((prev) => ({ ...prev, loading: false }));
        return toast.error(res.error);
      } else {
        toast.success(`Emailed recorded!`);
        localStorage.setItem(storage_token, true);
        setTimeout(() => {
          setDeciderTemplate('success');
        }, 1000);
      }
    });
  };

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          <Wrap theme={event_theme}>
            <Decider
              template={deciderTemplate}
              theme={event_theme}
              main_event={main_event}
              handleSetEmail={handleSetEmail}
              handleSubmit={handleSubmit}
              form={form}
            />
          </Wrap>
        </Body>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getStaticProps(ctx) {
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

    const values = {
      props: {
        //meta will be the props for the event
        event_meta: eventData,
        main_event,
      },
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
