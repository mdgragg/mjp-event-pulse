import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import Index, { EVENT_URL } from './index';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import { FullPage__SolidColor } from 'components/BodyTemplates';
import { Banner__WithPicture } from 'components/Banners';
import { FlexHero, SolidColorHero } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import { toast } from 'react-toastify';
import { default_theme as event_theme } from 'eventAssets/nwbattle2021/theme.theme';
import { BoxedCounter } from 'components/Counters';
import { Box__XYCentered } from 'components/Boxes';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import { StaticResponse } from 'types/PageResponses';
import { GetStaticProps } from 'next';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';

const TeamPage = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isFallback) {
      router.push('./');
    }
  }, []);

  const { event_meta, main_event } = props;

  return (
    <Index
      main_event={main_event}
      event_meta={event_meta}
      title={`Team ${router.query.teamName}`}
    >
      <Box__XYCentered minHeight={'60vh'}>
        <div style={{ maxWidth: '900px', width: '95%', margin: '3rem auto' }}>
          <LinkBox__StickyTop__WithCountdown
            offset={10}
            start={main_event.eventStartEnd.StartDateTime}
            link={main_event.streamLinks[0].url}
            showBefore={
              <BoxedCounter
                styles={{
                  textColor: event_theme.colors.primary,
                  boxColor: event_theme.colors.white,
                }}
                event={main_event}
                prefix={
                  <>
                    <h2>This Event Hasn't Started Yet</h2>
                    <h4>Join Us Live In:</h4>
                  </>
                }
              />
            }
          />
        </div>
      </Box__XYCentered>
    </Index>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { teamName: 'Ceo' } }, // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
}

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  console.log(main_event);
  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };

  return returnObj;
};

export default TeamPage;
