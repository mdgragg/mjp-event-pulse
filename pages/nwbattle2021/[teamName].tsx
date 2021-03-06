import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta, getEventSpeakers } from 'lib/api';
import { EVENT_URL } from './index';

import { StaticResponse } from 'types/PageResponses';
import { GetStaticProps } from 'next';
import PageWrap from 'eventAssets/nwbattle2021/PageWrap';
import { TeamBody } from 'eventAssets/nwbattle2021/TeamPage';

const TeamPage = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isFallback) {
      router.push('/404');
    }
  }, []);
  const { event_meta, main_event, speaker } = props;

  return (
    <PageWrap
      main_event={main_event}
      event_meta={event_meta}
      title={`${speaker?.FirstName} ${speaker?.LastName}`}
    >
      <TeamBody speaker={speaker} main_event={main_event} />
    </PageWrap>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const speakers = await getEventSpeakers(162);
  let theSpeaker = speakers.filter(
    (s) => s.LastName.toLowerCase() === params.teamName
  );

  theSpeaker = theSpeaker[0] || null;

  if (!theSpeaker) {
    return {
      notFound: true,
    };
  }

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
      speaker: theSpeaker,
    },
    revalidate: 300,
  };

  return returnObj;
};

export async function getStaticPaths() {
  const speakers = await getEventSpeakers(162);

  return {
    paths: speakers.map((speaker) => ({
      params: { teamName: speaker.LastName.toLowerCase() },
    })),
    fallback: `blocking`, // See the "fallback" section below
  };
}
export default TeamPage;
