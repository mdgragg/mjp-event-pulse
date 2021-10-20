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
import default_theme from 'eventAssets/worthington-industries-investor-day-2021/worthington-industries-investor-day-2021.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { Replacer } from 'components/__Assets__';
import WIBodyWrap from 'eventAssets/worthington-industries-investor-day-2021/WIBodyWrap';

export const EVENT_URL = `worthingtoninvestorday`;

const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStarted = useCalculateIfStarted(main_event, 15);
  const [auth, setAuth] = useState(false);

  return (
    <ThemedPage theme={event_theme}>
      <AuthWrap
        headerContent={
          <img
            style={{ maxWidth: '220px', margin: '1rem auto' }}
            src={main_event.LogoLink[0].Media.url}
          />
        }
        options={['registerOnly']}
        emailOptions={{
          from: {
            email: 'investors@worthingtonindustries.com',
            replyTo: 'investors@worthingtonindustries.com',
            name: main_event.EventName,
          },
          bodyHTML: `<p>Thank you for registering for the virtual Worthington Industries Investor & Analyst Day Nov. 10, 2021 at 9:30 ET.  If you have any questions, please contact Investor Relations Officer Marcus Rogier at <a href='mailto:investors@worthingtonindustries.com'>investors@worthingtonindustries.com</a>. </p><p>Presentations will be provided by President & CEO Andy Rose and other members of the executive management team.  A Q&A session will be held following the presentations.</p><p>We look forward to you joining us on Nov. 10.</p>`,
        }}
        eventToCheck={main_event}
        otherFields={{
          Company: {
            displayName: 'Company',
            required: true,
            value: '',
          },
        }}
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
        <WIBodyWrap main_event={main_event} />
      </AuthWrap>
    </ThemedPage>
  );
};

export async function getServerSideProps(ctx) {
  try {
    return GET_SERVERSIDE_PROPS_DEFAULT(ctx, EVENT_URL);
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
